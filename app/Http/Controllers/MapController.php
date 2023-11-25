<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function __invoke(Request $request): mixed
    {
        return Inertia::render('Map/index');
    }
}
