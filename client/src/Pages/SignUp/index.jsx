import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SignUpStyles from './SignUp.module.scss'
import { useForm } from 'react-hook-form';
import { registerUser, selectIsRegged } from '../../redux/slices/authSlice';
export default function SignUp() {
    const navigate = useNavigate();
    const isRegged = useSelector(selectIsRegged);
    const { error } = useSelector((state) => state.logreg);
    const dispatch = useDispatch();
    console.log(error);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            nickname: "",
            email: "",
            password: ""
        },
        mode: "onChange",
    });

    const onSubmit = (values) => {
        dispatch(registerUser(values));
    }
    useEffect(() => {
        if (isRegged) {
            navigate('/sign-in')
        }
    }, [isRegged, navigate])
    return (
        <div className={`${SignUpStyles.login}`}>
            <form className={`${SignUpStyles['login-form']}`} onSubmit={handleSubmit(onSubmit)}>
                <div className={`${SignUpStyles['auth-form-content']}`}>
                    <h3 className={`${SignUpStyles['auth-form-title']}`}>Реєстрація</h3>
                    <div className="d-flex flex-column">
                        <label>Нікнейм</label>
                        <input
                            type="text"
                            className={`${errors.fname ? SignUpStyles['error-input'] : ''}`}
                            placeholder={`Введіть нікнейм`}
                            {...register('nickname', { required: `Нікнейм є обов'язковим полем` })}
                        />
                    </div>
                    {errors.nickname && <div className={`${SignUpStyles['error-style']}`}>{errors.nickname.message}</div>}
                    
                    <div className="d-flex flex-column">
                        <label>Пошта</label>
                        <input
                            type="text"
                            className={`${errors.email ? SignUpStyles['error-input'] : ''}`}
                            placeholder='Введіть свою пошту'
                            {...register('email', { required: `Пошта є обов'язковим полем`, pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, message: "Некоректний формат пошти" } })}
                        />
                    </div>
                    {errors.email && <div className={`${SignUpStyles['error-style']}`}>{errors.email.message}</div>}
                    <div className="d-flex flex-column">
                        <label>Пароль</label>
                        <input
                            type="password"
                            className={`${errors.password ? SignUpStyles['error-input'] : ''}`}
                            placeholder='Введіть свій пароль'
                            {...register('password', { required: `Пароль є обов'язковим полем`, pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, message: "Пароль повинен містити не менше 8 символів, 1 цифру, 1 велику літеру" } })}
                        />
                        {errors.password && <div className={`${SignUpStyles['error-style']}`}>{errors.password.message}</div>}

                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <button type="submit" style={{fontWeight: 'bold'}} className='btn btn-warning'>Зареєструватись</button>
                        <Link to={'/'}>На головну <i className="fa-solid fa-house"></i></Link>
                    </div>

                    {error && <div className={`${SignUpStyles.error}`}>{error}</div>}
                </div>
            </form >
        </div >
    )
}