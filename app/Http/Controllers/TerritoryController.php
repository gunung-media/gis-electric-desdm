<?php

namespace App\Http\Controllers;

use App\Repositories\Territory\DistrictRepository;
use App\Repositories\Territory\VillageRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TerritoryController extends Controller
{
    public function __construct(
        protected VillageRepository $villageRepository = new VillageRepository(),
        protected DistrictRepository $districtRepository = new DistrictRepository(),

    ) {
    }

    public function villagesBorder(Request $request): JsonResponse
    {
        ini_set('memory_limit', '1024M');
        return response()->json(['data' => $this->villageRepository->getVillageBorders($request)->toArray()]);
    }

    public function districtInfo(Request $request, $districtId): JsonResponse
    {
        return response()->json(['data' => $this->districtRepository->getDistrictInfo($districtId)]);
    }
}
