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
import InfiniteScroll from "react-infinite-scroller";
import LoadingInfiniteScroll from "../../components/LoadingInfiniteScroll";

export default function HashtagPage() {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
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
        setLoading(false);
        setTimeline(res.data);
        console.log(res.data);
          setHasMorePosts(true);
      })
      .catch((err) =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        )
      );
  }

  function fetchOlderPosts() {
    console.log('ola');
    const offset = page * 10;

    if (timeline?.length < 10) {
      setHasMorePosts(false);
      return;
    }

    api
      .get(`/hashtag/${params.hashtag}`, {
        headers: config.headers,
        params: { offset: offset },
      })
      .then((res) => {
        const newPostsData = res.data;

        if (newPostsData.length === 0) {
          setHasMorePosts(false);
          return;
        }

        setTimeline((prevPosts) => [...prevPosts, ...newPostsData]);
        setPage((prevPage) => prevPage + 1);
        setHasMorePosts(true);
      })
      .catch((err) => {
        console.log("Error while fetching posts. Please refresh the page.");
      });
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
            <InfiniteScroll
              pageStart={1}
              loadMore={fetchOlderPosts}
              hasMore={hasMorePosts}
              loader={
              <LoadingInfiniteScroll key="loading-infinite" />
              }
            >
              {timeline.map((post) => (
                <Posts
                  key={post.postId}
                  post={post}
                  getPosts={getPostsByHashtag}
                  idPost={post.postId}
                />
              ))}
            </InfiniteScroll>
          )}
        </TimeLineContainer>
        <Trending trending={trending} />
      </Container>
    </>
  );
}
