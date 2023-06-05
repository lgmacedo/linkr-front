import axios from "axios";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { NoPosts, TimeLineContainer, Title, Box, Image } from "./styles";

export default function UserPage() {
  const { user, userIdSearch } = useContext(UserContext);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
  }, []);


  useEffect(() => {
    setLoading(true);
    getPosts();
  }, []);


  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  function getPosts() {
    const promise = api.get(`/user/${id}`, config);
    promise.then((res) => {
      console.log("resposta api", res.data)
      setLoading(false);
      setTimeline(res.data);
    });
    promise.catch((err) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }

  return (
    <>
      <Header></Header>
      <TimeLineContainer>
        <Box>
          <Image>
            <img src={userIdSearch.picture} alt="profile" />
          </Image>
          <Title>{userIdSearch.username}'s posts</Title>
        </Box>
        {loading ? (
          <NoPosts>Loading...</NoPosts>
        ) : timeline.length === 0 ? (
          <NoPosts data-test="message">There are no posts yet</NoPosts>
        ) : (
          timeline.map((post) => {
            return <Posts key={post.id} post={post} />;
          })
        )}
      </TimeLineContainer>
    </>
  );
}
