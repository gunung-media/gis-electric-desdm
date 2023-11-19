<?php

namespace App\Repositories;

use App\Models\ElectricSubstation;
use Illuminate\Database\Eloquent\Collection;

class ElectricSubstationRepository
{
    public function __construct(
        protected ElectricSubstation $model = new ElectricSubstation()
    ) {
    }

    public function insertElectricSubstation(array $data): ElectricSubstation
    {
        return $this->model->create($data);
    }

    public function getElectricSubstation(mixed $id): ?ElectricSubstation
    {
        return $this->model->findOrFail($id);
    }

    public function getElectricSubstations(): Collection
    {
        return $this->model->all();
    }
}
