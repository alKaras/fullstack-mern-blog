import React from 'react'
import TextTruncate from 'react-text-truncate';
import PostStyles from '../Post/Post.module.scss';
export default function Post() {
    return (
        <>
            <div className={`${PostStyles.root} shadow-lg mb-5 bg-white`}>
                <img
                    src="/images/dustin-humes-kDzsgPnHFsM-unsplash.jpg"
                    alt="phot"
                    className={`${PostStyles['post-img']} img-fluid`} />

                <div className={`${PostStyles['text-content']}`}>

                    <div className={`${PostStyles['post-headtext']}`}>{"Sample heading"}</div>
                    <div className={`${PostStyles['post-user']}`}>Posted by {"O. Karas"} - 05.10.2023 18:00:00</div>


                    <p className={`${PostStyles['post-descr']}`}>
                        <TextTruncate
                            line={1}
                            element="span"
                            truncateText='...'
                            text='sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text'
                        />
                    </p>
                    <div className={PostStyles['post-footer']}>
                        <div className={`${PostStyles['post-tags']}`}>
                            <small className={PostStyles['post-tag']}>React</small>
                            <small className={PostStyles['post-tag']}>Node</small>
                            <small className={PostStyles['post-tag']}>Js</small>
                        </div>
                        <div>
                            <small><i className="fa-regular fa-eye"></i> 123</small>
                            <small className={PostStyles['post-comments']}><i className="fa-solid fa-comment"></i> 256</small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}