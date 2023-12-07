<?php

namespace App\Http\Controllers\Landing;

use App\Exports\StatisticExport;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;

class StatisticVillageExportController extends Controller
{
    public function __invoke()
    {
        return Excel::download(new StatisticExport, 'statistic_listrik.xlsx');
    }
}
