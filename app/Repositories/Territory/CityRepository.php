<?php

namespace App\Repositories\Territory;

use App\Models\Territory\City;

class CityRepository
{
    public function __construct(
        protected City $city = new City()
    ) {
    }

    public function getCityInfo(mixed $cityCode)
    {
        $query = $this->city
            ->with(['villages', 'villages.electricity'])
            ->findOrFail($cityCode);
        return $query;
    }
}
