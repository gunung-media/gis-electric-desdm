import { FC, useEffect, useState } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { BootstrapInputGroup } from "@/common/components"
import { CityType, VillageType, getCity } from "@/features/Territory"

export const CityInfoBox: FC<{
    isShow: boolean,
    city: CityType | null
    onClose: () => void
}> = ({ city, isShow, onClose }) => {
    const [cityData, setCityData] = useState<CityType | null>(null)
    const [additionalData, setAdditionalData] = useState({
        jumlahRumahTinggal: 0,
        jumlahKK: 0,
        desaBerlistrikPLN: 0,
        desaBerlistrikNonPLN: 0,
        desaTidaklistrik: 0,
        rumahTinggalListrikPLN: 0,
        rumahTinggalListrikNonPLN: 0,
        rumahTanggaNonListrik: 0,
    })
    useEffect(() => {
        if (city) {
            (async () => {
                const { data: { data: dData } } = await getCity(city.code)
                setCityData(dData)
                console.log(dData)
                for (const village of dData.villages!) {
                    setAdditionalData(prevData => ({
                        jumlahRumahTinggal: prevData.jumlahRumahTinggal + (village.electricity?.households_count ?? 0),
                        jumlahKK: prevData.jumlahKK + (village.electricity?.kk ?? 0),
                        desaBerlistrikPLN: prevData.desaBerlistrikPLN + (village.electricity?.is_village_electric_pln ? 1 : 0),
                        desaBerlistrikNonPLN: prevData.desaBerlistrikNonPLN + (village.electricity?.is_village_electric_non_pln ? 1 : 0),
                        desaTidaklistrik: prevData.desaTidaklistrik + (village.electricity?.is_village_no_electric ? 1 : 0),
                        rumahTinggalListrikPLN: prevData.rumahTinggalListrikPLN + (village.electricity?.households_with_electricity ?? 0),
                        rumahTinggalListrikNonPLN: prevData.rumahTinggalListrikNonPLN + (village.electricity?.households_with_electricity_non_pln ?? 0),
                        rumahTanggaNonListrik: prevData.rumahTanggaNonListrik + (village.electricity?.households_without_electricity ?? 0),
                    }));

                }
            })();
        }
        return (() => {
            setAdditionalData({
                jumlahRumahTinggal: 0,
                jumlahKK: 0,
                desaBerlistrikPLN: 0,
                desaBerlistrikNonPLN: 0,
                desaTidaklistrik: 0,
                rumahTinggalListrikPLN: 0,
                rumahTinggalListrikNonPLN: 0,
                rumahTanggaNonListrik: 0,
            })
        })
    }, [city])

    return (
        <>
            {isShow && (
                <Card className='graphics' >
                    <Card.Body className='content'>
                        <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ marginLeft: 'auto' }}>Info Kabupaten/Kota</p>
                            <CloseButton onClick={onClose} style={{ marginLeft: 'auto' }} />
                        </Card.Title>
                        <BootstrapInputGroup
                            title="Nama Kabupaten/Kota"
                            value={city?.name}
                            disabled={true}
                            className="mb-3"
                        />

                        {cityData && (
                            <>
                                <hr />
                                <Card.Title>
                                    <p>Kelistrikan</p>
                                </Card.Title>
                                <BootstrapInputGroup
                                    title="Jumlah Rumah Tinggal"
                                    value={additionalData.jumlahRumahTinggal.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah KK"
                                    value={additionalData.jumlahKK.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah Desa Berlistrik PLN"
                                    value={additionalData.desaBerlistrikPLN.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah Desa Berlistrik NON PLN"
                                    value={additionalData.desaBerlistrikNonPLN.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah Desa Tidak Berlistrik"
                                    value={additionalData.desaTidaklistrik.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah Rumah Tinggal PLN"
                                    value={additionalData.rumahTinggalListrikPLN.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah Rumah Tinggal NON PLN"
                                    value={additionalData.rumahTinggalListrikNonPLN.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Jumlah Rumah Tinggal Tidak berlistrik"
                                    value={additionalData.rumahTanggaNonListrik.toString()}
                                    disabled={true}
                                    className="mb-3"
                                />
                            </>
                        )}
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
