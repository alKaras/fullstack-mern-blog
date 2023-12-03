import React, { useState, useEffect } from 'react';

export default function ScrollBackToTop() {

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setIsVisible(scrollTop > 100);
    }


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])


    return (
        <button className={`back-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    )
}