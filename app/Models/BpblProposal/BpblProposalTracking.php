<?php

namespace App\Models\BpblProposal;

use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class BpblProposalTracking extends Model
{
    protected $fillable = [
        'description',
        'status',
        'bpbl_proposal_id',
    ];

    public function bpblProposal(): BelongsTo
    {
        return $this->belongsTo(BpblProposal::class);
    }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($val) => DateHelper::indonesianDate($val)
        );
    }
}
