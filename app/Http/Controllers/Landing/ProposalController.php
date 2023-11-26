<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Proposal\Proposal;
use App\Repositories\Proposal\ProposalRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function __construct(
        protected ProposalRepository $proposalRepository = new ProposalRepository()
    ) {
    }

    public function index()
    {
        $proposals = $this->proposalRepository->getProposals();
        return Inertia::render('Proposal/index', [
            'proposals' => $this->proposalRepository->getProposals()
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Proposal $proposal)
    {
        //
    }
}
