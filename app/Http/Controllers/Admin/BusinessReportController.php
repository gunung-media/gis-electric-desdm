<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\BusinessReport\BusinessReportRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
}
