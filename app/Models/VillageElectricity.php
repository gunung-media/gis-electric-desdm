<?php

namespace App\Models;

use App\Models\Territory\Village;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class VillageElectricity extends Model
{
    protected $fillable = [
        'village_code',
        'kk',
        'households_with_electricity',
        'households_with_electricity_non_pln',
        'households_without_electricity',
        'network_length',
        'village_potential',
    ];

    public $appends = ['electricity', 'is_village_electric_pln', 'is_village_electric_non_pln', 'is_village_no_electric', 'households_count'];

    public function householdsCount(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->households_with_electricity + $this->households_with_electricity_non_pln
        );
    }

    public function isVillageElectricPln(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->households_with_electricity != 0
        );
    }

    public function isVillageElectricNonPln(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->households_with_electricity_non_pln != 0
        );
    }

    public function isVillageNoElectric(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->households_with_electricity_non_pln == 0 && $this->households_with_electricity == 0
        );
    }

    public function electricity(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->households_with_electricity > $this->households_without_electricity ? true : false
        );
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class, 'village_code', 'code');
    }
}
