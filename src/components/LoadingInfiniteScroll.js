import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingInfiniteScroll() {
  return (
    <ContainerLoading>
      <TailSpin
        height="36"
        width="36"
        color="#6D6D6D"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>Loading more posts...</p>
    </ContainerLoading>
  );
}

const ContainerLoading = styled.div`
    margin: 20px 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:5px;
    p {
    color: #6d6d6d;
    font-size:22px;
    font-family: 'Lato';
    line-height: 26px;
    letter-spacing:0.05em;
    }
`