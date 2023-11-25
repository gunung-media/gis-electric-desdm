<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use KodePandai\Indonesia\Models\Village;

class IndonesianVillagesBorderSeeder extends Seeder
{
    public function run(): void
    {
        $content = file_get_contents(dirname(__DIR__) . '/raw/kalimantan_tengah_villages.geojson');
        $geojson = json_decode($content, true);

        foreach ($geojson['features'] as $feature) {
            $villageName = $feature['village'];

            $village = Village::where('name', $villageName)->first();
            if (is_null($village)) continue;

            $borders = $feature['border'];
            $village->borders = $borders;
            $village->save();
        }
    }
}
