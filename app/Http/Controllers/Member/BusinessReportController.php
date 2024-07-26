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
        $businessReports = $this->businessReportRepository->getBusinessReports(auth('member')->user()->id);
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
            'village_code' => 'required',
            'address' => 'required|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'description' => 'nullable|string',
            'request_path' => 'required|file|max:2048',
            'ktp_path' => 'required|file|max:2048',
            'nib_path' => 'required|file|max:2048',
            'npwp_path' => 'required|file|max:2048',
            'diagram_path' => 'required|file|max:2048',
            'location_path' => 'required|file|max:2048',
            'specification_path' => 'required|file|max:2048',
            'bap_path' => 'file|max:2048',
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
                    'member_id' => auth('member')->user()->id
                ]
            );
            return redirect(route('member.business-report.index'))->with('status', 'Sukses Menambah Usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Usulan']);
        }
    }

    public function show(string $id): Response
    {
        return Inertia::render('Member/BusinessReport/Detail', ['data' => $this->businessReportRepository->getBusinessReport($id)]);
    }

    public function update(Request $request, string $id): mixed
    {
        $request->validate([
            'name' => 'required|string',
            'nib' => 'required|string',
            'npwp' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'village_code' => 'required',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'request_path' => 'file|max:2048',
            'ktp_path' => 'file|max:2048',
            'nib_path' => 'file|max:2048',
            'npwp_path' => 'file|max:2048',
            'diagram_path' => 'file|max:2048',
            'location_path' => 'file|max:2048',
            'specification_path' => 'file|max:2048',
            'bap_path' => 'file|max:2048',
        ]);


        $files = [];
        $arrFiles = ['request', 'ktp', 'nib', 'npwp', 'diagram', 'location', 'specification', 'bap'];
        foreach ($arrFiles as $file) {
            if ($request->hasFile($file . '_path')) {
                $path = $request->file($file . '_path')->store('bpbl_proposal/' . $file);
                $files[$file . '_path'] = $path;
            }
        }

        try {
            $this->businessReportRepository->updateBusinessReport(
                $id,
                [
                    ...($request->all()),
                    ...$files,
                    'member_id' => auth('member')->user()->id
                ]
            );
            return redirect(route('member.business-report.index'))->with('status', 'Sukses Mengedit Laporan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal mengedit laporan']);
        }
    }

    public function destroy(string $id): mixed
    {
        $proposal = $this->businessReportRepository->getBusinessReport($id);
        $proposal->delete();
        return redirect(route('member.business-report.index'))->with('status', 'Sukses Menghapus Urusan');
    }
}
