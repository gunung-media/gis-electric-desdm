<?php

namespace App\Models\Proposal;

use App\Models\Territory\Village;
use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Proposal extends Model
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
        'proposal_type',
        'description',
        'document_path',
        'estimated_cost',
        'priority',
        'additional_note',
        'nomor_surat_usulan',
        'perihal',
        'tgl_surat',
    ];

    protected $appends = ["latest_status"];

    public function latestStatus(): Attribute
    {
        return Attribute::make(
            get: fn () => count($this->trackings) === 0 ? "Terkirim" : $this->trackings->last()->status
        );
    }

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($val) => DateHelper::indonesianDate($val)
        );
    }

    public function tglSurat(): Attribute
    {
        return Attribute::make(
            get: fn ($val) => DateHelper::indonesianDate($val ?? '')
        );
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class, 'village_code', 'code');
    }

    public function trackings(): HasMany
    {
        return $this->hasMany(ProposalTracking::class);
    }
}
