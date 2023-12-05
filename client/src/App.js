import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/index';
import './index.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './redux/slices/authSlice';
import FullPost from './Pages/FullPost';
import CreatePost from './Pages/CreatePost';

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className="_container">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/posts/:_id' element={<FullPost />} />
                <Route path='/create-post' element={<CreatePost />} />
                <Route path='/posts/:_id/edit' element={<CreatePost />} />
            </Routes>
        </div>
    );
}
