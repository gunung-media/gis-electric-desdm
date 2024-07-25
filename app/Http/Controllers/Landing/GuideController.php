<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Repositories\GuideRepository;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class GuideController extends Controller
{
    public function __construct(
        protected GuideRepository $guideRepository = new GuideRepository()
    ) {}

    public function api(): JsonResponse
    {
        return response()->json(['data' => $this->guideRepository->getFirstGuide()]);
    }

    public function index(): Response
    {
        Inertia::setRootView('horizontal');
        return Inertia::render('Guide/Index', [
            'data' => $this->guideRepository->getFirstGuide()
        ]);
    }
}
