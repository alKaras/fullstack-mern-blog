import React from 'react'
import ContentStyles from '../Content/Content.module.scss';
import Post from '../Post';
export default function Content() {
    return (
        <>
            <div className={ContentStyles.root}>
                <Post />
                <Post />
            </div>
        </>
    )
}
