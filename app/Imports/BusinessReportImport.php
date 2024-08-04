<?php

namespace App\Imports;

use App\Models\BusinessReport\BusinessReport;
use App\Models\Territory\Village;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BusinessReportImport implements ToCollection, WithHeadingRow
{

    public function mapping($row): array
    {
        return [
            'name' => $row['nama'] ?? 'notfound',
            'nib' => $row['nib'] ?? 'notfound',
            'npwp' => $row['npwp'] ?? 'notfound',
            'email' => $row['email'] ?? 'notfound@gmail.com',
            'identity_number' => $row['nik'] ?? 0,
            'phone_number' => $row['nomor_handphone'] ?? 0,
            'address' => $row['alamat'] ?? '',
            'latitude' => $row['latitude'] ?? '0',
            'longitude' => $row['longitude'] ?? '0',
            'description' => $row['deskripsi'] ?? '0',
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

            $insertData = [
                ...$data,
                'village_code' => $village->code
            ];
            error_log(json_encode($insertData));
            BusinessReport::create($insertData);
        }
    }

    public function headingRow(): int
    {
        return 3;
    }
}
