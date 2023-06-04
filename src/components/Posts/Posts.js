import { ContainerPost, Description, LeftSidePost, Link, LinkImg, LinkInfo, Name, RightSidePost , Hashtag} from "./styles";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import reactStringReplace from "react-string-replace";

export default function Posts({ post }) {
  const {
    id,
    image,
    userId,
    username,
    likescount,
    likedBy,
    link,
    picture,
    title,
    description,
    desc,
  } = post;
  const { user, setUserIdSearch } = useContext(UserContext);
  const [like, setLike] = useState("");
  const [color, setColor] = useState("");
  const [count, setCount] = useState(likescount);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    const currentUserLiked =
      likedBy && likedBy.find((o) => o.name === user.username);

    if (currentUserLiked) {
      setColor("#AC0000");
      setLike("heart");
    } else if (likedBy && Array.isArray(likedBy)) {
      setColor("#FFFFFF");
      setLike("heart-outline");
    } else {
      setColor("#FFFFFF");
      setLike("heart-outline");
    }
  }, [likedBy, user.username]);

  function likePost() {
    const postId = id;
    const ui = user.id;
    const body = { postId, ui };
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

  function searchUserId(id) {
    const obj = { userId, username, picture, likedBy, setColor, setLike };
    setUserIdSearch(obj);
    navigate(`/user/${id}`);
  }

  return (
    <ContainerPost data-test="post">
      <LeftSidePost>
        <img
          src={picture}
          alt="profile pic"
          onClick={() => searchUserId(userId)}
        />
        <ion-icon
          name={like}
          style={{ color: color }}
          onClick={likePost}
        ></ion-icon>
        <p
          data-tip={likedBy ? `${likedBy.length} people` : "0 people"}
          data-for={`tooltip-${id}`}
        >
          {count} likes
        </p>
        <Tooltip id={`tooltip-${id}`} place="bottom" effect="solid">
          {likedBy && likedBy.length > 0 ? (
            <p>
              {likedBy.includes(user.username) ? "Você, " : ""}
              {likedBy.map((name, index) => {
                if (name !== user.username) {
                  if (likedBy.length > 1) {
                    if (index === 0) {
                      return <span key={index}>{name}</span>;
                    } else if (index === 1) {
                      return <span key={index}> and {name}</span>;
                    } else {
                      return null;
                    }
                  } else {
                    return <span key={index}>{name}</span>;
                  }
                }
                return null;
              })}
              {" and other "}
              {likedBy.length - 2}
              {likedBy.length === 2 ? " person" : " people"}
            </p>
          ) : (
            "0 people"
          )}
        </Tooltip>
      </LeftSidePost>
      <RightSidePost>
        <Name data-test="username" onClick={() => searchUserId(userId)}>
          {username}
        </Name>
        <Description data-test="description">
          {reactStringReplace(description, /#(\w+)/g, (match, i) => (
            <Hashtag
              onClick={() => navigate(`/hashtag/${match.replace("#", "")}`)}
            >
              #{match}
            </Hashtag>
          ))}
        </Description>
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
