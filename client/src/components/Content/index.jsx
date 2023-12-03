import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ContentStyles from '../Content/Content.module.scss';
import Post from '../Post';
export default function Content() {
    return (
        <>
            <div className={ContentStyles.root}>
                <Row>
                    {[...Array(6)].map(() => (
                        <Col lg={6} xs={6} md={6} >
                            <Post
                                _id={1}
                                title={"Sample title"}
                                imageUrl={"/images/dustin-humes-kDzsgPnHFsM-unsplash.jpg"}
                                user={{
                                    nickname: "O. Karas"
                                }}
                                text={"sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text"}
                                createdAt={"03.12.2023"}
                                viewsCount={150}
                                commentsCount={10}
                                tags={['react', 'js', 'holiday']}
                                isFullPost={false}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}
