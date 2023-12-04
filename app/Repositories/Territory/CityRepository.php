<?php

namespace App\Repositories\Territory;

use App\Models\Territory\City;
use Illuminate\Database\Eloquent\Collection;

class CityRepository
{
    public function __construct(
        protected City $city = new City()
    ) {
    }

    public function getCities(): Collection
    {
        $query = $this->city
            ->with(['districts.villages.electricity'])
            ->where('province_code', '62');
        return $query->get();
    }

    public function getCityInfo(mixed $cityCode): ?City
    {
        $query = $this->city
            ->with(['villages', 'villages.electricity'])
            ->findOrFail($cityCode);
        return $query;
    }

    public function search(string $input): Collection
    {
        $query = $this->city
            ->where('province_code', 62)
            ->where('name', 'LIKE', "%$input%");

        return $query->get();
    }
}
