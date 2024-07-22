<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Repositories\PeriodicReport\PeriodicReportRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PeriodicReportController extends Controller
{
    public function __construct(
        protected PeriodicReportRepository $periodicReportRepository = new PeriodicReportRepository(),
    ) {}

    public function index(): Response
    {
        $periodicReports = $this->periodicReportRepository->getPeriodicReports(auth('member')->user()->id);
        return Inertia::render('Member/PeriodicReport/index', [
            'datas' => $periodicReports
        ]);
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'nib' => 'required|string',
            'npwp' => 'required|string',
            'permit_number' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'village_code' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'description' => 'nullable|string',
            'report_type' => 'nullable',
            'sk_path' => 'required|file',
            'certificate_path' => 'required|file',
            'condition_path' => 'required|file',
            'periodic_path' => 'required|file',
        ]);

        $skPath = $request->file('sk_path')->store('periodicReport/sk');
        $certificatePath = $request->file('certificate_path')->store('periodicReport/certificate');
        $conditionPath = $request->file('condition_path')->store('periodicReport/condition');
        $periodicPath = $request->file('periodic_path')->store('periodicReport/periodic');
        try {
            $this->periodicReportRepository->insertPeriodicReport(
                [
                    ...($request->all()),
                    'report_type' => $request->input('report_type', 'IUPTLS'),
                    'sk_path' => $skPath,
                    'certificate_path' => $certificatePath,
                    'condition_path' => $conditionPath,
                    'periodic_path' => $periodicPath,
                    'member_id' => auth('member')->user()->id
                ]
            );
            return redirect(route('member.periodic-report.index'))->with('status', 'Sukses Menambah Laporan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Laporan']);
        }
    }

    public function show(mixed $id): JsonResponse
    {
        return response()->json(['data' => $this->periodicReportRepository->getPeriodicReport($id)]);
    }
}
