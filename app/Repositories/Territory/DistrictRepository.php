<?php

namespace App\Repositories\Territory;

use App\Models\Territory\District;

class DistrictRepository
{
    public function __construct(
        protected District $district = new District()
    ) {
    }

    public function getDistrictInfo(mixed $districtCode)
    {
        $query = $this->district
            ->with(['villages', 'villages.electricity'])
            ->findOrFail($districtCode);
        return $query;
    }
}
