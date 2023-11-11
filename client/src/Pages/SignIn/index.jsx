import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SignInStyles from './SignIn.module.scss'
import { useForm } from 'react-hook-form';
// import { loginUser, selectIsAdmin, selectIsLogged } from '../../redux/slices/loginSlice';

export default function SignIn() {
    // const isLogged = useSelector(selectIsLogged);
    // const isAdmin = useSelector(selectIsAdmin);
    const { error } = useSelector((state) => state.logreg);
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
        // dispatch(loginUser(values));

    }

    console.log(error);
    // useEffect(() => {
    //     if (isLogged && isAdmin) {
    //         navigate('/adminCabinet')
    //     } else if (isLogged && !isAdmin) {
    //         navigate('/userCabinet')
    //     }
    // }, [isLogged, isAdmin, navigate])





    const [passType, setPassType] = useState("password");
    const togglePass = (e) => {
        e.preventDefault();
        if (passType === "password") {
            setPassType("text");
        } else {
            setPassType("password");
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
                        <button onClick={togglePass} className={`${SignInStyles['btn-show']}`}>Показати пароль</button>

                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <button type="submit" className='btn btn-primary'>Увійти</button>
                        <Link className='ms-3' to={'/sign-up'}>Зареєструватися</Link>
                        <Link className='ms-3'  to={'/'}>Повернутись на головну</Link>
                    </div>

                    {error && <div className={`${SignInStyles.error}`}>{error}</div>}
                </div>


            </form >
        </div >
    )
}