<?php

namespace App\Http\Controllers;

use App\Models\ElectricSubstation;
use App\Repositories\ElectricSubstationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ElectricSubstationController extends Controller
{
    public function __construct(
        protected ElectricSubstationRepository $electricSubstationRepository = new ElectricSubstationRepository()
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('ElectricSubstation/Index', [
            'datas' => $this->electricSubstationRepository->getElectricSubstations()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ElectricSubstation/Form');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'district_code' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        try {
            $this->electricSubstationRepository->insertElectricSubstation($request->toArray());
            return redirect(route('admin.gardu_listrik.index'))->with('status', 'Sukses Menambah Gardu Listik');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Gardu Listik']);
        }
    }

    public function edit(mixed $electricSubstation): Response
    {
        $electricSubstation = $this->electricSubstationRepository->getElectricSubstation($electricSubstation);
        return Inertia::render('ElectricSubstation/Form', [
            'electricSubstation' => $electricSubstation
        ]);
    }

    public function update(Request $request, $electricSubstation)
    {
        try {
            $electricSubstation = $this->electricSubstationRepository->getElectricSubstation($electricSubstation);
            $electricSubstation->update($request->toArray());
            return redirect(route('admin.gardu_listrik.index'))->with('status', 'Sukses Mengupdate Gardu Listik');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal mengupdate Gardu Listik']);
        }
    }

    public function destroy($electricSubstation)
    {
        $electricSubstation = $this->electricSubstationRepository->getElectricSubstation($electricSubstation);
        $electricSubstation->delete();
        return redirect(route('admin.gardu_listrik.index'))->with('status', 'Sukses Menghapus Gardu Listik');
    }
}
