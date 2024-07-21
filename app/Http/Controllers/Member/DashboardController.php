<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Repositories\BpblProposal\BpblProposalRepository;
use App\Repositories\BusinessReport\BusinessReportRepository;
use App\Repositories\PeriodicReport\PeriodicReportRepository;
use App\Repositories\Proposal\ProposalRepository;
use App\Repositories\Report\ReportRepository;
use App\Repositories\Territory\CityRepository;
use App\Repositories\Territory\VillageRepository;
use App\Repositories\VillageElectricityRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected BpblProposalRepository $bpblProposalRepository = new BpblProposalRepository(),
        protected BusinessReportRepository $businessReportRepository = new BusinessReportRepository(),
        protected PeriodicReportRepository $periodicReportRepository = new PeriodicReportRepository()
    ) {}

    public function __invoke(Request $request): Response
    {
        return Inertia::render('MemberDashboard', [
            'bpblProposalCount' => $this->bpblProposalRepository->getBpblProposals()->count(),
            'businessReportCount' => $this->businessReportRepository->getBusinessReports()->count(),
            'periodicReportCount' => $this->periodicReportRepository->getPeriodicReports()->count(),
        ]);
    }
}
