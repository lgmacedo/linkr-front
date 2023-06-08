import Posts from "./Posts/Posts";
import { FaRetweet } from 'react-icons/fa';
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Repost(){

    const {repostData} = useContext(UserContext)

    return(
        <>
            <div>
                <FaRetweet/>
                <p>Re-posted by {repostData.username}</p>
            </div>
            <Posts
                key={repostData.post.id}
                post={repostData.post}
                getPosts={repostData.getPosts}
                idPost={repostData.post.id}
            />
        </>
    )
}

