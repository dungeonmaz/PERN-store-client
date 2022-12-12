import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '../..'
import { deleteType, fetchTypes } from '../../http/deviceAPI'

const TypeItem = ({ type }) => {
    const { device } = useContext(Context)
    const del = () => {
        deleteType(type.id).then((() => {
            fetchTypes().then(data => device.setTypes(data))
        }))
    }
    return (
        <div className='d-flex justify-content-between'>
            {type.name}
            <Button onClick={del} variant='outline-warning'>X</Button>
        </div>
    )
}

export default TypeItem