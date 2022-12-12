import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const navigate= useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const click = async () => {
    try{
      let data;
      if (isLogin){
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE)
    } catch(e) {
      alert(e.response.data.message)
    }

  }

  return (
    <Container className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 60 }}>
      <Card style={{ width: 600 }} className="p-4">
        <h3 className='m-auto mb-4'>{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
        <Form className='d-flex flex-column gap-2'>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
          <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
          <div className='d-flex justify-content-between mt-2'>
            <Button style={{ width: 145 }} onClick={() => navigate(isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE)} variant='outline-info'>{isLogin ? 'Регистрация' : 'Авторизация'}</Button>
            <Button style={{ width: 145 }} onClick={click} variant='outline-success'>{isLogin ? 'Войти' : 'Регистрация'}</Button>
          </div>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth