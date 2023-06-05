import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const TimeLineContainer = styled.div`
  width: fit-content;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 420px) {
    margin-top: 100px;
  }
`;

export const Title = styled.div`
  display: flex;
  width: 611px;
  justify-content: left;
  text-align: left;
  font-size: 43px;
  line-height: 64px;
  color: #fff;
  font-family: "Oswald", sans-serif;
  margin-bottom: 15px;
  @media (max-width: 420px) {
    width: 88%;
    margin-bottom: 0;
  }
`;

export const CreatePost = styled.div`
display:flex;
gap:10px;
width:611px;
height:209px;
background-color: #fff;
border-radius: 16px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
@media (max-width: 420px) {
 width:100%;
 justify-content: center;
 border-radius: 0;
 height:auto;
}
`;

export const LeftSide = styled.div`
  display: flex;
  padding: 20px 0 20px 20px;
  img {
    width: 53px;
    height: 53px;
    border-radius: 27px;
    object-fit: cover;
  }
  @media (max-width: 420px) {
    display: none;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  p {
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    margin: 13px 0 10px 0;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  @media (max-width: 420px) {
    width: 80%;
  }
`;

export const Link = styled.input`
  width: 503px;
  height: 30px;
  border: none;
  background-color: #efefef;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  font-weight: 300;
  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const Description = styled.textarea`
  width: 503px;
  height: 66px;
  border: none;
  background-color: #efefef;
  border-radius: 5px;
  resize: none;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  font-weight: 300;
  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const CreateButton = styled.button`
  cursor: pointer;
  width: 112px;
  height: 31px;
  background-color: #1877f2;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 700;
`;

export const NoPosts = styled.h3`
  text-align: center;
  font-family: "Oswald", sans-serif;
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  color: #fff;
`;

export const TrendingContainer = styled.div`
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
`;