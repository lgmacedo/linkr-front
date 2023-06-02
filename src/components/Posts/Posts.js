import styled from "styled-components";
import { ContainerPost, Description, LeftSidePost, Link, LinkImg, LinkInfo, Name, RightSidePost } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";

export default function Posts({post}){
  const { image, userId, username, likescount, likedBy, link, picture, title, description, desc } = post;
  const { user } = useContext(UserContext);
  const [like, setLike] = useState('heart-outline')
  const [color, setColor] = useState('#FFFFFF')

  function likePost(){
    if(like==='heart-outline'){
        setLike('heart')
        setColor('#AC0000')
    } else{
        setLike('heart-outline')
        setColor('#FFFFFF')
    }
  }

    return (
        <ContainerPost data-test="post">
        <LeftSidePost>
          <img src={picture} alt="profile pic" />
          <ion-icon name={like} style={{color: color}} onClick={likePost}></ion-icon>
          <p>30 likes</p>
        </LeftSidePost>
        <RightSidePost>
            <Name data-test="username">{username}</Name>
            <Description data-test="description">{description}</Description>
            <Link data-test="link" href={link} target="_blank">
                <LinkInfo>
                    <p className="title">{title}</p>
                    <p className="desc">{desc}</p>
                    <p className="url">{link}</p>
                </LinkInfo>
                <LinkImg src={image} alt={title}></LinkImg>
            </Link>
        </RightSidePost>
        </ContainerPost>
    )
}