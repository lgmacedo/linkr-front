import { ContainerPost, Description, LeftSidePost, Link, LinkImg,
  LinkInfo, Name, RightSidePost, StyledTooltip } from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Posts({ post }) {
  const { id, image, userId, username, likescount, likedBy, link, picture, title, description, desc } = post;
  const { user, setUserIdSearch } = useContext(UserContext);
  const [like, setLike] = useState('');
  const [color, setColor] = useState('');
  const [count, setCount] = useState(likescount);
  const [tooltipContent, setTooltipContent] = useState('');
  const navigate = useNavigate()

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };
  
  useEffect(() => {
    console.log("likedBy:", likedBy);
    console.log("user.username:", user.username);
    console.log("userId:", userId);

    const currentUserLiked = likedBy && Array.isArray(likedBy) && likedBy.find((obj) => obj.name === user.username);

    if (currentUserLiked) {
      const likedByWithCurrentUser = likedBy.map((obj) => (obj.name === username ? 'Você' : obj.name));
      const otherPeopleCount = likedByWithCurrentUser.length - 1;
      const tooltipText = `${likedByWithCurrentUser.join(', ')} and other ${otherPeopleCount} people`;
      setColor("#AC0000");
      setLike('heart');
      setTooltipContent(tooltipText);
    } else if (likedBy && Array.isArray(likedBy)) {
      const otherPeopleCount = likedBy.length - 1;
      const tooltipText = `${likedBy.join(', ')} and other ${otherPeopleCount} people`;
      setTooltipContent(tooltipText);
      setColor("#FFFFFF");
      setLike("heart-outline");  
    } else{
      setColor("#FFFFFF");
      setLike("heart-outline");  
    }
  }, [likedBy, username, user.username])

    function likePost() {
    const postId = id;
    const body = { postId, userId };
    const promise = api.post("/like", body, config);
    promise
      .then((res) => {
        setCount(res.data);
        console.log(res.data);
        if (like === "heart-outline") {
          setLike("heart");
          setColor("#AC0000");
        } else if (like === "heart") {
          setLike("heart-outline");
          setColor("#FFFFFF");
        }
      })
      .catch((err) => alert(err.message));
  }

  function searchUserId(id){
    const obj = {userId, username, picture}
    setUserIdSearch(obj)
    navigate(`/user/${id}`)
  }

  return (
    <ContainerPost data-test="post">
      <LeftSidePost>
        <img src={picture} alt="profile pic" onClick={()=>searchUserId(userId)}/>
        <ion-icon name={like} style={{ color: color }} onClick={likePost}></ion-icon>
        <p data-tip={tooltipContent} data-for="likes-tooltip" data-test="likes">
          {count} likes
        </p>
        <StyledTooltip
          id="likes-tooltip"
          place="top"
          effect="solid"
          delayShow={300}
        >
          <span>{tooltipContent}</span>
        </StyledTooltip>
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
          <LinkImg src={image} alt={title} />
        </Link>
      </RightSidePost>
    </ContainerPost>
  );
}
