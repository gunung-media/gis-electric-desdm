import { FC, useEffect } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { BootstrapInputGroup } from "@/common/components"
import { CityType, VillageType } from "@/features/Territory"
import Highcharts from 'highcharts';

export const CityInfoBox: FC<{
    isShow: boolean,
    city: CityType | null
    onClose: () => void
}> = ({ city, isShow, onClose }) => {
    useEffect(() => {
        if (city) {
        }
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
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
