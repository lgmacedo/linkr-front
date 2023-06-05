import { Hashtag } from "./Posts/styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Trending({ trending }) {
  const navigate = useNavigate();

  return (
    <TrendingContainer>
      <span className="title">trending</span>
      <div className="line" />
      <Container>
        {trending.map((hashtag) => (
          <Hashtag
            key={hashtag.hashtag}
            onClick={() => navigate(`/hashtag/${hashtag.hashtag}`)}
          >
            {`# ${hashtag.hashtag}`}
          </Hashtag>
        ))}
      </Container>
    </TrendingContainer>
  );
}

const Container = styled.span`
  font-family: "Lato", sans-serif;
  height: 293px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 19px;
  color: #fff;
  padding-left: 16px;
  box-sizing: border-box;
  margin-top: 22px;
  justify-content: space-between;
`;

const TrendingContainer = styled.div`
  height: 401px;
  width: 301px;
  background-color: #171717;

  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 260px;
  border-radius: 16px;
  padding-top: 9px;
  box-sizing: border-box;

  .title {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 27px;
    color: #fff;
    margin-left: 16px;
    line-height: 40.01px;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #484848;
    margin-top: 12px;
  }

  @media (max-width: 420px) {
    display: none;
  }
`;