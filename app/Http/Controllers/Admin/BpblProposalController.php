<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\BpblProposalImport;
use App\Repositories\BpblProposal\BpblProposalRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class BpblProposalController extends Controller
{
    public function __construct(
        protected BpblProposalRepository $bpblProposalRepository = new BpblProposalRepository()
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Admin/BpblProposal/index', ['datas' => $this->bpblProposalRepository->getBpblProposals(villageCode: $request->query('village_code'))]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/BpblProposal/Detail');
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'full_name' => 'required|string',
            'identity_number' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'village_code' => 'required',
            'address' => 'required|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'description' => 'nullable|string',
            'statement_path' => 'required|file|max:2048',
            'ktp_path' => 'required|file|max:2048',
            'house_path' => 'required|file|max:2048',
            'nearest_path' => 'required|file|max:2048',
            'letter_path' => 'required|file|max:2048',
        ]);

        $statementPath = $request->file('statement_path')->store('bpbl_proposal/statement');
        $ktpPath = $request->file('ktp_path')->store('bpbl_proposal/ktp');
        $housePath = $request->file('house_path')->store('bpbl_proposal/house');
        $nearestPath = $request->file('nearest_path')->store('bpbl_proposal/nearest');
        $letterPath = $request->file('letter_path')->store('bpbl_proposal/letter');
        try {
            $this->bpblProposalRepository->insertBpblProposal(
                [
                    ...($request->all()),
                    'statement_path' => $statementPath,
                    'ktp_path' => $ktpPath,
                    'house_path' => $housePath,
                    'nearest_path' => $nearestPath,
                    'letter_path' => $letterPath,
                ]
            );
            return redirect(route('admin.bpbl-proposal.index'))->with('status', 'Sukses Menambah usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah usulan']);
        }
    }


    public function show(string $id): Response
    {
        return Inertia::render('Admin/BpblProposal/Detail', ['data' => $this->bpblProposalRepository->getBpblProposal($id)]);
    }

    public function update(Request $request, string $id): mixed
    {
        $request->validate([
            'full_name' => 'required|string',
            'identity_number' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'village_code' => 'required',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'statement_path' => 'file|max:2048',
            'ktp_path' => 'file|max:2048',
            'house_path' => 'file|max:2048',
            'nearest_path' => 'file|max:2048',
            'letter_path' => 'file|max:2048',
        ]);


        $files = [];
        $arrFiles = ['statement', 'ktp', 'house', 'nearest', 'letter'];
        foreach ($arrFiles as $file) {
            if ($request->hasFile($file . '_path')) {
                $path = $request->file($file . '_path')->store('bpbl_proposal/' . $file);
                $files[$file . '_path'] = $path;
            }
        }

        try {
            $this->bpblProposalRepository->updateBpblProposal(
                $id,
                [
                    ...($request->except(['_method'])),
                    ...($files),
                    'member_id' => auth('member')->user()->id
                ]
            );
            return redirect(route('admin.bpbl-proposal.index'))->with('status', 'Sukses Menambah usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal mengedit usulan']);
        }
    }

    public function destroy(string $id): mixed
    {
        $proposal = $this->bpblProposalRepository->getBpblProposal($id);
        $proposal->delete();
        return redirect(route('admin.bpbl-proposal.index'))->with('status', 'Sukses Menghapus Urusan');
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        DB::beginTransaction();
        try {
            $file = $request->file('file');

            Excel::import(new BpblProposalImport, $file);
            DB::commit();
            return redirect(route('admin.bpbl-proposal.index'))->with('status', 'Sukses Mengimport ');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal Mengimport ']);
        }
    }
}
