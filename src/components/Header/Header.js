import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import {
  Container,
  ContainerHeader,
  Logo,
  ProfileContainer,
  ProfilePicture,
  Menu,
  Input,
  Visible,
  Invisible,
  InputResponsive,
  SearchResults,
  SearchResultItem,
} from "./style";

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
      const promise = api.post("/users", body, config);
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
    const promise = api.post("/log-out", {}, config);
    promise.then(() => {
      localStorage.clear();
      setUser({});
      navigate("/");
    });
    promise.catch(()=>alert("Error trying to log out. Please try again."));
  }

  function pageUser(id, username, picture) {
    const obj = { id, username, picture };
    setUserIdSearch(obj);
    navigate(`/user/${id}`);
  }

  return (
    <>
      <Container>
        <ContainerHeader>
          <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
          <Visible>
            <Input>
              <DebounceInput
                placeholder="Search for people"
                debounceTimeout={300}
                value={searchTerm}
                onChange={handleSearch}
                data-test="search"
              />
              <ion-icon name="search-sharp"></ion-icon>
            </Input>
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((result) => (
                  <SearchResultItem
                    key={result.id}
                    onClick={() =>
                      pageUser(result.id, result.username, result.picture)
                    }
                    data-test="user-search"
                  >
                    <img src={result.picture} />
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
              <SearchResultItem
                key={result.id}
                onClick={() =>
                  pageUser(result.id, result.username, result.picture)
                }
              >
                <img src={result.picture} />
                <p>{result.username}</p>
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
      </Invisible>
    </>
  );
}
