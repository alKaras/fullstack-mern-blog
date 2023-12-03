import React from 'react'
import { Nav, Navbar, Button, Form, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap'
import headerStyles from '../Header/Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { infoAboutUser, logout, selectIsLogged } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const isLogged = useSelector(selectIsLogged);
    const user = useSelector(infoAboutUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem("token");
        navigate('/');
    }

    return (
        <Navbar expand="md" className={`${headerStyles.root} d-flex justify-content-between fixed-top`} >
            <LinkContainer to={'/'}>
                <Navbar.Brand className='d-flex align-items-center'>
                    <img
                        src="/logo.svg"
                        alt="logo"
                        width={50}
                        height={50}
                        className='align-middle' />
                    <p className={headerStyles['brand-text']}>Blog</p>
                </Navbar.Brand>
            </LinkContainer>
            {!isLogged ? (
                <>
                    <Nav>
                        <LinkContainer to={'/sign-in'}>
                            <Button className={headerStyles['btn-join']}>Увійти</Button>
                        </LinkContainer>
                        <LinkContainer to={'/sign-up'}>
                            <Button className={headerStyles['btn-join']}>Створити акаунт</Button>
                        </LinkContainer>
                    </Nav>
                </>
            ) :
                <>
                    <Form inline className={headerStyles['search']}>
                        <Form.Control
                            type="text"
                            placeholder="Пошук"
                            className="mr-sm-2"
                        />
                    </Form>
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle className={` ${headerStyles['profile']} shadow-sm rounded d-flex align-items-center justify-content-center`}>
                                <h1 className='mb-0 me-1'>{user.nickname}</h1>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='mt-3 p-3'>
                                <LinkContainer to='/profile'>
                                    <Dropdown.Item className={`${headerStyles['drop-link']}`}>Профіль</Dropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/create-post'>
                                    <Dropdown.Item className={`${headerStyles['drop-link']}`}>Створити пост</Dropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/post-manager'>
                                    <Dropdown.Item className={`${headerStyles['drop-link']}`}>Керувати постами</Dropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/comments'>
                                    <Dropdown.Item className={`${headerStyles['drop-link']}`}>Мої коментарі</Dropdown.Item>
                                </LinkContainer>
                                <Dropdown.Item onClick={logOutHandler} className={`${headerStyles['drop-link']}`}>Вийти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </>
            }
        </Navbar >
    )
}