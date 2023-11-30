<?php

namespace App\Models\Territory;

use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use KodePandai\Indonesia\Models\City as ModelsCity;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class City extends ModelsCity
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->mergeFillable(['borders']);
    }

    public function villages(): HasManyThrough
    {
        return $this->hasManyThrough(Village::class, District::class);
    }
}
