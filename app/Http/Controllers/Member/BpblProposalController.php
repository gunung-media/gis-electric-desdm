<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Repositories\BpblProposal\BpblProposalRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BpblProposalController extends Controller
{
    public function __construct(
        protected BpblProposalRepository $bpblProposalRepository = new BpblProposalRepository(),
    ) {}

    public function index(): Response
    {
        $proposals = $this->bpblProposalRepository->getBpblProposals(auth('member')->user()->id);
        return Inertia::render('Member/BpblProposal/index', [
            'datas' => $proposals
        ]);
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
            'statement_path' => 'required|file',
            'ktp_path' => 'required|file',
            'house_path' => 'required|file',
            'nearest_path' => 'required|file',
            'letter_path' => 'required|file',
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
                    'member_id' => auth('member')->user()->id
                ]
            );
            return redirect(route('member.bpbl-proposal.index'))->with('status', 'Sukses Menambah usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah usulan']);
        }
    }

    public function show(string $id): Response
    {
        return Inertia::render('Member/BpblProposal/Detail', ['data' => $this->bpblProposalRepository->getBpblProposal($id)]);
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
        ]);

        try {
            $this->bpblProposalRepository->updateBpblProposal(
                $id,
                [
                    ...($request->all()),
                    'member_id' => auth('member')->user()->id
                ]
            );
            return redirect(route('member.bpbl-proposal.index'))->with('status', 'Sukses Menambah usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal mengedit usulan']);
        }
    }

    public function destroy(string $id): mixed
    {
        $proposal = $this->bpblProposalRepository->getBpblProposal($id);
        $proposal->delete();
        return redirect(route('member.bpbl-proposal.index'))->with('status', 'Sukses Menghapus Urusan');
    }
}
