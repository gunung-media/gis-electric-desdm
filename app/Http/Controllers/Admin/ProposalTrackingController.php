<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Proposal\ProposalTrackingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProposalTrackingController extends Controller
{
    public function __construct(
        protected ProposalTrackingRepository $proposalTrackingRepository = new ProposalTrackingRepository()
    ) {
    }

    public function create(string $proposalId): Response
    {
        return Inertia::render('Admin/Proposal/TrackingForm');
    }

    public function store(Request $request, string $proposalId): mixed
    {
        $request->validate([
            'description' => 'required|string',
            'status' => 'required|in:Diterima,Diproses,Ditolak,Diterima dengan catatan',
        ]);

        try {
            $this->proposalTrackingRepository->insertTracking([...($request->all()), 'proposal_id' => $proposalId]);
            return redirect(route('proposal.show', ['proposal' => $proposalId]))->with('status', 'Sukses Menambah tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah tracking']);
        }
    }

    public function edit(string $proposalId, string $id): Response
    {
        return Inertia::render('Admin/Proposal/TrackingForm', [
            'tracking' => $this->proposalTrackingRepository->getTracking($id)
        ]);
    }

    public function update(Request $request, string $proposalId, string $id): mixed
    {
        try {
            $proposalTracking = $this->proposalTrackingRepository->getTracking($id);
            $proposalTracking->update([...($request->all()), 'proposal_id' => $proposalId]);
            return redirect(route('proposal.show', ['proposal' => $proposalId]))->with('status', 'Sukses Edit tracking');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal edit tracking']);
        }
    }

    public function destroy(string $id)
    {
        //
    }
}
