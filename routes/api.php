<?php

use App\Http\Controllers\Landing\GuideController;
use App\Http\Controllers\TerritoryController;
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

Route::name('api.')->group(function () {
    Route::get('/indonesia/kalteng/villages', [TerritoryController::class, 'villagesBorder'])->name('villagesBorder');
    Route::get('/indonesia/kalteng/cities', [TerritoryController::class, 'kaltengCity'])->name('kaltengCity');
    Route::get('/indonesia/kalteng/district/{cityCode}', [TerritoryController::class, 'districtWithElectric'])->name('districtWithElectric');
    Route::get('/territory/district/{districtId}', [TerritoryController::class, 'districtInfo'])->name('districtInfo');
    Route::get('/territory/city/{cityId}', [TerritoryController::class, 'cityInfo'])->name('cityInfo');
    Route::get('/territory/search/{input?}', [TerritoryController::class, 'searcher'])->name('searcher');

    Route::get('settings', [GuideController::class, 'api'])->name('guide');
});
