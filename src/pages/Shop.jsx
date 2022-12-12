import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import DeviceList from '../components/DeviceList'
import Paginate from '../components/Paginate'
import SideBar from '../components/SideBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'

const Shop = observer(() => {
  const {device} = useContext(Context)


  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, device.limit).then(data => {
      device.setTotalCount(data.count)
      device.setDevices(data.rows)
    })
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
      device.setTotalCount(data.count)
      device.setDevices(data.rows)
    })
  }, [device.page, device.selectedType, device.selectedBrand])
  

  return (
    <Container>
      <Row className='mt-3'>
        <Col md={3} lg={2} xs={12}>
          <SideBar/>
        </Col>
        <Col md={9} lg={10} xs={12}>
          <DeviceList />
          <Paginate />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop