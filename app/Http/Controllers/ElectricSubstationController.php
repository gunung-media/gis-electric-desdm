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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ElectricSubstation $electricSubstation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ElectricSubstation $electricSubstation)
    {
        //
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
