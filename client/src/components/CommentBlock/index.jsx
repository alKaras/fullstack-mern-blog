import React, { useState } from 'react'
import CommentStyle from '../CommentBlock/Comment.module.scss'
import axios from '../../utils/axios'
import { Form } from 'react-bootstrap';
export default function CommentBlock({ postId }) {
    const [body, setBody] = useState('');

    const onClickSend = async (e) => {
        e.preventDefault();
        try {
            console.log({ body });
            await axios.post(`/comments/${postId}/createComment`, { body })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.warn(err);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`${CommentStyle['root']} shadow-lg`}>
            <div className={`${CommentStyle['post-comments-section']}`}>
                <div className={CommentStyle['comment-form']}>
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
                </div>
                <div className={CommentStyle['post-comment-content-container']}>
                    <div className={CommentStyle['post-comment-content-title']}>Всі коментарі</div>
                    <div className={CommentStyle['post-comment-content']}>

                    </div>
                </div>
            </div>
        </div>
    )
}
