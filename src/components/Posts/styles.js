import styled from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export const StyledTooltip = styled(Tooltip)`
  background: rgba(255, 255, 255, 0.9);
  color: #ffffff;
  border-radius: 3px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 13px;
  color: #505050;
  cursor: pointer;
`;

export const ContainerPost = styled.div`
  width: 611px;
  min-height: 276px;
  background-color: #171717;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;

  .delete {
    position: absolute;
    color: #fff;
    font-size: 16px;
    right: 22px;
    top: 23px;
    cursor: pointer;
  }

  .edit {
    position: absolute;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    top: 23px;
    right: 50px;
  }

  @media (max-width: 420px) {
    width: 100%;
    min-height: 232px;
    border-radius: 0;
  }
`;

export const PostMainContent = styled.div`
  display: flex;
  padding: 5px 5px 10px;
  gap: 5px;
`;

export const LeftSidePost = styled.div`
  display: flex;
  padding: 20px 0 20px 20px;
  flex-direction: column;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    object-fit: cover;
    cursor: pointer;
  }
  ion-icon,
  svg {
    color: #ffffff;
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
  }
  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    margin-top: 5px;
    color: #ffffff;
  }
  @media (max-width: 420px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const RightSidePost = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  width: 100%;
  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }
`;

export const CommentsContainer = styled.div`
  display: ${({ opened }) => (opened ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 0px 0px 16px 16px;
  font-family: "Lato", sans-serif;
`;

export const Comment = styled.div`
  height: 71px;
  border-bottom: 1px solid #353535;
  width: 93.45%;
  display: flex;
  align-items: center;
  img {
    width: 39px;
    height: 39px;
    object-fit: cover;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 18px;
    width: 100%;
    position: relative;
    row-gap: 5px;
    p:nth-child(1){
      font-size: 14px;
      font-weight: 700;
      color: #f3f3f3;
    }
    span{
      font-weight: 400;
      color: #565656;
    }
    p:nth-child(2){
      font-weight: 400;
      font-size: 14px;
      color: #acacac;
    }
  }
`;

export const NewComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 93.45%;
  height: 83px;
  img {
    width: 39px;
    height: 39px;
    object-fit: cover;
    border-radius: 50%;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
  }
  input {
    height: 39px;
    margin-left: 14px;
    width: 100%;
    background-color: #252525;
    border-radius: 8px;
    border: none;
    padding-left: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
    ::placeholder {
      color: #575757;
      font-style: italic;
      letter-spacing: 0.05em;
    }
  }
  svg {
    cursor: pointer;
    position: absolute;
    right: 12.5px;
  }
`;

export const Name = styled.p`
  width: fit-content;
  margin: 15px 0 0px 0;
  font-size: 19px;
  line-height: 23px;
  color: #fff;
  cursor: pointer;
`;

export const Description = styled.p`
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
`;

export const EditDescription = styled.form`
  height: fit-content;
  width: 300px;

  textarea {
    font-family: "Lato", sans-serif;
    outline: none;
    width: 500px;
    height: 50px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    padding-left: 9px;
    box-sizing: border-box;
    color: #4c4c4c;
    border-radius: 7px;
    border: none;
    resize: none;
  }
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  cursor: pointer;
  width: 100%;
  @media (max-width: 420px) {
    width: 90%;
  }
`;

export const LinkInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 25px 25px;
  gap: 10px;
  width: 70%;
  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-wrap: anywhere;
  }
  .title {
    font-weight: 400;
    color: #cecece;
    font-size: 16px;
    line-height: 19px;
    height: 37px;
  }
  .desc {
    font-weight: 400;
    color: #9b9595;
    font-size: 11px;
    line-height: 13px;
    height: 39px;
  }
  .url {
    font-weight: 400;
    color: #cecece;
    font-size: 11px;
    line-height: 13px;
    height: 25px;
  }
  @media (max-width: 611px) {
    height: 100%;
    .title {
      font-size: 11px;
      line-height: 13px;
    }
    .desc {
      font-size: 9px;
      line-height: 11px;
    }
    .url {
      font-size: 9px;
      line-height: 11px;
    }
  }
`;

export const LinkImg = styled.img`
  width: 155px;
  height: 155px;
  object-fit: cover;
  border-radius: 0px 12px 13px 0px;
  @media (max-width: 420px) {
    width: 30%;
    height: 100%;
  }
`;

export const Hashtag = styled.span`
  font-weight: 900;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 38px;
  box-sizing: border-box;

  .container {
    width: 370px;
    height: 159px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: "Lato", sans-serif;
  }

  .text {
    font-size: 34px;
    font-weight: 700;
    text-align: center;
  }

  .button-container {
    width: 295px;
    height: fit-content;
    display: flex;
    justify-content: space-between;

    button {
      height: 37px;
      width: 137px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
    }

    .yes {
      background-color: #1877f2;
      color: #fff;
    }

    .no {
      background-color: #fff;
      color: #1877f2;
    }
  }
`;
