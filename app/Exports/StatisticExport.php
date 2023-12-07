<?php

namespace App\Exports;

use App\Repositories\Territory\VillageRepository;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class StatisticExport implements FromView
{
    public function __construct(
        protected VillageRepository $villageRepository = new VillageRepository()
    ) {
    }

    public function view(): View
    {
        return view('export', [
            'datas' => $this->villageRepository->getVillages()
        ]);
    }
}
