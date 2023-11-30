import { FC, useEffect, useState } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { BootstrapInputGroup } from "@/common/components"
import { DistrictType, getDistrict } from "@/features/Territory"

export const DistrictInfoBox: FC<{
    isShow: boolean,
    district: DistrictType | null
    onClose: () => void
}> = ({ district, isShow, onClose }) => {
    const [districtData, setDistrictData] = useState<DistrictType | null>(null)
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
        if (district) {
            (async () => {
                const { data: { data: dData } } = await getDistrict(district.code)
                setDistrictData(dData)
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
    }, [district])
    return (
        <>
            {isShow && (
                <Card className='graphics' >
                    <Card.Body className='content'>
                        <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ marginLeft: 'auto' }}>Info Kecamatan</p>
                            <CloseButton onClick={onClose} style={{ marginLeft: 'auto' }} />
                        </Card.Title>
                        <BootstrapInputGroup
                            title="Nama Kecamatan"
                            value={district?.name}
                            disabled={true}
                            className="mb-3"
                        />
                        {districtData && (
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
