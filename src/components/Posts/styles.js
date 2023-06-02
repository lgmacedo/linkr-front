import styled from "styled-components";

export const ContainerPost = styled.div`
    width: 611px;
    min-height:276px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    margin-bottom: 10px;
    padding:5px 5px 10px;
    gap:5px;
    @media (max-width: 420px) {
     width:100%;
     min-height:232px;
     border-radius: 0;
  }
`

export const LeftSidePost = styled.div`
display:flex;
padding:20px 0 20px 20px;
img {
  width:50px;
  height:50px;
  border-radius: 27px;
  object-fit: cover;
}
@media (max-width: 420px) {
    img {
        width:40px;
        height:40px;
    }
  }
`

export const RightSidePost = styled.div`
    display:flex;
    flex-direction:column;
    padding:10px;
    gap:10px;
    p {
        font-family: 'Lato', sans-serif;
        font-weight:400;
    }
`

export const Name = styled.p`
    margin: 15px 0 0px 0;
    font-size:19px;
    line-height: 23px;
    color: #fff;
`

export const Description = styled.p`
    font-size:17px;
    line-height: 20px;
    color:#b7b7b7;
`

export const Link = styled.a`
    display:flex;
    align-items: center;
    width:100%;
    height:155px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    cursor:pointer;
    width: 100%;
    @media (max-width: 420px) {
     width:90%;
     height:115px;
  }
`;

export const LinkInfo = styled.div`
display: flex;
flex-direction: column;
padding:20px 0 25px 25px;
gap:10px;
p {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
}
.title {
    font-weight: 400;
    color:#cecece;
    font-size:16px;
    line-height: 19px;
}
.desc {
    font-weight: 400;
    color:#9B9595;
    font-size:11px;
    line-height: 13px;
}
.url {
    font-weight: 400;
    color:#CECECE;
    font-size:11px;
    line-height: 13px;
}
@media (max-width: 611px) {
    padding:8px;
    gap:5px;
    .title {
      font-size: 11px;
      line-height: 13px;
    }
    .desc {
      font-size: 9px;
      line-height: 11px;
    }
    .url {
      font-size: 9px;
      line-height: 11px;
    }
  }
`

export const LinkImg = styled.img`
    width:155px;
    height:155px;
    object-fit: cover;
    border-radius: 0px 12px 13px 0px;
    @media (max-width: 420px) {
     width:90px;
     height:115px;
  }
`