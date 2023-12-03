import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProfileStyles from '../Profile/Profile.module.scss';
import { Row, Col } from 'react-bootstrap';
import MiniPost from '../../components/Post/MiniPost';
import { useSelector } from 'react-redux';
import { infoAboutUser } from '../../redux/slices/authSlice';
import axios from '../../utils/axios';

export default function Profile() {

    const user = useSelector(infoAboutUser);
    console.log(user);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(`/posts/getUserPost`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.warn(err);
                alert('Помилка отримання статей');
            })
    }, [])
    console.log(isLoading);
    return (
        <>
            <Header />
            <div className={`${ProfileStyles.root}`}>
                <Row>
                    <Col lg={6} md={7} xs={7} className={`${ProfileStyles['posts']} shadow-lg mb-5 bg-white`}>
                        <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>Ваші пости</h2>
                        {(isLoading ? [...Array(3)] : data).map((obj, index) => (
                            isLoading ? (
                                <MiniPost
                                    key={index}
                                />
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

                    </Col>
                    <Col lg={1} md={1} xs={1}></Col>
                    <Col lg={5} md={5} xs={5} className={`${ProfileStyles['profile']} shadow-lg mb-5 bg-white`}>
                        <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>Ваш профіль</h2>
                        <div>
                            <label className={`${ProfileStyles['profile-text']}`}>Email</label>
                            <input type="text" name='email' disabled value={user.email} />
                        </div>
                        <div>
                            <label className={`${ProfileStyles['profile-text']}`}>Nickname</label>
                            <input type="text" name='email' disabled value={user.nickname} />
                        </div>
                    </Col>
                </Row>

            </div>
        </>
    )
}