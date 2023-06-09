import { FaRetweet } from 'react-icons/fa';
import styled from "styled-components";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function Repost({username}){
    const {user} = useContext(UserContext)

    return(
        <>
            <ContainerRepost>
                <FaRetweet className="custom-icon"/>
                <p>Re-posted by <span>{user.username === username? 'you' : username}</span> </p>
            </ContainerRepost>
        </>
    )
}

const ContainerRepost = styled.div`
display: flex;
flex-direction: row;
padding-left: 13px;
padding-top: 11px;
gap: 5px;
background-color: #1E1E1E;
width: 611px;
height: 50px;
border-top-left-radius: 16px;
border-top-right-radius: 16px;
font-family: "Lato";
font-weight: 400;
font-size: 11px;
line-height: 13px;
text-align: center;
margin-top: 5px;
margin-bottom: -15px;
color: #ffffff;
    span{
        font-weight: 700;
    }
    .custom-icon{
        font-size: 20px;
    }

`