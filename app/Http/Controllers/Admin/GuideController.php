<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\GuideRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuideController extends Controller
{
    public function __construct(
        protected GuideRepository $guideRepository = new GuideRepository()
    ) {}

    public function index(): Response
    {
        $datas =  $this->guideRepository->getAll();
        return Inertia::render('Admin/Guide/Index', [
            'guides' => $datas
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Guide/Form');
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'file' => 'file|mimes:pdf'
        ]);

        $filePath = null;
        if ($request->has('file')) {
            $filePath = $request->file('file')->store('guide_documents');
        }
        try {
            $this->guideRepository->insert([...($request->all()), 'file' => $filePath]);
            return redirect(route('admin.guide.index'))->with('status', 'Sukses Menambah User');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah User']);
        }
    }

    public function edit(string $id): Response
    {
        $guide = $this->guideRepository->getById($id);
        return Inertia::render('Admin/Guide/Form', [
            'guide' => $guide
        ]);
    }

    public function update(Request $request, string $id): mixed
    {
        $request->validate([
            'file' => 'file|mimes:pdf'
        ]);

        try {
            $guide = $this->guideRepository->getById($id);

            $filePath = $guide->file;
            if ($request->has('file')) {
                $filePath = $request->file('file')->store('guide_documents');
            }

            $guide->update([...($request->all()), 'file' => $filePath]);
            return redirect(route('admin.guide.index'))->with('status', 'Sukses Mengedit User');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal Mengedit User']);
        }
    }

    public function destroy(string $id): mixed
    {
        if ($id == 1 || $id == '1') {
            return back()->withErrors(['error' => 'Gagal Menghapus, Informasi Umum Tidak boleh dihapus']);
        }
        $user = $this->guideRepository->getById($id);
        $user->delete();
        return redirect(route('admin.guide.index'))->with('status', 'Sukses Menghapus User');
    }
}
