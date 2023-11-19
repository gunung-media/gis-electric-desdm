<?php

namespace App\Repositories;

use App\Models\ElectricSubstation;
use Illuminate\Database\Eloquent\Collection;

class ElectricSubstationRepository
{
    public function insertElectricSubstation(array $data): ElectricSubstation
    {
        return ElectricSubstation::create($data);
    }

    public function getElectricSubstation(mixed $id): ElectricSubstation
    {
        return ElectricSubstation::find($id);
    }

    public function getElectricSubstations(): Collection
    {
        return ElectricSubstation::all();
    }
}
