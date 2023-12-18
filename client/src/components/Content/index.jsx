import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContentStyles from '../Content/Content.module.scss';
import Post from '../Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByTags, fetchPosts } from '../../redux/slices/postSlice';
import { Button, Form } from 'react-bootstrap';
import SearchStyle from '../Content/Search.module.scss'
import axios from '../../utils/axios';
export default function Content() {

    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    const [MVtags, setMVtags] = useState([]);
    const userData = useSelector((state) => state.logreg.user);
    const isPostDeleted = useSelector((state) => state.posts.posts.deletingStatus === 'done');
    const [TagsValues, setTagsValues] = useState('');

    const isPostsLoading = posts.status === 'loading';

    useEffect(() => {
        dispatch(fetchPosts());

        if (isPostDeleted) {
            dispatch(fetchPosts());
        }
        axios.get('/posts/getPopularTags')
            .then((res) => {
                console.log(res.data.popularTags)
                setMVtags(res.data.popularTags);
            })
            .catch((err) => console.warn(err))
    }, [dispatch, isPostDeleted])

    const onClickSearch = () => {
        const tags = TagsValues.split(', ').map(tag => tag.trim());
        const isInvalid = tags.filter(tag => !posts.items.some(post => post.tags.includes(tag)));

        if (isInvalid.length > 0) {
            window.alert('Помилка пошуку постів');
            dispatch(fetchPosts())
        }

        dispatch(fetchByTags(TagsValues))
            .then(() => {
                // setTagsValues('');
            })
    }

    const onClickClearForm = (e) => {
        e.preventDefault();
        setTagsValues('');
        dispatch(fetchPosts());
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    return (
        <>
            {/* Search */}
            <div className={`${SearchStyle.root} shadow-lg mb-5 bg-white`}>
                <div className={`${SearchStyle.search}`}>
                    <Form inline >
                        <Form.Control
                            type="text"
                            placeholder="Пошук"
                            value={TagsValues}
                            className={SearchStyle['search-form']}
                            onChange={e => setTagsValues(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </Form>
                    <button onClick={onClickClearForm} style={{background: 'none'}}><i class="fa-solid fa-x"></i></button>
                    <Button onClick={onClickSearch} className={`${SearchStyle['search-btn']}`}>Знайти</Button>
                </div>
                <div className={SearchStyle['most-viewed-tags']}>
                    <p style={{margin: '0px'}}>Популярні теги</p>
                    {MVtags.map((name, index) => (
                        <small className={SearchStyle['viewed-tags-items']} key={index}>{name._id}</small>
                    ))}
                </div>
            </div>
            <div className={ContentStyles.root}>
                <Row>
                    {(isPostsLoading ? [...Array(6)] : posts.items).map((obj, index) => (
                        isPostsLoading ? (
                            <Post key={index} isLoading={true} />
                        ) : (
                            <Col lg={4} xs={4} md={4} >
                                <Post
                                    _id={obj._id}
                                    title={obj.title}
                                    imageUrl={obj.imageUrl ? `http://localhost:3001/api/v1${obj.imageUrl} ` : ''}
                                    user={obj.user}
                                    text={obj.text}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={obj.commentsCount}
                                    tags={obj.tags}
                                    isFullPost={false}
                                    isAuthored={userData?._id === obj.user._id}
                                />
                            </Col>
                        )
                    ))}
                </Row>
            </div>
        </>
    )
}
