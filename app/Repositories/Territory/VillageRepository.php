<?php

namespace App\Repositories\Territory;

use App\Models\Territory\Village;

class VillageRepository
{
    public function __construct(
        protected Village $model = new Village()
    ) {
    }

    public function updateBorderVillage(mixed $villageCode, array $borders): mixed
    {
        $village = $this->model->where('code', $villageCode)->first();
        $village->borders = json_encode($borders);
        $village->save();
        return $village;
    }
}
