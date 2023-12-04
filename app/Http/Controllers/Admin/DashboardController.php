<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Proposal\ProposalRepository;
use App\Repositories\Report\ReportRepository;
use App\Repositories\Territory\VillageRepository;
use App\Repositories\VillageElectricityRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected ProposalRepository $proposalRepository = new ProposalRepository(),
        protected ReportRepository $reportRepository = new ReportRepository(),
        protected VillageRepository $villageRepository = new VillageRepository(),
        protected VillageElectricityRepository $villageElectricityRepository = new VillageElectricityRepository(),
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $villages = $this->villageRepository->getVillages();
        $villageElectricCount = 0;
        $villageNonElectricCount = 0;

        foreach ($this->villageElectricityRepository->getVillageElectricitys() as  $village) {
            if ($village->electricity) $villageElectricCount += 1;
            else $villageNonElectricCount += 1;
        }

        return Inertia::render('Dashboard', [
            'proposalCount' => $this->proposalRepository->getProposals()->count(),
            'reportCount' => $this->reportRepository->getReports()->count(),
            'villageCount' => $villages->count(),
            'villageElectricCount' => $villageElectricCount,
            'villageNonElectricCount' => $villageNonElectricCount,
        ]);
    }
}
