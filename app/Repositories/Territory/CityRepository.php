<?php

namespace App\Repositories\Territory;

use App\Models\Territory\City;

class CityRepository
{
    public function __construct(
        protected City $city = new City()
    ) {
    }
}
