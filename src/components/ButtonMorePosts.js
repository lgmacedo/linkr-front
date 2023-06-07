import styled from "styled-components";
import { LuRefreshCw } from  'react-icons/lu';
import { useState } from "react";

export default function ButtonMorePosts({newPostsCount, handleButtonNewPost}){


    return (<Button onClick={handleButtonNewPost}>
        <div>{newPostsCount} new post{newPostsCount > 1 ? "s" : ""}, load more! <LuRefreshCw /></div>
        </Button>)
}

const Button = styled.button`

    width: 611px;
    height: 61px;
    background-color: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    border: none;
    color: white;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    div {
        display: flex;
        gap:5px;
        justify-content: center;
        align-items: center;
    }
`