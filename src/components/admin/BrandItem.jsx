import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '../..'
import { deleteBrand, fetchBrands } from '../../http/deviceAPI'

const BrandItem = ({ brand }) => {
    const { device } = useContext(Context)
    const del = () => {
        deleteBrand(brand.id).then((() => {
            fetchBrands().then(data => device.setBrands(data))
        }))
    }
    return (
        <div className='d-flex justify-content-between'>
            {brand.name}
            <Button onClick={del} variant='outline-warning'>X</Button>
        </div>
    )
}

export default BrandItem