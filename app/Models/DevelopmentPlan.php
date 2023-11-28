<?php

namespace App\Models;

use App\utils\DateHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class DevelopmentPlan extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'document_path'
    ];

    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($val) => DateHelper::indonesianDate($val)
        );
    }

    public function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($val) => DateHelper::indonesianDate($val)
        );
    }
}
