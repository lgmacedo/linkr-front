import axios from "axios";
import styled from "styled-components";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function SignUpPage() {
  return <SignUpContainer></SignUpContainer>;
}

const SignUpContainer = styled.div`
  display: flex;
`;
