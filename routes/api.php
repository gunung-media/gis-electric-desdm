<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use KodePandai\Indonesia\Models\Village;

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

Route::get('/indonesia/kalteng/villages', function () {
    $kalimantanTengahVillage = Village::whereRelation('province', 'indonesia_provinces.code', 62)->with(['district', 'city'])->get();
    return response()->json(['data' => $kalimantanTengahVillage->toArray()]);
});
