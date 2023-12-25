import React from 'react'
import { Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import headerStyles from '../Header/Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { infoAboutUser, logout, selectIsLogged } from '../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

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
                    <p className={headerStyles['brand-text']}>Лапи та вуса</p>
                </Navbar.Brand>
            </LinkContainer>
            <Nav>
                <div className={headerStyles['menu-header']}>
                    <LinkContainer to={'/news'}>
                        <Button className={headerStyles['btn-header']}>Новини</Button>
                    </LinkContainer>
                    <LinkContainer to={'/goods'}>
                        <Button className={headerStyles['btn-header']}>Товари</Button>
                    </LinkContainer>
                    <LinkContainer to={'/care-tips'}>
                        <Button className={headerStyles['btn-header']}>Догляд</Button>
                    </LinkContainer>
                    <LinkContainer to={'/funny-stories'}>
                        <Button className={headerStyles['btn-header']}>Цікаві історії</Button>
                    </LinkContainer>
                </div>
                {!isLogged ? (
                    <>
                        <LinkContainer to={'/sign-in'}>
                            <Button className={headerStyles['btn-join']}>Увійти</Button>
                        </LinkContainer>
                        <LinkContainer to={'/sign-up'}>
                            <Button className={headerStyles['btn-join']}>Створити акаунт</Button>
                        </LinkContainer>
                    </>
                ) :
                    <>

                        <Dropdown align="end">
                            <Dropdown.Toggle className={` ${headerStyles['profile']} shadow-sm rounded d-flex align-items-center justify-content-center`}>
                                <h1 className='mb-0 me-1'>{user.nickname}</h1>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='mt-3 p-3'>
                                <LinkContainer to='/create-post'>
                                    <Dropdown.Item className={`${headerStyles['drop-link']}`}>Створити пост</Dropdown.Item>
                                </LinkContainer>
                                <Dropdown.Item onClick={logOutHandler} className={`${headerStyles['drop-link']}`}>Вийти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </>
                }
            </Nav>
        </Navbar >
    )
}