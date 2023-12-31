import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '../../components/Header'
import CreatePStyles from '../CreatePost/CreatePost.module.scss';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import axios from '../../utils/axios';

export default function CreatePost() {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const inputFileRef = useRef(null);

    const { _id } = useParams();
    const isEditing = Boolean(_id);

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);

            const { data } = await axios.post('/uploads', formData);
            setImageUrl(data.url);
        } catch (error) {
            console.warn(error);
            alert('Error uploading');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            const fields = {
                title,
                text,
                imageUrl,
                category,
                tags
            }

            const { data } = isEditing
                ? await axios.patch(`/posts/updatePost/${_id}`, fields)
                : await axios.post('/posts/createPost', fields)

            const id = isEditing ? _id : data._id;
            navigate(`/posts/${id}`)
        } catch (err) {
            console.warn(err);
            alert('Error creating post')
        }
    }

    const onChange = useCallback((value) => {
        setText(value);
    }, []);

    useEffect(() => {
        if (_id) {
            axios.get(`/posts/getPost/${_id}`)
                .then(({ data }) => {
                    setTitle(data.title);
                    setText(data.text);
                    setImageUrl(data.imageUrl);
                    setCategory(data.category);
                    setTags(data.tags.join(', '));
                })
                .catch(err => {
                    console.warn(err);
                })
        }
    }, [])

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
                <Button onClick={() => inputFileRef.current.click()}>Завантажити картинку</Button>
                <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                {imageUrl && (
                    <>
                        <Button variant='danger' style={{ marginLeft: '15px' }} onClick={onClickRemoveImage}>Видалити</Button>
                        <img src={`http://localhost:3001/api/v1${imageUrl}`}
                            className={`${CreatePStyles.image} img-fluid`}
                            alt="uploaded" />
                    </>
                )}
                <br />
                <br />
                <Form.Control
                    type="text"
                    placeholder='Заголовок статті...'
                    className={`${CreatePStyles['title']}`}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder='Теги'
                    className={`${CreatePStyles['tags']}`}
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                />
                <Form.Select onChange={e => setCategory(e.target.value)} placeholder='Виберіть категорію статті'>
                    <option value=""></option>
                    <option value="news">Новини</option>
                    <option value="products">Товари</option>
                    <option value="care tips">Поради</option>
                    <option value="funny stories">Цікаві історії</option>
                </Form.Select>
                <SimpleMDE className={`${CreatePStyles['editor']}`} value={text} onChange={onChange} options={options} />
                <div className={`${CreatePStyles['buttons']}`}>
                    <Button onClick={onSubmit} variant='success'>{!isEditing ? 'Опублікувати' : 'Зберегти'}</Button>
                    <Link to={'/'}>
                        <Button variant='danger'>Відміна</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
