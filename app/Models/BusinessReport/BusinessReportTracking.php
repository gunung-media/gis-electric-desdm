<?php

namespace App\Models\BusinessReport;

use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class BusinessReportTracking extends Model
{
    protected $fillable = [
        'description',
        'status',
        'business_report_id',
    ];

    public function businessReport(): BelongsTo
    {
        return $this->belongsTo(BusinessReport::class);
    }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($val) => DateHelper::indonesianDate($val)
        );
    }
}
