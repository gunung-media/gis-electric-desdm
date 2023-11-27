<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Proposal\ProposalRepository;
use Inertia\Inertia;
use Inertia\Response;

class ProposalController extends Controller
{
    public function __construct(
        protected ProposalRepository $proposalRepository = new ProposalRepository()
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Proposal/index', ['datas' => $this->proposalRepository->getProposals()]);
    }

    public function show(string $id): Response
    {
        return Inertia::render('Admin/Proposal/detail', ['data' => $this->proposalRepository->getProposal($id)]);
    }

    public function destroy(string $id): mixed
    {
        $proposal = $this->proposalRepository->getProposal($id);
        $proposal->delete();
        return redirect(route('admin.proposal.index'))->with('status', 'Sukses Menghapus Urusan');
    }
}
