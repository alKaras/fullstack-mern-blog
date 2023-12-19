import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SignInStyles from './SignIn.module.scss'
import { useForm } from 'react-hook-form';
import { loginUser, selectIsLogged } from '../../redux/slices/authSlice';

export default function SignIn() {
    const isLogged = useSelector(selectIsLogged);
    const { error } = useSelector((state) => state.logreg);
    const [isShowed, setIsShowed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = (values) => {
        dispatch(loginUser(values));

    }

    console.log(error);
    useEffect(() => {
        if (isLogged) {
            navigate('/')
        }
    }, [isLogged, navigate])

    const [passType, setPassType] = useState("password");
    const togglePass = (e) => {
        e.preventDefault();
        if (passType === "password") {
            setPassType("text");
            setIsShowed(true);
        } else {
            setPassType("password");
            setIsShowed(false);
        }
    }

    return (
        <div className={`${SignInStyles.login}`}>
            <form className={`${SignInStyles['login-form']}`} onSubmit={handleSubmit(onSubmit)}>
                <div className={`${SignInStyles['auth-form-content']}`}>
                    <h3 className={`${SignInStyles['auth-form-title']}`}>Вхід у кабінет</h3>
                    <div className="d-flex flex-column">
                        <label>Пошта</label>
                        <input
                            type="text"
                            className={`${errors.email ? SignInStyles['error-input'] : ''}`}
                            placeholder='Введіть свою пошту'
                            {...register('email', { required: `Пошта є обов'язковим полем`, pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, message: "Некоректний формат пошти" } })}
                        />
                    </div>
                    {errors.email && <div className={`${SignInStyles['error-style']}`}>{errors.email.message}</div>}
                    <div className="d-flex flex-column">
                        <label>Пароль</label>
                        <input
                            type={passType}
                            className={`${errors.password ? SignInStyles['error-input'] : ''}`}
                            placeholder='Введіть свій пароль'
                            {...register('password', { required: `Пароль є обов'язковим полем`, pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, message: "Пароль повинен містити не менше 8 символів, 1 цифру, 1 велику літеру" } })}
                        />

                        {errors.password && <div className={`${SignInStyles['error-style']}`}>{errors.password.message}</div>}
                        <button onClick={togglePass} className={`${SignInStyles['btn-show']}`}>
                            Згадати пароль
                            {!isShowed ? <><i style={{marginLeft: '5px'}} className={`fa-regular fa-eye`}></i></>
                                : <><i style={{marginLeft: '3px'}} className="fa-regular fa-eye-slash"></i></>}
                        </button>

                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <button type="submit" className={`btn ${SignInStyles['btn']}`}>Увійти</button>
                        <Link className='ms-3' to={'/'}>На головну <i className="fa-solid fa-house"></i></Link>
                    </div>

                    {error && <div className={`${SignInStyles.error}`}>{error}</div>}
                </div>


            </form >
        </div >
    )
}