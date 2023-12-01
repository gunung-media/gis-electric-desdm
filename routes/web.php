<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticateController;

use App\Http\Controllers\Admin\ElectricSubstationController;
use App\Http\Controllers\Admin\ProposalController as AdminProposalController;
use App\Http\Controllers\Admin\ReportController as AdminReportController;
use App\Http\Controllers\Admin\ProposalTrackingController;
use App\Http\Controllers\Admin\ReportTrackingController;
use App\Http\Controllers\Admin\DevelopmentPlanController as AdminDevelopmentPlanController;
use App\Http\Controllers\Admin\VillageElectricityController as AdminVillageElectricityController;

use App\Http\Controllers\Landing\DevelopmentPlanController;
use App\Http\Controllers\Landing\MapController;
use App\Http\Controllers\Landing\ProposalController;
use App\Http\Controllers\Landing\ReportController;
use App\Http\Controllers\Landing\StatisticVillageElectricity;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::inertia('/', 'Landing/index')->name('landing');
Route::get('/map', MapController::class)->name('map');
Route::get('/statistic', StatisticVillageElectricity::class)->name('statistic');
Route::resource('/proposal', ProposalController::class)->only(['index', 'store', 'show']);
Route::resource('/report', ReportController::class)->only(['index', 'store', 'show']);
Route::resource('/development-plan', DevelopmentPlanController::class)->only(['index', 'show']);

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

        Route::resource('report', AdminReportController::class)->only(['index', 'show', 'destroy']);
        Route::name('report.')->prefix('report/{reportId}')->group(function () {
            Route::resource('tracking', ReportTrackingController::class)->except(['index', 'show']);
        });

        Route::resource('development-plan', AdminDevelopmentPlanController::class)->except(['show']);
        Route::resource('village_electricity', AdminVillageElectricityController::class)->except(['show']);
    });
});
