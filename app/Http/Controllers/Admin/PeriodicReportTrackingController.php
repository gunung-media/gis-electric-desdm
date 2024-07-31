<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PeriodicReport\PeriodicReportTrackingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PeriodicReportTrackingController extends Controller
{
    public function __construct(
        protected PeriodicReportTrackingRepository $periodicReportTrackingRepository = new PeriodicReportTrackingRepository()
    ) {}

    public function create(string $periodicReportId): Response
    {
        return Inertia::render('Admin/PeriodicReport/TrackingForm');
    }

    public function store(Request $request, string $periodicReportId): mixed
    {
        $request->validate([
            'description' => 'required|string',
            'status' => 'required|in:Diterima,Diproses,Ditolak,Diterima dengan catatan',
            'file_path' => 'file|max:2048',
        ]);

        $filePath = $request->hasFile('file_path') ?  $request->file('file_path')->store('periodic-report/tracking') : null;
        try {
            $this->periodicReportTrackingRepository->insertTracking([...($request->all()), 'periodic_report_id' => $periodicReportId, 'file_path' => $filePath]);
            return redirect(route('admin.periodic-report.show', ['periodic_report' => $periodicReportId]))->with('status', 'Sukses Menambah tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah tracking']);
        }
    }

    public function edit(string $periodicReportId, string $id): Response
    {
        return Inertia::render('Admin/PeriodicReport/TrackingForm', [
            'tracking' => $this->periodicReportTrackingRepository->getTracking($id)
        ]);
    }

    public function update(Request $request, string $periodicReportId, string $id): mixed
    {
        $filePath = $request->hasFile('file_path') ?  $request->file('file_path')->store('periodic-report/tracking') : null;
        try {
            $proposalTracking = $this->periodicReportTrackingRepository->getTracking($id);
            $proposalTracking->update([...($request->all()), 'periodic_report_id' => $periodicReportId, 'file_path' => $filePath]);
            return redirect(route('admin.periodic-report.show', ['periodic_report' => $periodicReportId]))->with('status', 'Sukses Edit tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal edit tracking']);
        }
    }

    public function destroy(string $periodicReportId, string $id): mixed
    {
        $proposalTracking = $this->periodicReportTrackingRepository->getTracking($id);
        $proposalTracking->delete();
        return redirect(route('admin.periodic-report.show', ['periodic_report' => $periodicReportId]))->with('status', 'Sukses Hapus');
    }
}
