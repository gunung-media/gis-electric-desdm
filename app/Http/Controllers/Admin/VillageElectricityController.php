<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\VillageElectricityImport;
use App\Repositories\Territory\VillageRepository;
use App\Repositories\VillageElectricityRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

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
            'village_code' => 'required|unique:village_electricities,village_code',
            'households_with_electricity' => 'required|integer',
            'households_with_electricity_non_pln' => 'required|integer',
            'households_without_electricity' => 'required|integer',
            'network_length' => 'nullable|numeric',
            'village_potential' => 'nullable|string',
            'energy_potential' => 'nullable|string',
            'kk' => 'nullable|integer',
        ]);

        try {
            if ($request->has('borders') && !is_null($request->input('borders'))) {
                $this->villageRepository->updateBorderVillage($request->input('village_code'), json_decode($request->input('borders')));
            }
            $this->villageElectricityRepository->insertVillageElectricity([...$request->all(), 'village_code' => (string) $request->input('village_code')]);
            return redirect(route('admin.village_electricity.index'))->with('status', 'Sukses Menambah Kelistrikan Desa');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal menambah Kelistrikan Desa']);
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
            'village_code' => 'unique:village_electricities,village_code,' . $id,
        ]);

        try {
            if ($request->has('borders') && !is_null($request->input('borders'))) {
                $this->villageRepository->updateBorderVillage($request->input('village_code'), json_decode($request->input('borders')));
            }
            $villageElectricity = $this->villageElectricityRepository->getVillageElectricity($id);
            $villageElectricity->update($request->all());
            return redirect(route('admin.village_electricity.index'))->with('status', 'Sukses Mengedit Kelistrikan Desa');
        } catch (\Throwable $th) {
            error_log(json_encode($th->getMessage()));
            return back()->withErrors(['error' => 'Gagal Mengedit Kelistrikan Desa']);
        }
    }

    public function destroy(string $id): mixed
    {
        $villageElectricity = $this->villageElectricityRepository->getVillageElectricity($id);
        $villageElectricity->delete();
        return redirect(route('admin.village_electricity.index'))->with('status', 'Sukses Menghapus Kelistrikan Desa');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        DB::beginTransaction();
        try {
            $file = $request->file('file');

            Excel::import(new VillageElectricityImport, $file);
            DB::commit();
            return redirect(route('admin.village_electricity.index'))->with('status', 'Sukses Mengimport Kelistrikan Desa');
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
