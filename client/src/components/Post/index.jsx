import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    children,
    isFullPost,
    isLoading,
    isAuthored
}) {

    useEffect(() => {
        if (isFullPost) {
            document.title = title;
        }

        return () => {
            document.title = 'Blog'
        }
    }, [title, isFullPost])
    console.log(isAuthored);
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
                                        src={imageUrl}
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
                            <div className={`${PostStyles['title-wrapper']}`}>
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
                                {
                                    isAuthored &&
                                    <>
                                        <div className={`${PostStyles['p-action']}`} >
                                            <div>
                                                <button style={{ background: "orange" }} className={`${PostStyles['p-action-btn']}`}>
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                            </div>
                                            <div>
                                                <button style={{ background: "red" }} className={`${PostStyles['p-action-btn']}`}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>


                            <div className={`${!isFullPost ? PostStyles['post-user'] : PostStyles['fullpost-user']}`}>Posted by {user.nickname} | <Moment format='DD.MM.YYYY HH:mm'>{createdAt}</Moment>
                            </div>

                            {children && <div className={`${PostStyles['full-descr']}`}>{children}</div>}
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