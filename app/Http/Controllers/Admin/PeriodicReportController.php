<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\PeriodicReportImport;
use App\Repositories\PeriodicReport\PeriodicReportRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class PeriodicReportController extends Controller
{
    public function __construct(
        protected PeriodicReportRepository $periodicReportRepository = new PeriodicReportRepository()
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Admin/PeriodicReport/index', ['datas' => $this->periodicReportRepository->getPeriodicReports(villageCode: $request->query('village_code'))]);
    }

    public function show(string $id): Response
    {
        return Inertia::render('Admin/PeriodicReport/Detail', ['data' => $this->periodicReportRepository->getPeriodicReport($id)]);
    }

    public function destroy(string $id): mixed
    {
        $proposal = $this->periodicReportRepository->getPeriodicReport($id);
        $proposal->delete();
        return redirect(route('admin.periodic-report.index'))->with('status', 'Sukses Menghapus Urusan');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        DB::beginTransaction();
        try {
            $file = $request->file('file');

            Excel::import(new PeriodicReportImport, $file);
            DB::commit();
            return redirect(route('admin.periodic-report.index'))->with('status', 'Sukses Mengimport ');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal Mengimport ']);
        }
    }
}
