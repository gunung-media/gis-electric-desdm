<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Repositories\ElectricSubstationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function __construct(
        protected ElectricSubstationRepository $electricSubstationRepository = new ElectricSubstationRepository()
    ) {
    }

    public function __invoke(Request $request): mixed
    {
        $electricSubstations = $this->electricSubstationRepository->getElectricSubstations();
        return Inertia::render('Map/index', [
            'electricSubstationData' => $electricSubstations
        ]);
    }
}
