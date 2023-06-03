import styled from "styled-components";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

export default function Header() {
  const { user, setUser, setUserIdSearch } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  function handleSearch(event) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.length >= 3) {
      const body = { username: searchTerm };
      const promise = api.post("/users", body, config)
      promise
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setSearchResults([]);
    }
  }

  function logout() {
    localStorage.clear();
    setUser({});
    navigate("/");
  }

  function pageUser(id, username, picture){
    const obj = { id, username, picture };
    setUserIdSearch(obj)
    navigate(`/user/${id}`)
  }

  return (
    <>
      <Container>
        <ContainerHeader>
          <Logo>linkr</Logo>
          <Visible>
            <Input>
              <DebounceInput
                placeholder="Search for people"
                debounceTimeout={300}
                value={searchTerm}
                onChange={handleSearch}
              />
              <ion-icon name="search-sharp"></ion-icon>
            </Input>
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((result) => (
                  <SearchResultItem key={result.id} onClick={()=>pageUser(result.id, result.username, result.picture)}>
                    <img src={result.picture}/>
                    <p>{result.username}</p>
                  </SearchResultItem>
                ))}
              </SearchResults>
            )}
          </Visible>
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
                <button data-test="logout" onClick={logout}>
                  Logout
                </button>
              </Menu>
            )}
          </ProfileContainer>
        </ContainerHeader>
      </Container>
      <Invisible>
        <InputResponsive>
          <DebounceInput
            placeholder="Search for people"
            debounceTimeout={300}
            value={searchTerm}
            onChange={handleSearch}
          />
          <ion-icon name="search-sharp"></ion-icon>
        </InputResponsive>
        {searchResults.length > 0 && (
          <SearchResults>
            {searchResults.map((result) => (
              <SearchResultItem key={result.id} onClick={()=>pageUser(result.id, result.username, result.picture)}>
                <img src={result.picture}/>
                <p>{result.username}</p>
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
      </Invisible>
    </>
  );
}

const Container = styled.div`
  height: 100px;
  position: relative;
`;

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
  font-family: "Passion One", cursive;
  font-size: 49px;
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

const Visible = styled.div`
  @media (max-width: 420px) {
    display: none;
  }
`;

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
  background-color: #ffffff;
  box-sizing: border-box;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 8px;
  input {
    width: 300px;
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

const SearchResults = styled.div`
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
    width: 350px;
    top: 145px;
  }
`;

const SearchResultItem = styled.div`
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
