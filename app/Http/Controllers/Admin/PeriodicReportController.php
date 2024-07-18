<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PeriodicReport\PeriodicReportRepository;
use Inertia\Inertia;
use Inertia\Response;

class PeriodicReportController extends Controller
{
    public function __construct(
        protected PeriodicReportRepository $periodicReportRepository = new PeriodicReportRepository()
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/PeriodicReport/index', ['datas' => $this->periodicReportRepository->getPeriodicReports()]);
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
}
