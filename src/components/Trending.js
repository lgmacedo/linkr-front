import { Hashtag } from "./Posts/styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Trending({ trending }) {
  const navigate = useNavigate();

  console.log(trending);

  return (
    <Container>
      {trending.map((hashtag) => (
        <Hashtag onClick={() => navigate(`/hashtag/${hashtag.hashtag}`)}>
          {`# ${hashtag.hashtag}`}
        </Hashtag>
      ))}
    </Container>
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
