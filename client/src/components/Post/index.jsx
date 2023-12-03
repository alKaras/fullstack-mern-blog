import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextTruncate from 'react-text-truncate';
import PostStyles from '../Post/Post.module.scss';
import Spinner from 'react-bootstrap/Spinner';
import Moment from 'react-moment';
export default function Post({
    _id,
    title,
    createdAt,
    imageUrl,
    user,
    text,
    viewsCount,
    commentsCount,
    tags,
    isFullPost,
    isLoading
}) {

    useEffect(() => {
        if (isFullPost) {
            document.title = title;
        }

        return () => {
            document.title = 'Blog'
        }
    }, [title, isFullPost])
    return (
        <>
            {isLoading ?
                <>
                    <Spinner animation="border" variant="warning" />
                </>
                :
                <>
                    <div className={`${isFullPost ? PostStyles['fullpost'] : PostStyles['root']} shadow-lg mb-5 bg-white`}>

                        {isFullPost ?
                            <>
                                <div className={`breadcr`}>
                                    <Link to={'/'}>
                                        Home
                                    </Link>
                                    <span> / </span><span> {title}</span>
                                </div>
                            </>
                            :
                            <>
                            </>

                        }
                        {imageUrl ?

                            <>
                                <div className={`${!isFullPost ? PostStyles['post-img'] : PostStyles['fullpost-img']}`}>
                                    <img
                                        src="/images/dustin-humes-kDzsgPnHFsM-unsplash.jpg"
                                        alt="phot"
                                        className='img-fluid'
                                    />
                                </div>
                            </>

                            :
                            <>

                            </>

                        }

                        <div className={`${PostStyles['text-content']}`}>
                            {!isFullPost ?
                                <>
                                    <Link style={{ cursor: 'pointer' }} to={`/posts/${_id}`}>
                                        <div className={`${PostStyles['post-headtext']}`}>{title}</div>
                                    </Link>
                                </>
                                :
                                <>
                                    <div className={`${PostStyles['full-headtext']}`}>{title}</div>
                                </>
                            }

                            <div className={`${!isFullPost ? PostStyles['post-user'] : PostStyles['fullpost-user']}`}>Posted by {user.nickname} | <Moment format='DD.MM.YYYY hh:mm'>{createdAt}</Moment>
                            </div>

                            {!isFullPost ?
                                <>
                                    <p className={`${PostStyles['post-descr']}`}>
                                        <TextTruncate
                                            line={1}
                                            element="span"
                                            truncateText='...'
                                            text={text}
                                        />
                                    </p>
                                </>
                                :
                                <>
                                    <p className={`${PostStyles['full-descr']}`}>
                                        {text}
                                    </p>
                                </>
                            }
                            <div className={PostStyles['post-footer']}>
                                <div className={`${PostStyles['post-tags']}`}>
                                    {tags.map((name) => (
                                        <small key={name} className={PostStyles['post-tag']}>{name}</small>
                                    ))}
                                </div>
                                <div>
                                    <small>
                                        <i className="fa-regular fa-eye"></i> {viewsCount}
                                    </small>
                                    <small className={PostStyles['post-comments']}>
                                        <i className="fa-solid fa-comment"></i> {commentsCount}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            }

        </>
    )
}