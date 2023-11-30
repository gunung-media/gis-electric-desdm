<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictsSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        $csv = new CsvtoArray();
        $file = __DIR__ . '/../raw/csv/districts.csv';
        $header = ['Code', 'Parent', 'Name', 'Latitude', 'Longitude', 'Postal'];
        $data = $csv->csv_to_array($file, $header);
        $data = array_map(function ($arr) use ($now) {
            return [
                'code' => $arr['Code'],
                'name' => $arr['Name'],
                'city_code' => $arr['Parent'],
                'latitude' => $arr['Latitude'],
                'longitude' => $arr['Longitude'],
                'created_at' => $now,
                'updated_at' => $now
            ];
        }, $data);
        $collection = collect($data);
        foreach ($collection->chunk(50) as $chunk) {
            DB::table(config('indonesia.table_prefix') . 'districts')->insertOrIgnore($chunk->toArray());
        }
    }
}
