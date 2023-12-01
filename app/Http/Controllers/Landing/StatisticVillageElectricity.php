<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatisticVillageElectricity extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        Inertia::setRootView('horizontal');
        return Inertia::render('StatisticVillageElectricity/Index');
    }
}
