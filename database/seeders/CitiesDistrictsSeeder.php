<?php

namespace Database\Seeders;

use App\Models\Territory\City;
use App\Models\Territory\District;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CitiesDistrictsSeeder extends Seeder
{
    public function readAndInsert(): void
    {
        $basePath = dirname(__DIR__) . '/raw/62/';

        $cities = File::directories($basePath);

        foreach ($cities as $cityPath) {
            $cityCode = basename($cityPath);

            // Read city JSON file
            $cityJsonPath = $cityPath . '/' . $cityCode . '.json';
            $cityData = json_decode(File::get($cityJsonPath), true)['features'][0];

            $city = City::where('code', $cityCode)->first();
            $city->update([
                'borders' => $cityData['geometry']
            ]);

            // Process districts inside the city
            $this->processDistricts($cityPath, $cityCode);
        }
    }

    private function processDistricts($cityPath, $cityCode): void
    {
        $districts = File::directories($cityPath);

        foreach ($districts as $districtPath) {
            $districtCode = basename($districtPath);

            $districtJsonPath = $districtPath . '/' . $districtCode . '.json';
            $districtData = json_decode(File::get($districtJsonPath), true)['features'][0];;
            $district = District::where('code', $districtCode)->first();
            $district->update([
                'borders' => $districtData['geometry']
            ]);
        }
    }

    public function run(): void
    {
        $this->readAndInsert();
    }
}
