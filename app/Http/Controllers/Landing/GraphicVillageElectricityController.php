<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Repositories\Territory\CityRepository;
use App\Repositories\Territory\DistrictRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GraphicVillageElectricityController extends Controller
{
    public function __construct(
        protected CityRepository $cityRepository = new CityRepository(),
        protected DistrictRepository $districtRepository = new DistrictRepository()
    ) {
    }

    public function __invoke(Request $request): Response
    {
        Inertia::setRootView('horizontal');
        return Inertia::render('GraphicVillageElectricity/Index', [
            'datas' => $this->cityRepository->getCities(),
            'palangkaraya' => $this->cityRepository->search('palangka raya')->first(),
        ]);
    }
}
