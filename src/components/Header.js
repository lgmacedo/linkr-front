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
    <ContainerHeader>
      <Logo>linkr</Logo>
      <ProfileContainer>
        {menuOpen ? (
          <SlArrowUp onClick={toggleMenu} />
        ) : (
          <SlArrowDown onClick={toggleMenu} />
        )}
        <ProfilePicture
          data-test="avatar"
          src={user.picture}
          onClick={toggleMenu}
          ref={profileRef}
        />
        {menuOpen && (
          <Menu data-test="menu" ref={menuRef}>
            <button data-test="logout" onClick={logout}>Logout</button>
          </Menu>
        )}
      </ProfileContainer>
    </ContainerHeader>
  );
}

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
`;

const Logo = styled.h1`
  color: #fff;
  font-family: "Passion One", cursive;
  font-size: 49px;
  letter-spacing: 0.05em;
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
