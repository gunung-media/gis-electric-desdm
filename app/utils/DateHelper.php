<?php

namespace App\utils;

use Carbon\Carbon;

class DateHelper
{
    public static function indonesianDate(string $date): string
    {
        $dateObj = Carbon::parse($date);
        $dateObj->setLocale('id');
        $formattedDate = $dateObj->isoFormat('dddd, D MMMM YYYY');
        return $formattedDate;
    }
}
