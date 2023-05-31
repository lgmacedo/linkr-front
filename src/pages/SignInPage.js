import axios from "axios";
import styled from "styled-components";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function SignInPage() {
  return <SignInContainer></SignInContainer>;
}

const SignInContainer = styled.div`
  display: flex;
`;
