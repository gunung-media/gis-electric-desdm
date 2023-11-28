<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Report\ReportRepository;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        protected ReportRepository $reportRepository = new ReportRepository()
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Report/index', ['datas' => $this->reportRepository->getReports()]);
    }

    public function show(string $id): Response
    {
        return Inertia::render('Admin/Report/Detail', ['data' => $this->reportRepository->getReport($id)]);
    }

    public function destroy(string $id): mixed
    {
        $report = $this->reportRepository->getReport($id);
        $report->delete();
        return redirect(route('admin.report.index'))->with('status', 'Sukses Menghapus Urusan');
    }
}
