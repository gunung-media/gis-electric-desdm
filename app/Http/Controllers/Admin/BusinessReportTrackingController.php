<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\BusinessReport\BusinessReportTrackingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessReportTrackingController extends Controller
{
    public function __construct(
        protected BusinessReportTrackingRepository $businessReportTrackingRepository = new BusinessReportTrackingRepository()
    ) {}

    public function create(string $businessReportId): Response
    {
        return Inertia::render('Admin/BusinessReport/TrackingForm');
    }

    public function store(Request $request, string $businessReportId): mixed
    {
        $request->validate([
            'description' => 'required|string',
            'status' => 'required|in:Diterima,Diproses,Ditolak,Diterima dengan catatan',
        ]);

        try {
            $this->businessReportTrackingRepository->insertTracking([...($request->all()), 'business_report_id' => $businessReportId]);
            return redirect(route('admin.business-report.show', ['business_report' => $businessReportId]))->with('status', 'Sukses Menambah tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah tracking']);
        }
    }

    public function edit(string $businessReportId, string $id): Response
    {
        return Inertia::render('Admin/BusinessReport/TrackingForm', [
            'tracking' => $this->businessReportTrackingRepository->getTracking($id)
        ]);
    }

    public function update(Request $request, string $businessReportId, string $id): mixed
    {
        try {
            $proposalTracking = $this->businessReportTrackingRepository->getTracking($id);
            $proposalTracking->update([...($request->all()), 'business_report_id' => $businessReportId]);
            return redirect(route('admin.business-report.show', ['business_report' => $businessReportId]))->with('status', 'Sukses Edit tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal edit tracking']);
        }
    }

    public function destroy(string $businessReportId, string $id): mixed
    {
        $proposalTracking = $this->businessReportTrackingRepository->getTracking($id);
        $proposalTracking->delete();
        return redirect(route('admin.business-report.show', ['business_report' => $businessReportId]))->with('status', 'Sukses Hapus');
    }
}
