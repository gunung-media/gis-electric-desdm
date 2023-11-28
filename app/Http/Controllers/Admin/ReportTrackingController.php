<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Report\ReportTrackingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportTrackingController extends Controller
{
    public function __construct(
        protected ReportTrackingRepository $reportTrackingRepository = new ReportTrackingRepository()
    ) {
    }

    public function create(string $reportId): Response
    {
        return Inertia::render('Admin/Report/TrackingForm');
    }

    public function store(Request $request, string $reportId): mixed
    {
        $request->validate([
            'description' => 'required|string',
            'status' => 'required|in:Diterima,Diproses,Ditolak,Diterima dengan catatan',
        ]);

        try {
            $this->reportTrackingRepository->insertTracking([...($request->all()), 'report_id' => $reportId]);
            return redirect(route('admin.report.show', ['report' => $reportId]))->with('status', 'Sukses Menambah tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah tracking']);
        }
    }

    public function edit(string $reportId, string $id): Response
    {
        return Inertia::render('Admin/Report/TrackingForm', [
            'tracking' => $this->reportTrackingRepository->getTracking($id)
        ]);
    }

    public function update(Request $request, string $reportId, string $id): mixed
    {
        try {
            $reportTracking = $this->reportTrackingRepository->getTracking($id);
            $reportTracking->update([...($request->all()), 'report_id' => $reportId]);
            return redirect(route('admin.report.show', ['report' => $reportId]))->with('status', 'Sukses Edit tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal edit tracking']);
        }
    }

    public function destroy(string $reportId, string $id): mixed
    {
        $reportTracking = $this->reportTrackingRepository->getTracking($id);
        $reportTracking->delete();
        return redirect(route('admin.report.show', ['report' => $reportId]))->with('status', 'Sukses Hapus');
    }
}
