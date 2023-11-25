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

    public function edit($id)
    {
        $electricSubstation = $this->electricSubstationRepository->getElectricSubstation($id);
        return Inertia::render('ElectricSubstation/Form', [
            'electricSubstation' => $electricSubstation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ElectricSubstation $electricSubstation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ElectricSubstation $electricSubstation)
    {
        //
    }
}
