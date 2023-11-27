<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Repositories\Report\ReportRepository;
use App\Repositories\Report\ReportTrackingRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        protected ReportRepository $reportRepository = new ReportRepository(),
        protected ReportTrackingRepository $reportTrackingRepository = new ReportTrackingRepository()
    ) {
    }

    public function index(): Response
    {
        $reports = $this->reportRepository->getReports();
        return Inertia::render('Report/index', [
            'datas' => $reports
        ]);
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'full_name' => 'required|string',
            'identity_number' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'village_code' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'date_happen' => 'required|date',
            'report_type' => 'required|string',
            'description' => 'nullable|string',
            'document_path' => 'required|file',
            'priority' => 'required|in:Tinggi,Sedang,Rendah',
        ]);

        $documentPath = $request->file('document_path')->store('report_documents');
        try {
            $this->reportRepository->insertReport([...($request->all()), 'document_path' => $documentPath]);
            return redirect(route('report.index'))->with('status', 'Sukses Menambah usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah usulan']);
        }
    }

    public function show(mixed $id): JsonResponse
    {
        return response()->json(['data' => $this->reportRepository->getReport($id)]);
    }
}
