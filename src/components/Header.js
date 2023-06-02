import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header(){
    const { user } = useContext(UserContext);

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
                    <ProfilePicture src={user.picture}></ProfilePicture>
                </ProfileContainer>
            </ContainerHeader>
        </Container>
        <Invisible>
            <InputResponsive>
                <input placeholder="Search for people" />
                <ion-icon name="search-sharp"></ion-icon>
            </InputResponsive>
        </Invisible></>
    )
}

const Container = styled.div`
    height: 100px;
    position: relative;
`
const ProfileContainer = styled.div``

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

const ProfilePicture = styled.img`
    width:53px;
    height:53px;
    border-radius: 27px;
    @media (max-width: 420px) {
        width: 41px;
        height: 41px;
    }
`
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