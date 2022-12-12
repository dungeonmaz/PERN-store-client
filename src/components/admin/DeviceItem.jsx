import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '../..'
import { deleteDevice, fetchDevices, fetchOneBrand, fetchOneType } from '../../http/deviceAPI'

const DeviceItem = ({ dev }) => {
    const { device } = useContext(Context)
    const [type, setType] = useState()
    const [brand, setBrand] = useState()
    
    useEffect(() => {
        fetchOneType(dev.typeId).then(d => setType(d.name))
        fetchOneBrand(dev.brandId).then(d => setBrand(d.name))
    }, [])
    
    const del = () => {
        deleteDevice(dev.id).then((() => {
            fetchDevices().then(data => device.setDevices(data.rows))
        }))
    }

    return (
        <div className='d-flex justify-content-between'>
            {dev.name} {type} {brand} {dev.price}₽
            <Button onClick={del} variant='outline-warning'>X</Button>
        </div>
    )
}

export default DeviceItem