<?php

namespace App\Http\Controllers;

use App\Repositories\Territory\CityRepository;
use App\Repositories\Territory\DistrictRepository;
use App\Repositories\Territory\VillageRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TerritoryController extends Controller
{
    public function __construct(
        protected VillageRepository $villageRepository = new VillageRepository(),
        protected DistrictRepository $districtRepository = new DistrictRepository(),
        protected CityRepository $cityRepository = new CityRepository(),
    ) {
    }

    public function kaltengCity(Request $request): JsonResponse
    {
        return response()->json(['data' => $this->cityRepository->getCities()->toArray()]);
    }

    public function villagesBorder(Request $request): JsonResponse
    {
        return response()->json(['data' => $this->villageRepository->getVillageBorders($request)->toArray()]);
    }

    public function districtInfo(Request $request, $districtId): JsonResponse
    {
        return response()->json(['data' => $this->districtRepository->getDistrictInfo($districtId)]);
    }

    public function cityInfo(Request $request, $cityId): JsonResponse
    {
        return response()->json(['data' => $this->cityRepository->getCityInfo($cityId)]);
    }

    public function searcher(Request $request, ?string $input = null): JsonResponse
    {
        $input = $input ?? $request->input('input');
        if (is_null($input))
            return response()->json(['message' => 'input cannot be null', 'data' => null], 402);
        $cities = $this->cityRepository->search($input)->toArray();
        $districts = $this->districtRepository->search($input)->toArray();
        $villages = $this->villageRepository->search($input)->toArray();

        return response()->json(['data' => [...$cities, ...$districts, ...$villages]]);
    }
}
