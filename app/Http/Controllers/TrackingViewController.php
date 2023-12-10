<?php

namespace App\Http\Controllers;

use App\Repositories\Proposal\ProposalRepository;
use App\Repositories\Report\ReportRepository;
use Inertia\Inertia;
use Inertia\Response;

class TrackingViewController extends Controller
{
    public function __construct(
        protected ProposalRepository $proposalRepository = new ProposalRepository(),
        protected ReportRepository $reportRepository = new ReportRepository(),
    ) {
    }

    public function __invoke(): Response
    {
        $proposals = $this->proposalRepository->getProposals();
        $reports = $this->reportRepository->getReports();
        return Inertia::render('Tracking/index', [
            'datas' => array_merge($proposals->toArray(), $reports->toArray())
        ]);
    }
}
