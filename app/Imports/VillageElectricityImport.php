<?php

namespace App\Imports;

use App\Models\Territory\Village;
use App\Models\VillageElectricity;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class VillageElectricityImport implements ToCollection, WithHeadingRow
{

    public function mapping($row): array
    {
        return [
            'kk' => $row['jumlah_kk'],
            'households_with_electricity' => $row['jumlah_rumah_tinggal_berlistrik_pln'] ?? 0,
            'households_with_electricity_non_pln' => $row['jumlah_rumah_tinggal berlistrik non pln'] ?? 0,
            'households_without_electricity' => $row['jumlah_rumah_tinggal_tidak_berlistrik'] ?? 0,
            'network_length' => $row['panjang_jaringan'] ?? 0,
            'village_potential' => $row['potensi_desa'] ?? '-',
            'energy_potential' => $row['potensi_energi_desa'] ?? '-',
        ];
    }

    public function collection(Collection $rows): void
    {
        foreach ($rows as $row) {
            $village = Village::whereRelation('province', 'indonesia_provinces.code', 62)
                ->where('name', "{$row['nama_desa']}")
                // ->where('name', 'like', "%{$row['nama_desa']}%")
                ->first();

            if (is_null($village)) continue;

            $data = $this->mapping($row);

            $electricity = VillageElectricity::where('village_code', $village->code)->first();
            if (is_null($electricity)) {
                $insertData = [
                    ...$data,
                    'village_code' => $village->code
                ];
                error_log(json_encode($insertData));
                VillageElectricity::create($insertData);
            } else {
                $electricity->update($data);
            }
        }
    }

    public function headingRow(): int
    {
        return 3;
    }
}
