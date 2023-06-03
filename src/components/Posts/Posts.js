import { ContainerPost, Description, LeftSidePost, Link, LinkImg, LinkInfo, Name, RightSidePost } from "./styles";
import { useContext } from "react";
import { Tooltip } from 'react-tooltip';
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";
import axios from "axios";


export default function Posts({post}){
  const { id, image, userId, username, likescount, likedBy, link, picture, title, description, desc } = post;
  const { user } = useContext(UserContext);
  const [like, setLike] = useState('heart-outline')
  const [color, setColor] = useState('#FFFFFF')
  const [count, setCount] = useState(likescount)


  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };

  function likePost() {
    const postId = id;
    const body = { postId, userId };
    const promise = api.post("/like", body, config);
    promise
      .then((res) => {
        setCount(res.data)
        if (like === "heart-outline") {
          setLike("heart");
          setColor("#AC0000");
        } else if (like === "heart") {
          setLike("heart-outline");
          setColor("#FFFFFF");
        }
      })
      .catch((err) =>
        alert(err.message)
      );
  }


    return (
        <ContainerPost data-test="post">
        <LeftSidePost>
            <img src={picture} alt="profile pic" />
            <ion-icon name={like} style={{color: color}} onClick={likePost}></ion-icon>
            <p data-tip={likedBy} data-for="likes-tooltip">{count} likes</p>
            <Tooltip id="likes-tooltip" place="top" effect="solid" />        </LeftSidePost>
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