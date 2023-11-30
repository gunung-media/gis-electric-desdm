<?php

namespace App\Models\Territory;

use Illuminate\Database\Eloquent\Relations\HasMany;
use KodePandai\Indonesia\Models\District as ModelsDistrict;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class District extends ModelsDistrict
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->mergeFillable(['borders']);
    }

    public function villages(): HasMany
    {
        return $this->hasMany(Village::class);
    }
}
