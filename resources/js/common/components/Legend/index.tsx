import { Card } from 'react-bootstrap'
import './style.scss'

export const Legend = () => {
    return (
        <Card className="legend">
            <Card.Body>
                <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                    <p style={{ marginTop: '-5px' }}>Legend</p>
                </Card.Title>
                <div className="content-legend">
                    <div className="legend-item">
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13.5" cy="13.5" r="13.5" fill="green" />
                        </svg>
                        <p className='text'>Desa Berlistrik</p>
                    </div>
                    <div className="legend-item">
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13.5" cy="13.5" r="13.5" fill="#111" />
                        </svg>
                        <p className='text'>Desa Tidak Berlistrik</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
