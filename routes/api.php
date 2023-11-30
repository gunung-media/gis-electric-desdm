<?php

use App\Repositories\Territory\VillageRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/indonesia/kalteng/villages', function (Request $request) {
    ini_set('memory_limit', '1024M');
    $villageRepository = new VillageRepository();
    return response()->json(['data' => $villageRepository->getVillageBorders($request)->toArray()]);
});
