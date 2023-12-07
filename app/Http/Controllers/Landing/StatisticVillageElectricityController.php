<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Repositories\Territory\CityRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatisticVillageElectricityController extends Controller
{
    public function __construct(
        protected CityRepository $cityRepository = new CityRepository()
    ) {
    }

    public function __invoke(Request $request): Response
    {
        Inertia::setRootView('horizontal');
        return Inertia::render('StatisticVillageElectricity/Index', [
            'datas' => $this->cityRepository->getCities()
        ]);
    }
}
