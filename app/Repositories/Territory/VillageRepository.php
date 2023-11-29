<?php

namespace App\Repositories\Territory;

use App\Models\Territory\Village;
use Illuminate\Database\Eloquent\Collection;

class VillageRepository
{
    public function __construct(
        protected Village $model = new Village()
    ) {
    }

    public function updateBorderVillage(mixed $villageCode, array $borders): mixed
    {
        $village = $this->model->where('code', $villageCode)->firstOrFail();
        $village->borders = $borders[0] ?? null;
        $village->save();
        return $village;
    }

    public function getVillageBorders(): Collection
    {
        $query = $this->model
            ->whereRelation('province', 'indonesia_provinces.code', 62)
            ->with(['district', 'city', 'electricity']);

        return $query->get();
    }
}
