import styled from "styled-components";
import {
  ContainerPost,
  Description,
  LeftSidePost,
  Link,
  LinkImg,
  LinkInfo,
  Name,
  RightSidePost,
  Hashtag,
} from "./styles";
import ReactHashtag from "@mdnm/react-hashtag";
import { useNavigate } from "react-router-dom";

export default function Posts({ post }) {
  const {
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

  const navigate = useNavigate();

  return (
    <ContainerPost data-test="post">
      <LeftSidePost>
        <img src={picture} alt="profile pic" />
      </LeftSidePost>
      <RightSidePost>
        <Name data-test="username">{username}</Name>
        <Description data-test="description">
          <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <Hashtag
                onClick={() =>
                  navigate(`/hashtag/${hashtagValue.replace("#", "")}`)
                }
              >
                {hashtagValue}
              </Hashtag>
            )}
          >
            {description}
          </ReactHashtag>
        </Description>
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
  );
}