<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Repositories\DevelopmentPlanRepository;
use Inertia\Inertia;
use Inertia\Response;

class DevelopmentPlanController extends Controller
{
    public function __construct(
        protected DevelopmentPlanRepository $developmentPlanRepository = new DevelopmentPlanRepository()
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Landing/DevelopmentPlan/index', [
            'developmentPlans' => $this->developmentPlanRepository->getDevelopmentPlans()
        ]);
    }

    public function show(string $id): Response
    {
        return Inertia::render('Landing/DevelopmentPlan/index', [
            'developmentPlan' => $this->developmentPlanRepository->getDevelopmentPlan($id)
        ]);
    }
}
