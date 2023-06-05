import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SignInPage() {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    picture: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/timeline");
    }
  }, []);

  const [buttonEnabled, setButtonEnabled] = useState(true);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function signup(e) {
    e.preventDefault();
    if (!form.email || !form.password || !form.username || !form.picture)
      return alert("All fields must be filled in");
    setButtonEnabled(false);
    const promise = api.post("/sign-up", form);
    promise.then(signUpSuccess);
    promise.catch(signUpFailed);
  }

  function signUpSuccess(res) {
    navigate("/");
  }

  function signUpFailed(err) {
    setButtonEnabled(true);
    alert(err.response.data);
  }

  return (
    <SignUpPageContainer>
      <HomeCover>
        <h1>linkr</h1>
        <p>save, share and discover the best links on the web</p>
      </HomeCover>
      <SignUpContainer buttonEnabled={buttonEnabled}>
        <form onSubmit={signup}>
          <input
            data-test="email"
            placeholder="e-mail"
            type="text"
            name="email"
            value={form.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            data-test="password"
            placeholder="password"
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => handleChange(e)}
          />
          <input
            data-test="username"
            placeholder="username"
            type="text"
            name="username"
            value={form.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            data-test="picture-url"
            placeholder="picture url"
            type="text"
            name="picture"
            value={form.picture}
            onChange={(e) => handleChange(e)}
          />
          <button data-test="sign-up-btn" disabled={buttonEnabled ? false : true} type="Submit">
            Sign Up
          </button>
        </form>
        <Link data-test="login-link" to="/">Switch back to log in</Link>
      </SignUpContainer>
    </SignUpPageContainer>
  );
}

const SignUpPageContainer = styled.div`
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const HomeCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 62.85vw;
  height: 100vh;
  background-color: #151515;
  padding-top: 301px;
  padding-left: 144px;
  h1 {
    color: white;
    font-family: "Passion One", cursive;
    font-size: 106px;
    margin-right: 528px;
    max-width: 233px;
    max-height: 117px;
    line-height: 117px;
    letter-spacing: 0.05em;
  }
  p {
    color: white;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    margin-right: 319px;
    max-width: 450px;
    max-height: 128px;
    line-height: 64px;
  }
  @media (max-width: 1300px) {
    width: 50vw;
    padding-top: 0px;
    padding-left: 72px;
    justify-content: center;
    h1 {
      font-size: 53px;
      margin-right: 264px;
    }
    p {
      font-size: 21.5px;
      margin-right: 160px;
      line-height: 32px;
    }
  }
  @media (max-width: 900px) {
    width: 100vw;
    height: 26.24vh;
    padding-top: 0px;
    padding-left: 0px;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 76px;
      margin-right: 0px;
      line-height: 84px;
    }
    p {
      font-size: 23px;
      margin-right: 0px;
      line-height: 34px;
      text-align: center;
      max-width: 237px;
    }
  }
  @media (max-width: 350px) {
    width: 100vw;
    height: 26.24vh;
    padding-top: 0px;
    padding-left: 0px;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 50px;
      margin-right: 0px;
      line-height: 34px;
    }
    p {
      font-size: 18px;
      margin-right: 0px;
      line-height: 20px;
      text-align: center;
      max-width: 237px;
    }
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  width: 37.15vw;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  row-gap: 22px;
  padding-top: 274px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 13px;
    input,
    button {
      font-family: "Oswald", sans-serif;
      font-size: 27px;
      line-height: 40px;
      width: 429px;
      height: 65px;
      border-radius: 6px;
      border: none;
    }
    input {
      padding-left: 17px;
    }
    button {
      cursor: ${({ buttonEnabled }) => (buttonEnabled ? "pointer" : "")};
      color: #ffffff;
      background-color: #1877f2;
    }
  }
  a {
    font-family: "Lato", sans-serif;
    color: white;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
  }
  @media (max-width: 1300px) {
    width: 50vw;
    padding-top: 0px;
    justify-content: center;
  }
  @media (max-width: 900px) {
    width: 100vw;
    height: 73.76vh;
    justify-content: flex-start;
    form {
      margin-top: 40px;
      row-gap: 11px;
      input,
      button {
        font-size: 22px;
        line-height: 33px;
        width: 330px;
        height: 55px;
      }
    }
    a {
      font-size: 17px;
    }
  }
  @media (max-width: 350px) {
    width: 100vw;
    height: 73.76vh;
    justify-content: flex-start;
    form {
      margin-top: 40px;
      row-gap: 11px;
      input,
      button {
        font-size: 15px;
        line-height: 33px;
        width: 300px;
        height: 45px;
      }
    }
    a {
      font-size: 13px;
    }
  }
`;
