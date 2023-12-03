import React from 'react'
import Post from '../../components/Post'
import Header from '../../components/Header'
export default function FullPost() {
    return (
        <>
            <Header />
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
                isFullPost={true}
            />

            {/* <CommentBlock> */}
        </>
    )
}