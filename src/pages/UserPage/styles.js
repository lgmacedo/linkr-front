import styled from "styled-components";


export const TimeLineContainer = styled.div`
margin-top:150px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
gap:20px;
@media (max-width: 420px) {
  margin-top:100px;
}
`;

export const Box = styled.div`
    display: flex;
    flex-direction: row;
    width: 550px;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
`
export const Image = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 27px;
    background-color: white;
    img{
        width: 50px;
        height: 50px;
        border-radius: 27px;
        object-fit: cover;
    }
`

export const Title = styled.div`
display: flex;
width:611px;
justify-content: left;
text-align: left;
font-size: 43px;
line-height: 64px;
color:#fff;
font-family: 'Oswald', sans-serif;
margin-bottom:30px;
@media (max-width: 420px) {
 width:88%; 
 margin-bottom:0;
}
`;

export const NoPosts = styled.h3`
text-align: center;
font-family: 'Oswald', sans-serif;
font-size:24px;
line-height: 36px;
font-weight: 400;
color:#fff;
`