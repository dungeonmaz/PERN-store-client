import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { Context } from '../index'

const SideBar = observer(() => {
    const { device } = useContext(Context)

    return (
        <Row >
            <Col md={12}  xs={6} className="mb-2">
                <Dropdown style={{width:'100%'}}>
                    <Dropdown.Toggle style={{width:'100%'}}  variant="outline-success" id="dropdown-basic">
                        Категория
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{width:'100%'}} >
                        <Dropdown.Item onClick={() => {device.setPage(1);device.setSelectedType({})}} >Все</Dropdown.Item>
                        <Dropdown.Divider />
                        {device.types.map(type => (
                            <Dropdown.Item active={type.id === device.selectedType.id} onClick={() => {device.setPage(1);device.setSelectedType(type)}} key={type.id}>{type.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col md={12}  xs={6} className="mb-2">
                <Dropdown style={{width:'100%'}}>
                    <Dropdown.Toggle style={{width:'100%'}}  variant="outline-success" id="dropdown-basic">
                        Издательство
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{width:'100%'}} >
                        <Dropdown.Item onClick={() => {device.setPage(1);device.setSelectedBrand({})}}>Все</Dropdown.Item>
                        <Dropdown.Divider />
                        {device.brands.map(brand => (
                            <Dropdown.Item active={brand.id === device.selectedBrand.id} onClick={() => {device.setPage(1);device.setSelectedBrand(brand)}} key={brand.id}>{brand.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    )
})

export default SideBar