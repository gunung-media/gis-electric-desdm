import { FC, useEffect } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { BootstrapInputGroup } from "@/common/components"
import { DistrictType } from "@/features/Territory"
import Highcharts from 'highcharts';

export const DistrictInfoBox: FC<{
    isShow: boolean,
    district: DistrictType | null
    onClose: () => void
}> = ({ district, isShow, onClose }) => {
    useEffect(() => {
        if (district) {
        }
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
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
