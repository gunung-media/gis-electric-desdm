<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Territory\VillageRepository;
use App\Repositories\VillageElectricityRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VillageElectricityController extends Controller
{
    public function __construct(
        protected VillageElectricityRepository $villageElectricityRepository = new VillageElectricityRepository(),
        protected VillageRepository $villageRepository = new VillageRepository()
    ) {
    }

    public function index(): Response
    {
        $villageElectricitys =  $this->villageElectricityRepository->getVillageElectricitys();
        return Inertia::render('Admin/VillageElectricity/Index', [
            'villageElectricitys' => $villageElectricitys
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/VillageElectricity/Form');
    }

    public function store(Request $request): mixed
    {
        $request->validate([
            'village_code' => 'required',
            'households_with_electricity' => 'required|integer',
            'households_without_electricity' => 'required|integer',
            'network_length' => 'required|numeric',
            'village_potential' => 'nullable|string',
        ]);

        try {
            if ($request->has('borders')) {
                $this->villageRepository->updateBorderVillage($request->input('village_code'), $request->input('borders'));
            }
            $this->villageElectricityRepository->insertVillageElectricity($request->all());
            return redirect(route('admin.village_electricity.index'))->with('status', 'Sukses Menambah Rencana Pembangunan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Rencana Pembangunan']);
        }
    }

    public function edit(string $id): Response
    {
        $villageElectricity = $this->villageElectricityRepository->getVillageElectricity($id);
        return Inertia::render('Admin/VillageElectricity/Form', [
            'villageElectricity' => $villageElectricity
        ]);
    }

    public function update(Request $request, string $id): mixed
    {
        $request->validate([
            'village_code' => 'required',
            'households_with_electricity' => 'required|integer',
            'households_without_electricity' => 'required|integer',
            'network_length' => 'required|numeric',
            'village_potential' => 'nullable|string',
        ]);

        try {
            if ($request->has('borders')) {
                $this->villageRepository->updateBorderVillage($request->input('village_code'), json_decode($request->input('borders')));
            }
            $villageElectricity = $this->villageElectricityRepository->getVillageElectricity($id);
            $villageElectricity->update($request->all());
            return redirect(route('admin.village_electricity.index'))->with('status', 'Sukses Mengedit Rencana Pembangunan');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal Mengedit Rencana Pembangunan']);
        }
    }

    public function destroy(string $id): mixed
    {
        $villageElectricity = $this->villageElectricityRepository->getVillageElectricity($id);
        $villageElectricity->delete();
        return redirect(route('admin.village_electricity.index'))->with('status', 'Sukses Menghapus Rencana Pembangunan');
    }
}
