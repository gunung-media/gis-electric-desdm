<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use KodePandai\Indonesia\Models\District;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class ElectricSubstation extends Model
{
    protected $fillable = [
        'district_code',
        'name',
        'description',
        'latitude',
        'longitude',
    ];

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class, 'district_code', 'code');
    }
}
