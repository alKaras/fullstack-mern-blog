import React from 'react'
import MiniPostStyle from '../MiniPost/MiniPost.module.scss';
import Moment from 'react-moment'

export default function MiniPost({
    _id,
    title,
    createdAt,
    imageUrl,
    viewsCount,
    commentsCount,
    tags,
    isLoading
}) {
    return (
        <>
            <div className={`${MiniPostStyle.root}`}>
                <img
                    src="/images/dustin-humes-kDzsgPnHFsM-unsplash.jpg"
                    alt="mini"
                    width={150}
                    className='img-fluid rounded'
                />

                <div style={{ marginLeft: 20 }}>
                    <div className={`${MiniPostStyle['p-title']}`}>{title}</div>
                    <small className={`${MiniPostStyle['p-date']}`}><Moment format='DD.MM.YYYY HH:mm'>{createdAt}</Moment></small>

                    <div className={`${MiniPostStyle['p-footer']}`}>
                        <div className={`${MiniPostStyle['p-other']}`}>
                            <small>
                                <i className="fa-regular fa-eye"></i> {viewsCount}
                            </small>
                            <small>
                                <i className="fa-solid fa-comment"></i> {commentsCount}
                            </small>
                        </div>
                        <div className={MiniPostStyle['post-tags']}>
                            {tags.map((name) => (
                                <small key={name}>{name}</small>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`${MiniPostStyle['p-action']}`} >
                    <div>
                        <button style={{ background: "orange" }} className={`${MiniPostStyle['p-action-btn']}`}>
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    </div>
                    <div>
                        <button style={{ background: "red" }} className={`${MiniPostStyle['p-action-btn']}`}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}