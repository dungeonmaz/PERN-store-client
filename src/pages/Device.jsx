import React, { useEffect } from 'react'
import { Col, Container, Image, Row, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOneBrand, fetchOneDevice, fetchOneType } from '../http/deviceAPI'
import { addDeviceToBasket } from '../http/basketAPI'
import { useContext } from 'react'
import { Context } from '..'


const Device = () => {
  const [device, setDevice] = useState({ info: [] })
  const { id } = useParams()
  const [type, setType] = useState()
  const [brand, setBrand] = useState()
  const [loading, setLoading] = useState(true)

  const {user} = useContext(Context)

  useEffect(() => {
    fetchOneDevice(id).then(data => {
      setDevice(data)
      fetchOneType(data.typeId).then(d => setType(d.name))
      fetchOneBrand(data.brandId).then(d => setBrand(d.name))
      setLoading(false)
    })
  }, [])

  const addToBasket = () => {
    addDeviceToBasket(user.user.id, device.id)
  }


  return (
    <Container className='mt-3'>
      <Row>
        <Col md={12} lg={4}>
          {!loading && <Image src={process.env.REACT_APP_API_URL + device.img} style={{ objectFit: 'cover', width: '100%', height: '600px', borderRadius: '1rem' }} />}
        </Col>
        <Col md={12} lg={8} className='d-flex flex-column'>
          <div className='d-flex align-items-center gap-2'>
            <h5>{device.name}</h5>
            <h5>{device.price}₽</h5>
          </div>
          <div>Категория: {type}</div>
          <div>Издатель: {brand}</div>

          {device.info.map(desc =>
            <div key={desc.id}>{desc.title}: {desc.description}</div>
          )}
          <Button onClick={addToBasket} className='mt-auto' variant='outline-success'>В корзину</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Device