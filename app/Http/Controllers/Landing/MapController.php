<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function __invoke(Request $request): mixed
    {
        return Inertia::render('Map/index');
    }
}
