<?php

use App\Http\Controllers\Auth\AuthenticateController;
use App\Http\Controllers\ElectricSubstationController;
use App\Http\Controllers\MapController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Route::inertia('/', 'Landing/index');
Route::get('/map', MapController::class)->name('map');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticateController::class, 'create'])->name('login');
    Route::post('login', [AuthenticateController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthenticateController::class, 'destroy'])->name('logout');
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::inertia('/', 'Dashboard')->name('dashboard');
        Route::resource('gardu_listrik', ElectricSubstationController::class);
    });
});
