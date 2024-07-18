<?php

namespace App\Models;

use App\Models\Territory\Village;
use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class PeriodicReport extends Model
{
    protected $fillable = [
        'name',
        'type',
        'nib',
        'npwp',
        'permit_number',
        'email',
        'phone_number',
        'village_code',
        'address',
        'latitude',
        'longitude',
        'description',
        'report_type',
        'sk_path',
        'certificate_path',
        'condition_path',
        'periodic_path',
    ];

    // protected $appends = ["latest_status"];

    // public function latestStatus(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn() => count($this->trackings) === 0 ? "Terkirim" : $this->trackings->last()->status
    //     );
    // }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($val) => DateHelper::indonesianDate($val)
        );
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class, 'village_code', 'code');
    }

    // public function trackings(): HasMany
    // {
    //     return $this->hasMany(ProposalTracking::class);
    // }
}
