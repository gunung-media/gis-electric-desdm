<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Landing\DevelopmentPlanController;
use App\Http\Controllers\Landing\MapController;
use App\Http\Controllers\Landing\ProposalController;
use App\Http\Controllers\Landing\ReportController;
use App\Http\Controllers\Landing\StatisticVillageElectricityController;
use App\Http\Controllers\Landing\StatisticVillageExportController;
use App\Http\Controllers\Landing\GraphicVillageElectricityController;
use App\Http\Controllers\Landing\GuideController;

use App\Http\Controllers\TrackingViewController;

use App\Http\Controllers\Auth\AuthenticateController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ElectricSubstationController;
use App\Http\Controllers\Admin\GuideController as AdminGuideController;
use App\Http\Controllers\Admin\DevelopmentPlanController as AdminDevelopmentPlanController;
use App\Http\Controllers\Admin\VillageElectricityController as AdminVillageElectricityController;
use App\Http\Controllers\Admin\ProposalController as AdminProposalController;
use App\Http\Controllers\Admin\ProposalTrackingController;
use App\Http\Controllers\Admin\ReportController as AdminReportController;
use App\Http\Controllers\Admin\ReportTrackingController;

use App\Http\Controllers\Admin\BpblProposalController as AdminBpblProposalController;
use App\Http\Controllers\Admin\BpblProposalTrackingController;
use App\Http\Controllers\Admin\BusinessReportController as AdminBusinessReportController;
use App\Http\Controllers\Admin\BusinessReportTrackingController;
use App\Http\Controllers\Admin\PeriodicReportController as AdminPeriodicReportController;
use App\Http\Controllers\Admin\PeriodicReportTrackingController;

use App\Http\Controllers\Admin\MemberController as AdminMemberController;

use App\Http\Controllers\Member\MemberAuthenticateController;
use App\Http\Controllers\Member\MemberSignUpController;
use App\Http\Controllers\Member\DashboardController as MemberDashboardController;
use App\Http\Controllers\Member\BpblProposalController;
use App\Http\Controllers\Member\BusinessReportController;
use App\Http\Controllers\Member\PeriodicReportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::inertia('/', 'Landing/index')->name('landing');
Route::get('/map', MapController::class)->name('map');
Route::get('/statistic', StatisticVillageElectricityController::class)->name('statistic');
Route::get('/tracking', TrackingViewController::class)->name('tracking');
Route::get('/statistic/export', StatisticVillageExportController::class)->name('statistic.export');
Route::get('/graphic', GraphicVillageElectricityController::class)->name('graphic');
Route::get('/guide', [GuideController::class, 'index'])->name('guide');
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
        Route::get('/', DashboardController::class)->name('dashboard');

        Route::resource('gardu_listrik', ElectricSubstationController::class)->except(['show']);

        Route::resource('proposal', AdminProposalController::class)->only(['index', 'show', 'destroy']);
        Route::name('proposal.')->prefix('proposal/{proposalId}')->group(function () {
            Route::resource('tracking', ProposalTrackingController::class)->except(['index', 'show']);
        });

        Route::resource('report', AdminReportController::class)->only(['index', 'show', 'destroy']);
        Route::name('report.')->prefix('report/{reportId}')->group(function () {
            Route::resource('tracking', ReportTrackingController::class)->except(['index', 'show']);
        });

        Route::resource('bpbl-proposal', AdminBpblProposalController::class);
        Route::name('bpbl-proposal.')->prefix('bpbl-proposal/{bpbl_proposal}')->group(function () {
            Route::resource('tracking', BpblProposalTrackingController::class)->except(['index', 'show']);
        });

        Route::resource('business-report', AdminBusinessReportController::class)->only(['index', 'show', 'destroy']);
        Route::name('business-report.')->prefix('business-report/{business_report}')->group(function () {
            Route::resource('tracking', BusinessReportTrackingController::class)->except(['index', 'show']);
        });

        Route::resource('periodic-report', AdminPeriodicReportController::class)->only(['index', 'show', 'destroy']);
        Route::name('periodic-report.')->prefix('periodic-report/{periodic_report}')->group(function () {
            Route::resource('tracking', PeriodicReportTrackingController::class)->except(['index', 'show']);
        });

        Route::resource('users', AdminMemberController::class)->except(['show']);
        Route::resource('admin', UserController::class)->except(['show']);
        Route::resource('development-plan', AdminDevelopmentPlanController::class)->except(['show']);
        Route::resource('village_electricity', AdminVillageElectricityController::class)->except(['show']);
        Route::resource('guide', AdminGuideController::class)->except(['show']);

        Route::prefix('import')->name('import.')->group(function () {
            Route::post('village_electricity', [AdminVillageElectricityController::class, 'import'])->name('village_electricity');
            Route::post('bpbl_proposal', [AdminBpblProposalController::class, 'import'])->name('bpbl_proposal');
        });
    });
});

Route::prefix('member')->name('member.')->group(function () {
    Route::get('login', [MemberAuthenticateController::class, 'create'])->name('login')->middleware('guest.member');
    Route::post('login', [MemberAuthenticateController::class, 'store'])->name('login')->middleware('guest.member');
    Route::get('register', [MemberSignUpController::class, 'create'])->name('register')->middleware('guest.member');
    Route::post('register', [MemberSignUpController::class, 'store'])->name('register')->middleware('guest.member');

    Route::middleware('auth.member')->group(function () {
        Route::delete('logout', [MemberAuthenticateController::class, 'destroy'])->name('logout');
        Route::get('/', MemberDashboardController::class)->name('dashboard');

        Route::resource('/bpbl-proposal', BpblProposalController::class);
        Route::resource('/business-report', BusinessReportController::class);
        Route::resource('/periodic-report', PeriodicReportController::class);
    });
});
