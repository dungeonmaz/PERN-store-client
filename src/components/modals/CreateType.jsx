import React, { useContext } from 'react'
import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Context } from '../..'
import { createType, fetchTypes } from '../../http/deviceAPI'

const CreateType = ({ show, onHide }) => {
  const { device } = useContext(Context)
  const [value, setValue] = useState('')
  const addType = () => {
    createType({name: value}).then(() => {
      setValue('')
      fetchTypes().then(data => device.setTypes(data))
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
          Добавить Тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} onChange={e => setValue(e.target.value)} placeholder="Название"/>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='outline-warning' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addType}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType