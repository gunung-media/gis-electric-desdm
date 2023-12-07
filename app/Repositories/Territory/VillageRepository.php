<?php

namespace App\Repositories\Territory;

use App\Models\Territory\Village;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

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

    public function getVillages(): Collection
    {
        $query = $this->model
            ->whereRelation('province', 'indonesia_provinces.code', 62)
            ->with(['electricity', 'city', 'district']);

        return $query->get();
    }

    public function getVillageBorders(Request $request): Collection
    {
        $query = $this->model
            ->whereRelation('province', 'indonesia_provinces.code', 62)
            ->with(['district', 'city', 'electricity']);

        if ($request->query('district_code', false)) {
            $query->where('district_code', $request->query('district_code'));
        }

        return $query->get()->makeVisible(['borders']);
    }

    public function search(string $input): Collection
    {
        $query = $this->model
            ->whereRelation('province', 'indonesia_provinces.code', 62)
            ->where('name', 'LIKE', "%$input%")
            ->with(['district', 'city', 'electricity']);

        return $query->get();
    }
}
