import { FC, useEffect } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { BootstrapInputGroup } from "@/common/components"
import { VillageType } from "@/features/Territory"
import Highcharts from 'highcharts';

export const VillageElectricInfoBox: FC<{
    isShow: boolean,
    village: VillageType | null
    onClose: () => void
}> = ({ village, isShow, onClose }) => {
    useEffect(() => {
        if (village?.electricity) {
            Highcharts.chart({
                chart: {
                    renderTo: 'pie-chart',
                    type: 'pie',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: ''
                },
                plotOptions: {
                    series: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: [{
                            enabled: true,
                        }, {
                            enabled: true,
                            style: {
                                fontSize: '1.2em',
                                textOutline: 'none',
                                opacity: 0.7
                            },
                            filter: {
                                operator: '>',
                                property: 'percentage',
                                value: 10
                            }
                        }]
                    }
                },
                series: [
                    // @ts-ignore
                    {
                        name: 'Percentage',
                        colorByPoint: true,
                        data: [
                            {
                                name: 'KK Berlistrik',
                                sliced: true,
                                selected: true,
                                y: village.electricity.households_with_electricity
                            },
                            {
                                name: 'KK Tidak Berlistrik',
                                y: village.electricity.households_without_electricity
                            },
                        ]
                    }
                ]
            });
        }
    }, [village])
    return (
        <>
            {isShow && (
                <Card className='graphics' >
                    <Card.Body className='content'>
                        <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ marginLeft: 'auto' }}>Desa</p>
                            <CloseButton onClick={onClose} style={{ marginLeft: 'auto' }} />
                        </Card.Title>
                        <BootstrapInputGroup
                            title="Nama Desa"
                            value={village?.name}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Nama Kecamatan"
                            value={village?.district.name}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Nama Kabupaten/Kota"
                            value={village?.city.name}
                            disabled={true}
                            className="mb-3"
                        />
                        {village?.electricity && (
                            <>
                                <hr />
                                <Card.Title>
                                    <p>Kelistrikan</p>
                                </Card.Title>
                                <BootstrapInputGroup
                                    title="Jumlah KK berlistrik"
                                    value={village.electricity.households_with_electricity.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah KK Tidak Berlistrik"
                                    value={village.electricity.households_without_electricity.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Panjang Jaringan"
                                    value={village.electricity.network_length.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Potensi Desa"
                                    value={village.electricity.village_potential}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <div id="pie-chart"></div>
                            </>
                        )}
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
