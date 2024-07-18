<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\BusinessReport\BusinessReportRepository;
use Inertia\Inertia;
use Inertia\Response;

class BusinessReportController extends Controller
{
    public function __construct(
        protected BusinessReportRepository $businessReportRepository = new BusinessReportRepository()
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/BusinessReport/index', ['datas' => $this->businessReportRepository->getBusinessReports()]);
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
