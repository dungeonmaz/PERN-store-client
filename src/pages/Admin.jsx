import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateType from '../components/modals/CreateType'
import CreateDevice from '../components/modals/CreateDevice'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '..'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import TypeItem from '../components/admin/TypeItem'
import { observer } from 'mobx-react-lite'
import BrandItem from '../components/admin/BrandItem'
import DeviceItem from '../components/admin/DeviceItem'

const Admin = observer(() => {
  const {device} = useContext(Context)
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices().then(data => device.setDevices(data.rows))
  }, [])

  return (
    <Container className='d-flex flex-column gap-2 mt-3'>
      <Button onClick={() => setTypeVisible(true)} variant='outline-dark'>+ Тип</Button>
      {device.types.map(type =>
               <TypeItem key={type.id} type={type}/>
            )}
      <Button onClick={() => setBrandVisible(true)} variant='outline-dark'>+ Издатель</Button>
      {device.brands.map(brand =>
               <BrandItem key={brand.id} brand={brand}/>
            )}
      <Button onClick={() => setDeviceVisible(true)} variant='outline-dark'>+ Товар</Button>
      {device.devices.map(dev =>
               <DeviceItem key={dev.id} dev={dev}/>
            )}
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
    </Container>
  )
})

export default Admin