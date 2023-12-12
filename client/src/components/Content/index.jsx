import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContentStyles from '../Content/Content.module.scss';
import Post from '../Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByTags, fetchPosts } from '../../redux/slices/postSlice';
import { Button, Form } from 'react-bootstrap';
import SearchStyle from '../Search/Search.module.scss'
// import Search from '../Search';
export default function Content() {

    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.logreg.user);
    const isPostDeleted = useSelector((state) => state.posts.posts.deletingStatus === 'done');
    const [TagsValues, setTagsValues] = useState('');

    const isPostsLoading = posts.status === 'loading';

    useEffect(() => {
        dispatch(fetchPosts());

        if (isPostDeleted) {
            dispatch(fetchPosts());
        }
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
                setTagsValues('');
            })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
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
                    <Button onClick={onClickSearch} className={`${SearchStyle['search-btn']}`}>Знайти</Button>
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
