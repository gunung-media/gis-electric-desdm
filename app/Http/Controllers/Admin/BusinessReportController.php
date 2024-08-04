<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\BpblProposalImport;
use App\Imports\BusinessReportImport;
use App\Repositories\BusinessReport\BusinessReportRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class BusinessReportController extends Controller
{
    public function __construct(
        protected BusinessReportRepository $businessReportRepository = new BusinessReportRepository()
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Admin/BusinessReport/index', ['datas' => $this->businessReportRepository->getBusinessReports(villageCode: $request->query('village_code'))]);
    }

    public function show(string $id): Response
    {
        return Inertia::render('Admin/BusinessReport/Detail', ['data' => $this->businessReportRepository->getBusinessReport($id)]);
    }

    public function destroy(string $id): mixed
    {
        $proposal = $this->businessReportRepository->getBusinessReport($id);
        $proposal->delete();
        return redirect(route('admin.business-report.index'))->with('status', 'Sukses Menghapus Urusan');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        DB::beginTransaction();
        try {
            $file = $request->file('file');

            Excel::import(new BusinessReportImport, $file);
            DB::commit();
            return redirect(route('admin.business-report.index'))->with('status', 'Sukses Mengimport ');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal Mengimport ']);
        }
    }
}
