<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvincesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        $csv = new CsvtoArray();
        $file = __DIR__ . '/../raw/csv/provinces.csv';
        $header = ['Code', 'Parent', 'Name', 'Latitude', 'Longitude', 'Postal'];
        $data = $csv->csv_to_array($file, $header);
        $data = array_map(function ($arr) use ($now) {
            return [
                'code' => $arr['Code'],
                'name' => $arr['Name'],
                'latitude' => $arr['Latitude'],
                'longitude' => $arr['Longitude'],
                'created_at' => $now,
                'updated_at' => $now
            ];
        }, $data);

        DB::table(config('indonesia.table_prefix') . 'provinces')->insertOrIgnore($data);
    }
}
