<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class VillagesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        $csv = new CsvtoArray();
        $resourceFiles = File::allFiles(__DIR__ . '/../raw/csv/villages');
        foreach ($resourceFiles as $file) {
            $header = ['code', 'district_code', 'name', 'lat', 'long', 'pos'];
            $data = $csv->csv_to_array($file->getRealPath(), $header);

            $data = array_map(function ($arr) use ($now) {
                $additional = ['created_at' => $now, 'updated_at' => $now, 'postal_code' => $arr['pos'], 'latitude' => $arr['lat'], 'longitude' => $arr['long']];
                unset($arr['pos'], $arr['lat'], $arr['long']);
                return $arr + $additional;
            }, $data);

            $collection = collect($data);
            foreach ($collection->chunk(50) as $chunk) {
                DB::table(config('indonesia.table_prefix') . 'villages')->insertOrIgnore($chunk->toArray());
            }
        }
    }
}
