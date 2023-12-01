import { HorizontalLayout } from '@/layouts/HorizontalLayout'
import './styles.scss'
import { Head } from '@inertiajs/react'

export default function Index() {
    return (
        <HorizontalLayout>
            <Head title="Statistik Kelistrikan Daearah" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Statistik Kelistrikan Daerah</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-responsive table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>No</th>
                                        <th rowSpan={2}>Kabupaten/Kecamatan/Desa</th>
                                        <th colSpan={2}>Jumlah</th>
                                        <th colSpan={2}>Desa Berlistrik</th>
                                        <th rowSpan={2}>Desa Belum Berlistrik</th>
                                        <th colSpan={2}>Rumah Tinggal Berlistrik</th>
                                        <th colSpan={2} rowSpan={2}>Rumah Tinggal Belum Berlistrik</th>
                                    </tr>
                                    <tr>
                                        <th>Rumah Tinggal</th>
                                        <th>KK</th>
                                        <th>PLN</th>
                                        <th>Non PLN</th>
                                        <th>PLN</th>
                                        <th>Non PLN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="city">
                                        <td>A</td>
                                        <td>GUNUNG MAS</td>
                                        <td>34,323</td>
                                        <td></td>
                                        <td>73</td>
                                        <td>25</td>
                                        <td>29</td>
                                        <td>21,908</td>
                                        <td>2,065</td>
                                        <td colSpan={2}>10,350</td>
                                    </tr>
                                    <tr className="district">
                                        <td>I</td>
                                        <td>Damang Batu</td>
                                        <td>1,039</td>
                                        <td></td>
                                        <td>-</td>
                                        <td>8</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>986</td>
                                        <td colSpan={2}>53</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Karetau Rambangun</td>
                                        <td>61</td>
                                        <td></td>
                                        <td>-</td>
                                        <td>1</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>61</td>
                                        <td colSpan={2}>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </HorizontalLayout>
    )
}
