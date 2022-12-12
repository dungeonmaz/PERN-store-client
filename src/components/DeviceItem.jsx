import React from 'react'
import { Button, Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({ device }) => {
    const navigate = useNavigate()

    return (
        <Col xl={4} lg={6} md={6} sm={6} xs={12} className="mb-4">
            <Card style={{ width: '100%', borderRadius: '1rem', overflow: 'auto' }} border="light">
                <div style={{position:'relative'}}>
                    <Image src={process.env.REACT_APP_API_URL + device.img} style={{ objectFit: 'cover', width: '100%',height:'450px'}} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #198754 60%, #198754 100%)'}} className="d-flex justify-content-between px-4 text-white">
                        <div>
                            {device.name}
                        </div>
                    </div>
                </div>
                <Button onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} style={{ borderRadius: '0', height:'40px' }} className="btn-success text-light">Информация</Button>
            </Card>
        </Col>
    )
}

export default DeviceItem