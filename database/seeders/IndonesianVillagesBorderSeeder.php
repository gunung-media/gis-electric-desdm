<?php

namespace Database\Seeders;

use App\Models\Territory\Village;
use Illuminate\Database\Seeder;

class IndonesianVillagesBorderSeeder extends Seeder
{
    public function run(): void
    {
        $content = file_get_contents(dirname(__DIR__) . '/raw/kalimantan_tengah_villages.geojson');
        $geojson = json_decode($content, true);

        $effectedVillage = 0;
        $villageNotFound = 0;

        foreach ($geojson['features'] as $feature) {
            $villageName = $feature['village'];

            $village = Village::where('name', $villageName)->first();
            if (is_null($village)) {
                error_log("village not found: {$villageName}");
                $villageNotFound++;
                continue;
            }

            $border = $feature['border'];

            $borders = ['coordinates' => $border, 'type' => count($border) > 1 ? "MultiPolygon" : "Polygon"];
            $village->borders = $borders;
            $village->save();

            $effectedVillage++;
        }

        error_log("Effected Village: $effectedVillage");
        error_log("Village Not Found: $villageNotFound");
    }
}
