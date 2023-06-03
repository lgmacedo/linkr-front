import styled from "styled-components";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export default function Header() {
  const {user, setUser} = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  function logout() {
    localStorage.clear();
    setUser({});
    navigate("/");
  }

  return (
    <><Container>
      <ContainerHeader>
        <Logo>linkr</Logo>
        <Visible>
          <Input>
              <input placeholder="Search for people" />
              <ion-icon name="search-sharp"></ion-icon>
          </Input>
        </Visible>
        <ProfileContainer>
          {menuOpen ? (
            <SlArrowUp onClick={toggleMenu} />
          ) : (
            <SlArrowDown onClick={toggleMenu} />
          )}
          <ProfilePicture
            src={user.picture}
            onClick={toggleMenu}
            ref={profileRef} />
          {menuOpen && (
            <Menu ref={menuRef}>
              <button onClick={logout}>Logout</button>
            </Menu>
          )}
        </ProfileContainer>
      </ContainerHeader>
    </Container><Invisible>
        <InputResponsive>
          <input placeholder="Search for people" />
          <ion-icon name="search-sharp"></ion-icon>
        </InputResponsive>
      </Invisible></>
  );
}

const Container = styled.div`
    height: 100px;
    position: relative;
`

const ContainerHeader = styled.div`
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



const Logo = styled.h1`
color: #fff;
    font-family: 'Passion One', cursive;
    font-size:49px;
    letter-spacing: 0.05em;
    @media (max-width: 420px) {
        font-size: 45px;
    }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: white;
    cursor: pointer;
  }
  column-gap: 16.3px;
`;

const ProfilePicture = styled.img`
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

const Menu = styled.div`
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

const Input = styled.div`
    display: flex;
    flex-direction: row;
    height: 45px;
    width: 563px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    align-items: center;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 8px;
    input{
        width: 542px;
        height: 25px;
        border: none;
        outline: none;
        font-size: 19px;
        font-family: 'Lato';
        color: #515151;
;
        ::placeholder{
            color: #C6C6C6;
            font-size: 19px;
            font-family: 'Lato';
        }
    }
    ion-icon{
        font-size: 21px;
        color: #C6C6C6;
        cursor: pointer;
        :hover{
            color: #515151;
        }
    }
`

const Visible = styled.div`
    @media (max-width: 420px) {
        display: none;
    }
`
const Invisible = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    @media (min-width: 420px) {
        display: none;
    }
`;


const InputResponsive = styled.div`
    display: flex;
    flex-direction: row;
    height: 45px;
    width: 350px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 8px;
    input{
        width: 300px;
        height: 25px;
        border: none;
        outline: none;
        font-size: 18px;
        font-family: 'Lato';
        color: #515151;
;
        ::placeholder{
            color: #C6C6C6;
            font-size: 18px;
            font-family: 'Lato';
        }
    }
    ion-icon{
        font-size: 20px;
        color: #C6C6C6;
        cursor: pointer;
        :hover{
            color: #515151;
        }
    }
`
