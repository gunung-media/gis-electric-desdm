<?php

namespace App\Models\Report;

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
}
