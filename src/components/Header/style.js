import styled from "styled-components";

export const Container = styled.div`
  height: 100px;
  position: relative;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #151515;
  align-items: center;
  z-index: 1;
`;

export const Logo = styled.h1`
  color: #fff;
  font-family: "Passion One", cursive;
  font-size: 49px;
  letter-spacing: 0.05em;
  cursor: pointer;
  @media (max-width: 420px) {
    font-size: 45px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: white;
    cursor: pointer;
  }
  column-gap: 16.3px;
`;

export const ProfilePicture = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 27px;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 420px) {
    width: 41px;
    height: 41px;
  }
`;

export const Menu = styled.div`
  position: absolute;
  bottom: -47px;
  right: 0;
  width: 125px;
  height: 47px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 20.4px;
    letter-spacing: 0.05em;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
  }
  border-radius: 0px 0px 0px 20px;
  background-color: #171717;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: row;
  height: 45px;
  width: 563px;
  background-color: #ffffff;
  box-sizing: border-box;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 8px;
  input {
    width: 542px;
    height: 25px;
    border: none;
    outline: none;
    font-size: 19px;
    font-family: "Lato";
    color: #515151;
    ::placeholder {
      color: #c6c6c6;
      font-size: 19px;
      font-family: "Lato";
    }
  }
  ion-icon {
    font-size: 21px;
    color: #c6c6c6;
    cursor: pointer;
    :hover {
      color: #515151;
    }
  }
`;

export const Visible = styled.div`
  @media (max-width: 420px) {
    display: none;
  }
`;

export const Invisible = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  @media (min-width: 420px) {
    display: none;
  }
`;

export const InputResponsive = styled.div`
  display: flex;
  flex-direction: row;
  height: 45px;
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 8px;
  input {
    width: 100%;
    height: 25px;
    border: none;
    outline: none;
    font-size: 18px;
    font-family: "Lato";
    color: #515151;
    ::placeholder {
      color: #c6c6c6;
      font-size: 18px;
      font-family: "Lato";
    }
  }
  ion-icon {
    font-size: 20px;
    color: #c6c6c6;
    cursor: pointer;
    :hover {
      color: #515151;
    }
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: 59px;
  width: 563px;
  background-color: #E7E7E7;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  max-height: 200px;
  z-index: 2;
  @media (max-width: 420px) {
    width: 97.5%;
    top: 150px;
  }
`;

export const SearchResultItem = styled.div`
  padding: 8px 16px;
  color: #000;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  img{
    width: 39px;
    height: 39px;
    border-radius: 85px;
  }
  p{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  }
  &:hover {
    background-color: #f2f2f2;
  }
`;

export const Followed = styled.span`
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #c5c5c5;
  display: ${(props) => props.display};
`;