<?php

namespace App\Repositories\Territory;

use App\Models\Territory\District;
use Illuminate\Database\Eloquent\Collection;

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

    public function search(string $input): Collection
    {
        $query = $this->district
            ->whereRelation('province', 'indonesia_provinces.code', 62)
            ->where('name', 'LIKE', "%$input%");

        return $query->get();
    }
}
