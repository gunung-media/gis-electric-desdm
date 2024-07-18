<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\BpblProposal\BpblProposalRepository;
use Inertia\Inertia;
use Inertia\Response;

class BpblProposalController extends Controller
{
    public function __construct(
        protected BpblProposalRepository $bpblProposalRepository = new BpblProposalRepository()
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/BpblProposal/index', ['datas' => $this->bpblProposalRepository->getBpblProposals()]);
    }

    public function show(string $id): Response
    {
        return Inertia::render('Admin/BpblProposal/Detail', ['data' => $this->bpblProposalRepository->getBpblProposal($id)]);
    }

    public function destroy(string $id): mixed
    {
        $proposal = $this->bpblProposalRepository->getBpblProposal($id);
        $proposal->delete();
        return redirect(route('admin.bpbl-proposal.index'))->with('status', 'Sukses Menghapus Urusan');
    }
}
