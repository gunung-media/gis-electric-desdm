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
        'households_with_electricity',
        'households_without_electricity',
        'network_length',
        'village_potential',
    ];

    public $appends = ['electricity'];

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
