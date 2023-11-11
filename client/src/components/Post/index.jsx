import React from 'react'
import { Button } from 'react-bootstrap';
import PostStyles from '../Post/Post.module.scss';
export default function Post() {
    return (
        <>
            <div className={`${PostStyles.root} shadow-sm p-3 mb-5 bg-white rounded`}>
                <img
                    src="/images/dustin-humes-kDzsgPnHFsM-unsplash.jpg"
                    alt="phot"
                    className={`${PostStyles['post-img']} img-fluid`} />
                <div className={`${PostStyles['text-content']}`}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className={`${PostStyles['post-headtext']}`}>Sample heading</h3>
                        <div className={PostStyles['post-tags']}>
                            <div>sample</div>
                            <div>sample</div>
                            <div>sample</div>
                        </div>
                    </div>

                    <p className={`${PostStyles['post-descr']}`}>
                        sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text...
                    </p>
                    <div className={PostStyles['post-infor']}>
                        <small>Автор: Карась. О</small>
                        <small>05.10.2023 18:00:00</small>
                        <small><i class="fa-regular fa-eye"></i> 123</small>
                    </div>

                </div>
                <Button variant='info' className={PostStyles['post-btn']}><i class="fa-solid fa-right-long"></i></Button>
            </div>
        </>
    )
}