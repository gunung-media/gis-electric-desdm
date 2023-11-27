<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticateController;

use App\Http\Controllers\Admin\ElectricSubstationController;
use App\Http\Controllers\Admin\ProposalController as AdminProposalController;
use App\Http\Controllers\Admin\ProposalTrackingController;

use App\Http\Controllers\Landing\MapController;
use App\Http\Controllers\Landing\ProposalController;
use App\Http\Controllers\Landing\ReportController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::inertia('/', 'Landing/index')->name('landing');
Route::get('/map', MapController::class)->name('map');
Route::resource('/proposal', ProposalController::class)->only(['index', 'store', 'show']);
Route::resource('/report', ReportController::class)->only(['index', 'store', 'show']);

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticateController::class, 'create'])->name('login');
    Route::post('login', [AuthenticateController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::delete('logout', [AuthenticateController::class, 'destroy'])->name('logout');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::inertia('/', 'Dashboard')->name('dashboard');

        Route::resource('gardu_listrik', ElectricSubstationController::class)->except(['show']);

        Route::resource('proposal', AdminProposalController::class)->only(['index', 'show', 'destroy']);
        Route::name('proposal.')->prefix('proposal/{proposalId}')->group(function () {
            Route::resource('tracking', ProposalTrackingController::class)->except(['index', 'show']);
        });
    });
});
