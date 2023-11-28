<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\DevelopmentPlanRepository;
use Illuminate\Http\Request;
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
        $developmentPlans =  $this->developmentPlanRepository->getDevelopmentPlans();
        return Inertia::render('Admin/DevelopmentPlan/Index', [
            'developmentPlans' => $developmentPlans
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/DevelopmentPlan/Form');
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:Dalam Perencanaan,Disetujui,Dalam Progress,Selesai',
            'document_path' => 'required|file|mimes:pdf'
        ]);

        $documentPath = $request->file('document_path')->store('development_plan_documents');
        try {
            $this->developmentPlanRepository->insertDevelopmenPlan([...($request->all()), 'document_path' => $documentPath]);
            return redirect(route('admin.development-plan.index'))->with('status', 'Sukses Menambah Rencana Pembangunan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Rencana Pembangunan']);
        }
    }

    public function edit(string $id): Response
    {
        $developmentPlan = $this->developmentPlanRepository->getDevelopmentPlan($id);
        return Inertia::render('Admin/DevelopmentPlan/Form', [
            'developmentPlan' => $developmentPlan
        ]);
    }

    public function update(Request $request, string $id): mixed
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:Dalam Perencanaan,Disetujui,Dalam Progress,Selesai',
            'document_path' => 'required|file|mimes:pdf'
        ]);

        $documentPath = $request->file('document_path')->store('development_plan_documents');
        try {
            $developmentPlan = $this->developmentPlanRepository->getDevelopmentPlan($id);
            $developmentPlan->update([...($request->all()), 'document_path' => $documentPath]);
            return redirect(route('admin.development-plan.index'))->with('status', 'Sukses Mengedit Rencana Pembangunan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal Mengedit Rencana Pembangunan']);
        }
    }

    public function destroy(string $id): mixed
    {
        $developmentPlan = $this->developmentPlanRepository->getDevelopmentPlan($id);
        $developmentPlan->delete();
        return redirect(route('admin.development-plan.index'))->with('status', 'Sukses Menghapus Rencana Pembangunan');
    }
}
