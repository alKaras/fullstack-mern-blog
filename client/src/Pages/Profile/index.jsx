import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProfileStyles from '../Profile/Profile.module.scss';
import { Row, Col } from 'react-bootstrap';
import MiniPost from '../../components/Post/MiniPost';
import axios from '../../utils/axios';

export default function Profile() {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(`/posts/getUserPost`)
            .then((res) => {
                setData(res.data);
                console.log(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.warn(err);
                alert('Помилка отримання статей');
            })
    }, [])
    return (
        <>
            <Header />
            <div className={`${ProfileStyles.root}`}>
                <div className={`${ProfileStyles['posts']} shadow-lg mb-5 bg-white`}>
                    <div className={`${ProfileStyles['control']}`}>
                        <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>Ваші пости</h2>
                        <button className={`${ProfileStyles['add-btn']}`}><i className="fa-solid fa-plus"></i></button>
                    </div>




                    {(isLoading ? [...Array(3)] : data).map((obj, index) => (
                        isLoading ? (
                            <>

                            </>
                        )
                            :
                            (
                                <MiniPost
                                    _id={obj._id}
                                    title={obj.title}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={10}
                                    tags={obj.tags}
                                />
                            )
                    ))}
                </div>
            </div >
        </>
    )
}