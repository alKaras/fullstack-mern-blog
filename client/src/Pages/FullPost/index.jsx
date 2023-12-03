import React, { useEffect, useState } from 'react'
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import axios from '../../utils/axios'

export default function FullPost() {
    const { _id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(`/posts/getPost/${_id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.warn(err);
                alert('Помилка отримання статті');
            });
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost={true} />;
    }


    return (
        <>
            <Header />
            <Post
                _id={data._id}
                title={data.title}
                imageUrl={data.imageUrl}
                user={data.user}
                text={data.text}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={10}
                tags={data.tags}
                isFullPost={true}
            />

            {/* <CommentBlock> */}
        </>
    )
}