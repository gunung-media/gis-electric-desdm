<?php

namespace App\Models\Territory;

use App\Models\VillageElectricity;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;
use KodePandai\Indonesia\Models\Village as KodePandaiVillage;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Village extends KodePandaiVillage
{
    public $appends = ['latitude', 'longitude'];
    protected $hidden = ['borders'];

    public function latitude(): Attribute
    {
        return Attribute::make(get: fn ($val) => $val ?? "0.064411");
    }

    public function longitude(): Attribute
    {
        return Attribute::make(get: fn ($val) => $val ?? "114.921690");
    }

    public function electricity(): HasOne
    {
        return $this->hasOne(VillageElectricity::class, 'village_code', 'code');
    }
}
