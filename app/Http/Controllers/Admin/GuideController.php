<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\GuideRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuideController extends Controller
{
    public function __construct(
        protected GuideRepository $guideRepository = new GuideRepository()
    ) {
    }

    public function index(): Response
    {
        $data = $this->guideRepository->getGuide();
        return Inertia::render('Admin/Guide/Index', ['data' => $data]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'file' => 'file|mimes:pdf'
        ]);

        $filePath = null;
        if ($request->has('file')) {
            $filePath = $request->file('file')->store('guide_documents');
        }

        $payload = $request->all();
        if (!is_null($this->guideRepository->update($id, [...$payload, 'file' => $filePath])))
            return redirect(route('admin.guide.index'))->with('status', 'Sukses Mengupdate Guide');
        return redirect(route('admin.guide.index'))->withErrors(['errors' => 'Gagal Mengupdate Guide']);
    }
}
