<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Repositories\BusinessReport\BusinessReportRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessReportController extends Controller
{
    public function __construct(
        protected BusinessReportRepository $businessReportRepository = new BusinessReportRepository(),
    ) {}

    public function index(): Response
    {
        $businessReports = $this->businessReportRepository->getBusinessReports();
        return Inertia::render('Member/BusinessReport/index', [
            'datas' => $businessReports
        ]);
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'name' => 'required|string',
            'nib' => 'required|string',
            'npwp' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'village_code' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'description' => 'nullable|string',
            'request_path' => 'required|file',
            'ktp_path' => 'required|file',
            'nib_path' => 'required|file',
            'npwp_path' => 'required|file',
            'digram_path' => 'required|file',
            'location_path' => 'required|file',
            'specification_path' => 'required|file',
            'bap_path' => 'required|file',
        ]);

        $requestPath = $request->file('request_path')->store('businessReport/request');
        $ktpPath = $request->file('ktp_path')->store('businessReport/ktp');
        $nibPath = $request->file('nib_path')->store('businessReport/nib');
        $npwpPath = $request->file('npwp_path')->store('businessReport/npwp');
        $diagramPath = $request->file('diagram_path')->store('businessReport/diagram');
        $locationPath = $request->file('location_path')->store('businessReport/location');
        $specificationPath = $request->file('specification_path')->store('businessReport/specification');
        $bapPath = $request->file('bap_path')->store('businessReport/bap');
        try {
            $this->businessReportRepository->insertBusinessReport(
                [
                    ...($request->all()),
                    'request_path' => $requestPath,
                    'ktp_path' => $ktpPath,
                    'npwp_path' => $npwpPath,
                    'nib_path' => $nibPath,
                    'diagram_path' => $diagramPath,
                    'location_path' => $locationPath,
                    'specification_path' => $specificationPath,
                    'bap_path' => $bapPath,
                ]
            );
            return redirect(route('member.business-report.index'))->with('status', 'Sukses Menambah Usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Usulan']);
        }
    }

    public function show(mixed $id): JsonResponse
    {
        return response()->json(['data' => $this->businessReportRepository->getBusinessReport($id)]);
    }
}
