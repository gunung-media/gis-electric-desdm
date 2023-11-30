<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitiesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        $Csv = new CsvtoArray();
        $file = __DIR__ . '/../raw/csv/cities.csv';
        $header = ['code', 'province_code', 'name', 'lat', 'long'];
        $data = $Csv->csv_to_array($file, $header);
        $data = array_map(function ($arr) use ($now) {
            $additional = ['created_at' => $now, 'updated_at' => $now, 'latitude' => $arr['lat'], 'longitude' => $arr['long']];
            unset($arr['lat'], $arr['long']);
            return $arr + $additional;
        }, $data);

        $collection = collect($data);
        foreach ($collection->chunk(50) as $chunk) {
            DB::table(config('indonesia.table_prefix') . 'cities')->insertOrIgnore($chunk->toArray());
        }
    }
}
