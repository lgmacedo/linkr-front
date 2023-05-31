import styled from "styled-components";

export default function Header(){
    return (
        <ContainerHeader>
            <Logo>linkr</Logo>
            <ProfileContainer>
            <ProfilePicture src="https://s2.glbimg.com/4Ek8CnZSuYyyvaNQEPPiX_d-faA=/e.glbimg.com/og/ed/f/original/2017/11/24/gali1.jpg"></ProfilePicture>
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
`