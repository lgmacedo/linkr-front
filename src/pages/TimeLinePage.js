import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import Posts from "../components/Posts";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  
  export default function TimeLinePage() {
    return (
      <>
      <Header></Header>
    <TimeLineContainer>
      <Title>timeline</Title>
      <CreatePost>
        <LeftSide>
          <img src="https://s2.glbimg.com/4Ek8CnZSuYyyvaNQEPPiX_d-faA=/e.glbimg.com/og/ed/f/original/2017/11/24/gali1.jpg" alt="profile" />
        </LeftSide>
        <RightSide>
          <p>What are you going to share today?</p>
          <Link placeholder="http://..."/>
          <Description placeholder="Awesome article about #javascript"/>
          <ContainerButton>
          <CreateButton>Publish</CreateButton>
          </ContainerButton>
        </RightSide>
      </CreatePost>
      <Posts/>
      <Posts/>
      <Posts/>
    </TimeLineContainer>
    </>
    )
  }
  
  const TimeLineContainer = styled.div`
    margin-top:150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap:20px;
    @media (max-width: 420px) {
      margin-top:100px;
  }
  `;
  
  const Title = styled.div`
    display: flex;
    width:611px;
    justify-content: left;
    text-align: left;
    font-size: 43px;
    line-height: 64px;
    color:#fff;
    font-family: 'Oswald', sans-serif;
    margin-bottom:30px;
    @media (max-width: 420px) {
     width:88%; 
     margin-bottom:0;
    }
  `;

  const CreatePost = styled.div`
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
    }
  `;

  const LeftSide = styled.div`
  display:flex;
  padding:20px 0 20px 20px;
  img {
    width:53px;
    height:53px;
    border-radius: 27px;
  }
  @media (max-width: 420px) {
    display: none;
    }
  `

  const RightSide = styled.div`
    display:flex;
    flex-direction:column;
    padding:10px;
    gap:5px;
    p {
      font-size:20px;
      line-height: 24px;
      color: #707070;
      font-family: 'Lato', sans-serif;
      font-weight:300;
      margin: 13px 0 10px 0;
    }
    @media (max-width: 420px){
     width:80%;
    }
  `

  const Link = styled.input`
  width:503px;
  height:30px;
  border: none;
  background-color: #EFEFEF;
  border-radius:5px;
  font-family: 'Lato', sans-serif;
  font-size:15px;
  font-weight:300;
  @media (max-width: 420px) {
     width:100%; 
    }
  `

  const Description = styled.textarea`
  width:503px;
  height:66px;
  border: none;
  background-color: #EFEFEF;
  border-radius:5px;
  resize:none;
  font-family: 'Lato', sans-serif;
  font-size:15px;
  font-weight:300;
  @media (max-width: 420px) {
     width:100%; 
    }
  `

  const ContainerButton = styled.div`
  display:flex;
  justify-content: flex-end;
  @media (max-width: 420px) {
     width:100%; 
    }
  `

  const CreateButton = styled.button`
  cursor: pointer;
  width:112px;
  height:31px;
  background-color: #1877F2;
  border-radius: 5px;
  border: none;
  color:#fff;
  font-family: 'Lato', sans-serif;
  font-size:14px;
  font-weight: 700;
  `;