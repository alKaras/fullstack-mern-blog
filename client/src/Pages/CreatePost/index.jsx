import React, { useCallback, useMemo, useState } from 'react'
import Header from '../../components/Header'
import CreatePStyles from '../CreatePost/CreatePost.module.scss';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
export default function CreatePost() {
    const imageUrl = '';
    const [value, setValue] = useState('');
    const handleChangeFile = () => { };

    const onClickRemoveImage = () => { };

    const onChange = useCallback((value) => {
        setValue(value);
    }, []);

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введіть текст...',
            status: false,
            autosave: {
                enable: true,
                delay: 1000,
            },
        }),
        [],
    );
    return (
        <>
            <Header />
            <div className={`${CreatePStyles.root} shadow-lg bg-white`}>
                <Button>Завантажити картинку</Button>
                <input type="file" hidden />
                <br />
                <br />
                <Form.Control
                    type="text"
                    placeholder='Заголовок статті...'
                    className={`${CreatePStyles['title']}`}
                />
                <Form.Control
                    type="text"
                    placeholder='Теги'
                    className={`${CreatePStyles['tags']}`}
                />
                <SimpleMDE className={`${CreatePStyles['editor']}`} value={value} onChange={onChange} options={options} />
                <div className={`${CreatePStyles['buttons']}`}>
                    <Button variant='success'>Опублікувати</Button>
                    <Link to={'/'}>
                        <Button variant='danger'>Відміна</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
