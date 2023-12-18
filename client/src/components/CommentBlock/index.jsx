import React, { useEffect, useState } from 'react'
import CommentStyle from '../CommentBlock/Comment.module.scss'
import axios from '../../utils/axios'
import { Form } from 'react-bootstrap';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogged } from '../../redux/slices/authSlice';
import { fetchComments } from '../../redux/slices/commentSlice';
export default function CommentBlock({ postId }) {
    const [body, setBody] = useState('');
    const dispatch = useDispatch();

    const { comments } = useSelector((state) => state.comments);
    const isCommentExist = comments.status === 'loading';
    const [IsSend, setIsSend] = useState(false);
    const isLogged = useSelector(selectIsLogged);

    const onClickSend = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/comments/${postId}/createComment`, { body })
                .then((res) => {
                    console.log(res);
                    setBody('');
                    setIsSend(true);
                })
                .catch((err) => {
                    window.alert(err);
                })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        dispatch(fetchComments(postId));
        if (IsSend) {
            dispatch(fetchComments(postId));
            setIsSend(false);
        }
    }, [dispatch, IsSend])
    return (
        <div className={`${CommentStyle['root']} shadow-lg`}>
            <div className={`${CommentStyle['post-comments-section']}`}>
                <div className={CommentStyle['comment-form']}>
                    {isLogged ?
                        <>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder='Залиш свій коментар тут'
                                className={`${CommentStyle['comment-editor']}`}
                                value={body}
                                onChange={e => setBody(e.target.value)}
                            />
                            <button
                                className={CommentStyle['comment-btn']}
                                onClick={onClickSend}
                            ><i className="fa-brands fa-telegram"></i></button>
                        </>
                        :
                        <>
                        </>
                    }

                </div>
                <div className={CommentStyle['post-comment-content-container']}>
                    <div className={CommentStyle['post-comment-content-title']}>Всі коментарі</div>
                    <div className={CommentStyle['post-comment-content']}>
                        {!isCommentExist ? comments.items.map((obj, index) => (
                            <li style={{ marginBottom: '15px' }} key={index}>
                                <div className={CommentStyle['post-comment-title-wrapper']}>
                                    <div className={CommentStyle['comment-title-user']}>{obj.user.nickname}</div>
                                    <small className={CommentStyle['comment-date']}>
                                        <Moment format='DD.MM.YYYY HH:mm'>{obj.createdAt}</Moment>
                                    </small>
                                </div>
                                <div className={CommentStyle['comment-content']}>
                                    {obj.body}
                                </div>
                            </li>
                        ))
                            : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
