import React, { useState } from 'react'
import { useContext } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Context } from '../..'
import { createBrand, fetchBrands } from '../../http/deviceAPI'

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('')
  const {device} = useContext(Context)
  const addBrand = () => {
    createBrand({ name: value }).then(() => {
      setValue('')
      fetchBrands().then(data => device.setBrands(data))
    })
    onHide()
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
          Добавить Брэнд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder="Название" />
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='outline-warning' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addBrand}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand