import React, { useEffect, useState } from 'react'
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import axios from '../../utils/axios'
import CommentBlock from '../../components/CommentBlock'
import { useSelector } from 'react-redux'
import { selectIsSend } from '../../redux/slices/commentSlice'

export default function FullPost() {
    const { _id } = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const isSend = useSelector(selectIsSend);
    console.log(isSend);
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
        if (isSend) {
            axios.get(`/posts/getPost/${_id}`)
                .then((res) => {
                    setData(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.warn(err);
                    alert('Помилка отримання статті');
                });
        }
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
                imageUrl={data.imageUrl ? `http://localhost:3001/api/v1${data.imageUrl} ` : ''}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={data.commentsCount}
                tags={data.tags}
                isFullPost={true}
            >
                <Markdown>{data.text}</Markdown>

            </Post>
            <CommentBlock postId={_id} />
        </>
    )
}