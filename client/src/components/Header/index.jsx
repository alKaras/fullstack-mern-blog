import React from 'react'
import { Nav, Navbar, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap'
import headerStyles from '../Header/Header.module.scss';

export default function Header() {
    return (
        <Navbar expand="md" className={`${headerStyles.root} d-flex justify-content-between fixed-top`} >
            <Navbar.Brand className='d-flex align-items-center'>
                <img
                    src="/logo.svg"
                    alt="logo"
                    width={50}
                    height={50}
                    className='align-middle' />
                <p className={headerStyles['brand-text']}>Blog</p>
            </Navbar.Brand>
            <Form inline className={headerStyles['search']}>
                <Form.Control
                    type="text"
                    placeholder="Пошук"
                    className="mr-sm-2"
                />
            </Form>
            <Nav>
                <LinkContainer to={'/sign-in'}>
                    <Button className={headerStyles['btn-join']}>Приєднатись</Button>
                </LinkContainer>

            </Nav>
        </Navbar >
    )
}