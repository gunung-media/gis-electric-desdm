<?php

namespace App\Models\Proposal;

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
}
