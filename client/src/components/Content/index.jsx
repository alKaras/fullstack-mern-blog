import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContentStyles from '../Content/Content.module.scss';
import Post from '../Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, infoAboutDeleted } from '../../redux/slices/postSlice';
export default function Content() {

    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.logreg.user);
    const isPostDeleted = useSelector((state) => state.posts.posts.deletingStatus === 'done');

    const isPostsLoading = posts.status === 'loading';

    useEffect(() => {
        dispatch(fetchPosts());
        
        if (isPostDeleted) {
            dispatch(fetchPosts());
        }
    }, [dispatch, isPostDeleted])

    return (
        <>
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
                                    commentsCount={10}
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
