<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Guide extends Model
{
    protected $fillable = [
        'sambutan_kadis',
        'file',
        'url_video',
        'description',
        'no_wa',
        'terms_and_condition'
    ];
}
