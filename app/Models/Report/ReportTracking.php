<?php

namespace App\Models\Report;

use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class ReportTracking extends Model
{
    protected $fillable = [
        'description',
        'status',
        'report_id',
    ];

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class);
    }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($val) => DateHelper::indonesianDate($val)
        );
    }
}
