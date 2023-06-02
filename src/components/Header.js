import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header(){
    const { user } = useContext(UserContext);

    return (
        <ContainerHeader>
            <Logo>linkr</Logo>
            <ProfileContainer>
            <ProfilePicture src={user.picture}></ProfilePicture>
            </ProfileContainer>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    width:100%;
    height:72px;
    position:fixed;
    top:0;
    left:0;
    background-color: #151515;
`;

const Logo = styled.h1`
    color: #fff;
    font-family: 'Passion One', cursive;
    font-size:49px;
    letter-spacing: 0.05em;
`;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ProfilePicture = styled.img`
    width:53px;
    height:53px;
    border-radius: 27px;
    object-fit: cover;
`