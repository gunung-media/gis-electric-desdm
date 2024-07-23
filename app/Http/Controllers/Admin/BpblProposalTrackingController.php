<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\BpblProposal\BpblProposalTrackingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BpblProposalTrackingController extends Controller
{
    public function __construct(
        protected BpblProposalTrackingRepository $bpblProposalTrackingRepository = new BpblProposalTrackingRepository()
    ) {}

    public function create(string $bpblProposalId): Response
    {
        return Inertia::render('Admin/BpblProposal/TrackingForm');
    }

    public function store(Request $request, string $bpblProposalId): mixed
    {
        $request->validate([
            'description' => 'required|string',
            'status' => 'required|in:Diterima,Diproses,Ditolak,Diterima dengan catatan',
        ]);

        try {
            $this->bpblProposalTrackingRepository->insertTracking([...($request->all()), 'bpbl_proposal_id' => $bpblProposalId]);
            return redirect(route('admin.bpbl-proposal.show', ['bpbl_proposal' => $bpblProposalId]))->with('status', 'Sukses Menambah tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah tracking']);
        }
    }

    public function edit(string $bpblProposalId, string $id): Response
    {
        return Inertia::render('Admin/BpblProposal/TrackingForm', [
            'tracking' => $this->bpblProposalTrackingRepository->getTracking($id)
        ]);
    }

    public function update(Request $request, string $bpblProposalId, string $id): mixed
    {
        try {
            $proposalTracking = $this->bpblProposalTrackingRepository->getTracking($id);
            $proposalTracking->update([...($request->all()), 'bpbl_proposal_id' => $bpblProposalId]);
            return redirect(route('admin.bpbl-proposal.show', ['bpbl_proposal' => $bpblProposalId]))->with('status', 'Sukses Edit tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal edit tracking']);
        }
    }

    public function destroy(string $bpblProposalId, string $id): mixed
    {
        $proposalTracking = $this->bpblProposalTrackingRepository->getTracking($id);
        $proposalTracking->delete();
        return redirect(route('admin.bpbl-proposal.show', ['bpbl_proposal' => $bpblProposalId]))->with('status', 'Sukses Hapus');
    }
}
