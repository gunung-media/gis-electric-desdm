<?php

namespace App\Models;

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
}
