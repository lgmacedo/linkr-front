import {
  NoPosts,
  TimeLineContainer,
  Title,
  TrendingContainer,
  Container,
} from "./styles";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Trending from "../../components/Trending";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export default function HashtagPage() {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
  }, []);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    setLoading(true);
    getPostsByHashtag();
    getTrending();
  }, [params.hashtag]);

  function getTrending() {
    api
      .get("/trending", config)
      .then((res) => setTrending(res.data))
      .catch((err) =>
        alert("An error occurred while loading trending hashtags")
      );
  }

  function getPostsByHashtag() {
    api
      .get(`/hashtag/${params.hashtag}`, config)
      .then((res) => {
        setTimeline(res.data);
        setLoading(false);
      })
      .catch((err) => alert("An error occurred while loading posts"));
  }

  return (
    <>
      <Header></Header>
      <Container>
        <TimeLineContainer>
          <Title data-test="hashtag-title"># {params.hashtag}</Title>
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
        <Trending trending={trending} />
      </Container>
    </>
  );
}
