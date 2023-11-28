<?php

namespace App\Repositories;

use App\Models\VillageElectricity;
use Illuminate\Database\Eloquent\Collection;

class VillageElectricityRepository
{
    public function __construct(
        protected VillageElectricity $model = new VillageElectricity()
    ) {
    }

    public function insertVillageElectricity(array $data): VillageElectricity
    {
        return $this->model->create($data);
    }

    public function getVillageElectricity(mixed $id): ?VillageElectricity
    {
        return $this->model
            ->with(['village', 'village.district', 'village.district.city'])
            ->findOrFail($id);
    }

    public function getVillageElectricitys(): Collection
    {
        $query = $this->model->query();
        return $query
            ->with('village')->get();
    }
}
