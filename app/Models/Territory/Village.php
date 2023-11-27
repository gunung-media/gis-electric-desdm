<?php

namespace App\Models\Territory;

use Illuminate\Database\Eloquent\Casts\Attribute;
use KodePandai\Indonesia\Models\Village as KodePandaiVillage;

class Village extends KodePandaiVillage
{
    public $appends = ['latitude', 'longitude'];
    public function latitude(): Attribute
    {
        return Attribute::make(get: fn ($val) => $val ?? "0.064411");
    }

    public function longitude(): Attribute
    {
        return Attribute::make(get: fn ($val) => $val ?? "114.921690");
    }
}
