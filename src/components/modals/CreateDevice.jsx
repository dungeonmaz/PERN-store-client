import React, { useContext, useState } from 'react'
import { Button, Modal, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { Context } from '../..'
import { createDevice, fetchDevices } from '../../http/deviceAPI'

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [type, setType] = useState({name: ''})
  const [brand, setBrand] = useState({name: ''})
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, {title:'', description: '', number:Date.now()}])
  }


  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const removeInfo = (num) => {
    setInfo(info.filter(i => i.number !== num))
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', brand.id)
    formData.append('typeId', type.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(() => {
      fetchDevices().then(data => device.setDevices(data.rows))
      onHide()
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить Устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown>
          <Dropdown.Toggle variant='outline-success'>Тип  - {type.name}</Dropdown.Toggle>
          <Dropdown.Menu>
            {device.types.map(t => 
              <Dropdown.Item onClick={() => setType(t)} value={type} key = {t.id}>{t.name}</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className='mt-1'>
          <Dropdown.Toggle variant='outline-success'>Издатель - {brand.name}</Dropdown.Toggle>
          <Dropdown.Menu>
            {device.brands.map(b => 
              <Dropdown.Item onClick={() => setBrand(b)} value={brand} key = {b.id}>{b.name}</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control className='mt-1' placeholder='Название' value={name} onChange={e => setName(e.target.value)} />
        <Form.Control className='mt-1' placeholder='Цена' value={price} onChange={e => setPrice(e.target.value)} type='number' />
        <Form.Control className='mt-1' onChange={selectFile} type='file' />
        <Button onClick={addInfo} className='mt-2' variant='outline-info'>Новое свойство</Button>
        {info.map(i => 
          <Row className='mt-1' key={i.number}>
            <Col lg={4}><Form.Control value={i.title} onChange={e => changeInfo('title', e.target.value, i.number)} placeholder='Название'/></Col>
            <Col lg={6}><Form.Control value={i.description} onChange={e => changeInfo('description', e.target.value, i.number)} placeholder='Описание'/></Col>
            <Col lg={2}><Button onClick={() => removeInfo(i.number)} variant='outline-warning'>Удалить</Button></Col>
          </Row>)}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='outline-warning' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateDevice