<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Repositories\Proposal\ProposalRepository;
use App\Repositories\Proposal\ProposalTrackingRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProposalController extends Controller
{
    public function __construct(
        protected ProposalRepository $proposalRepository = new ProposalRepository(),
        protected ProposalTrackingRepository $proposalTrackingRepository = new ProposalTrackingRepository()
    ) {
    }

    public function index(): Response
    {
        $proposals = $this->proposalRepository->getProposals();
        // dd($proposals->toArray());
        return Inertia::render('Proposal/index', [
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
            'village_code' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'nullable|string',
            'longitude' => 'nullable|string',
            'proposal_type' => 'required|string',
            'description' => 'nullable|string',
            'document_path' => 'required|file',
            'estimated_cost' => 'nullable|integer',
            'priority' => 'required|string|in:Tinggi,Sedang,Rendah',
            'additional_note' => 'nullable|string',
        ]);

        $documentPath = $request->file('document_path')->store('proposal_documents');
        try {
            $this->proposalRepository->insertProposal([...($request->all()), 'document_path' => $documentPath]);
            return redirect(route('proposal.index'))->with('status', 'Sukses Menambah usulan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah usulan']);
        }
    }

    public function show(mixed $id): JsonResponse
    {
        return response()->json(['data' => $this->proposalRepository->getProposal($id)]);
    }
}
