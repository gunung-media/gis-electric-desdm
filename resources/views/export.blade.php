<table border="1">
    <thead>
        <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Kode Desa</th>
            <th rowspan="2">Provinsi</th>
            <th rowspan="2">Kabupaten</th>
            <th rowspan="2">Kecamatan</th>
            <th rowspan="2">Desa / Kelurahan</th>
            <th colspan="2">Jumlah</th>
            <th colspan="2">Berlistrik</th>
            <th rowspan="2">Total Berlistrik</th>
            <th rowspan="2">Belum Berlistrik</th>
            <th rowspan="2">Total</th>
            <th colspan="2">Rasio Elektrifikasi</th>
            <th rowspan="2">Keterangan</th>
        </tr>
        <tr>
            <th>Rumah Tinggal</th>
            <th>KK</th>
            <th>PLN</th>
            <th>NON PLN</th>
            <th>RE PLN</th>
            <th>RE TOTAL</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($datas as $key => $data)
            @php
                $pln = $data->electricity?->households_with_electricity ?? 0;
                $nonPln = $data->electricity?->households_with_electricity_non_pln ?? 0;
                $nonListrik = $data->electricity?->households_without_electricity ?? 0;
                $total = $data->electricity?->households_count ?? 0;
                $rePln = 0;

                try {
                    $rePln = ($pln / $total) * 100;
                } catch (\Throwable $th) {
                    $rePln = 0;
                }

                $reTot = 0;
                try {
                    $reTot = (($pln + $nonPln) / $total) * 100;
                } catch (\Throwable $th) {
                    $reTot = 0;
                }
            @endphp
            <tr>
                <td>{{ $key + 1 }}</td>
                <td>{{ $data->code }}</td>
                <td>{{ $data->province->name }}</td>
                <td>{{ $data->city->name }}</td>
                <td>{{ $data->district->name }}</td>
                <td>{{ $data->name }}</td>
                <td>{{ $total }}</td>
                <td>{{ $data->electricity?->kk ?? 0 }}</td>
                <td>{{ $pln }}</td>
                <td>{{ $nonPln }}</td>
                <td>{{ $pln + $nonPln }}</td>
                <td>{{ $nonListrik }}</td>
                <td>{{ $total }}</td>
                <td>{{ $rePln }}</td>
                <td>{{ $reTot }}</td>
                <td></td>
            </tr>
        @endforeach
    </tbody>
</table>
