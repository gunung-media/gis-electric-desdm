<?php

namespace App\Models\BpblProposal;

use App\Models\Member;
use App\Models\Territory\Village;
use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class BpblProposal extends Model
{
    protected $fillable = [
        'full_name',
        'identity_number',
        'email',
        'phone_number',
        'village_code',
        'address',
        'latitude',
        'longitude',
        'description',
        'statement_path',
        'ktp_path',
        'house_path',
        'nearest_path',
        'letter_path',
        'member_id'
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

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    // public function trackings(): HasMany
    // {
    //     return $this->hasMany(ProposalTracking::class);
    // }
}
