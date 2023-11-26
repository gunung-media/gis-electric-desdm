import { useMap } from '@/common/hooks'
import './styles.scss'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { router } from '@inertiajs/react'
import { CloseBtn, Input, Loader } from '@/common/components';

export default function Proposal() {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowTracking, setIsShowTracking] = useState<boolean>(false)
    const [isShowAdd, setIsShowAdd] = useState<boolean>(false)

    useEffect(() => {
        if (map) {
            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)
        }
    }, [map])
    return (
        <>
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}>Silisda <span>usulan</span></div>
                <div className="header-actions">
                    <button onClick={() => setIsShowAdd(true)}>
                    </button>
                    <button>
                    </button>
                </div>
            </div>

            {
                isShowAdd && (
                    <div className="add">
                        <div className="header">
                            <svg width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ 'display': '' }}>
                            </svg>
                            <p>Tambah Usulan</p>
                            <CloseBtn onClick={() => setIsShowAdd(false)} />
                        </div>
                        <div className="content">
                            <form action="">
                                <Input title="Nama Lengkap" />
                                <Input title="Nomor Identitas" />
                                <Input title="Alamat Email" />
                                <Input title="Nomor Telepon" />

                                <div className="my-3">
                                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                isShowTracking && (
                    <div className="tracking">
                        <div className="header">
                            <svg width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ 'display': '' }}>
                            </svg>
                            <p>Tracking</p>
                            <CloseBtn onClick={() => setIsShowTracking(false)} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
