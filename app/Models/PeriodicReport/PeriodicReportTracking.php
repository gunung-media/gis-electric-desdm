<?php

namespace App\Models\PeriodicReport;

use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class PeriodicReportTracking extends Model
{
    protected $fillable = [
        'description',
        'status',
        'periodic_report_id',
    ];

    public function periodicReport(): BelongsTo
    {
        return $this->belongsTo(PeriodicReport::class);
    }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($val) => DateHelper::indonesianDate($val)
        );
    }
}
