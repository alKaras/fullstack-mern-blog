import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContentStyles from '../Content/Content.module.scss';
import Post from '../Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postSlice';
export default function Content() {

    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);

    const isPostsLoading = posts.status === 'loading';

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    return (
        <>
            <div className={ContentStyles.root}>
                <Row>
                    {(isPostsLoading ? [...Array(6)] : posts.items).map((obj, index) => (
                        isPostsLoading ? (
                            <Post key={index} isLoading={true} />
                        ) : (
                            <Col lg={6} xs={6} md={6} >
                                <Post
                                    _id={obj._id}
                                    title={obj.title}
                                    imageUrl={obj.imageUrl}
                                    user={obj.user}
                                    text={obj.text}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={10}
                                    tags={obj.tags}
                                    isFullPost={false}
                                />
                            </Col>
                        )
                    ))}
                </Row>
            </div>
        </>
    )
}
