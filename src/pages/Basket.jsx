import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Context } from '..'
import { fetchBasket, removeDeviceFromBasket } from '../http/basketAPI'
import { fetchOneDevice } from '../http/deviceAPI'

const Basket = observer(() => {
  const {user} = useContext(Context)

  useEffect(() => {
    user.setBasket([])
    basketUpdate()
  }, [])

  const countPrice = () => {
    let price = 0
    user.basket.forEach(k => {
      price += k.price
    })
    return price
  }

  const deleteDevice = (id) => {
    const idD = id + "_" + user.user.id
    removeDeviceFromBasket(idD).then(() => {
      user.setBasket([])
      basketUpdate()
    })
  }

  const basketUpdate = () => {
    fetchBasket(user.user.id).then(data => {
      data.info.forEach(k => {
        fetchOneDevice(k.deviceId).then(d => {
          user.setBasket([...user.basket, d])
        })
      })
    })
  }

  return (
    <Container>
      {user.basket.map((device, i) => (
        <div key={device.id + i} className='d-flex justify-content-between'>
          {device.name} | {device.price}₽
          <Button onClick={() => deleteDevice(device.id)} variant='outline-warning'>X</Button>
        </div>
      ))}
      Общая Цена : {countPrice()}
    </Container>
  )
})

export default Basket