import React from 'react'
import { useContext } from 'react'
import { Context } from '../index'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

const divStyle = {display:'flex', gap:"0.5rem", marginLeft:'auto'}

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white', textDecoration:'none'}} to={SHOP_ROUTE}>Магазин</NavLink>
                {user.isAuth ? <div style={divStyle}>
                        {user.user.role === 'ADMIN' &&<Button onClick={() => navigate(ADMIN_ROUTE)} variant='outline-info'>Админ</Button>}
                        <Button onClick={() => navigate(BASKET_ROUTE)} variant='outline-success'>Корзина</Button>
                        <Button onClick={logOut} variant='outline-warning'>Выйти</Button>
                    </div> : <div style={divStyle}>
                        <Button onClick={() => navigate(LOGIN_ROUTE)} variant='outline-success'>Авторизация</Button>
                    </div>}
            </Container>
        </Navbar>
    )
})

export default NavBar