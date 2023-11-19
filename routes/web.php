<?php

use App\Http\Controllers\Auth\AuthenticateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Route::inertia('/', 'Landing');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticateController::class, 'create'])->name('login');
    Route::post('login', [AuthenticateController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthenticateController::class, 'destroy'])->name('logout');
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::inertia('/', 'Dashboard')->name('dashboard');
    });
});
