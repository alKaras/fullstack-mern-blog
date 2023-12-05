import React, { useState } from 'react'
import CommentBlockStyles from '../CommentBlock/CommentBlock.module.scss'
export default function CommentBlock() {
    return (
        <>
            <div className={`${CommentBlockStyles.root}`}>
                {/* {(!isComment ? [...Array(5)]: coms).map((obj, index) => (
                    <ul key={index}>
                        <li>obj.user.nickname</li>
                        <li>obj.user.nickname</li>
                    </ul>

                ))
                } */}
            </div>
        </>
    )
}