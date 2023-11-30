<?php

namespace App\Repositories\Territory;

use App\Models\Territory\District;

class DistrictRepository
{
    public function __construct(
        protected District $district = new District()
    ) {
    }
}
