<?php

namespace App\Models\Territory;

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
}
