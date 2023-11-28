<?php

namespace App\Models\Proposal;

use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class ProposalTracking extends Model
{
    protected $fillable = [
        'description',
        'status',
        'proposal_id',
    ];

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($val) => DateHelper::indonesianDate($val)
        );
    }
}
