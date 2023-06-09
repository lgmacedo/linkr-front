import axios from "axios";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  NoPosts,
  TimeLineContainer,
  Title,
  Box,
  Image,
  Container,
  Follow,
  Unfollow,
} from "./styles";
import Trending from "../../components/Trending";
import LoadingInfiniteScroll from "../../components/LoadingInfiniteScroll";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPage() {
  const { user, userIdSearch } = useContext(UserContext);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [follow, setFollow] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const { id } = useParams();
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
    getTrending();
    checkFollow();
  }, [userIdSearch]);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  function getPosts() {
    const promise = api.get(`/user/${id}`, config);
    promise.then((res) => {
      setLoading(false);
      setTimeline(res.data);
      setHasMorePosts(true);
    });
    promise.catch((err) =>
      console.log(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }

  function getTrending() {
    api
      .get("/trending", config)
      .then((res) => setTrending(res.data))
      .catch((err) =>
        console.log("An error occurred while loading trending hashtags")
      );
  }

  function checkFollow() {
    api
      .get(`/follows/${user.id}/${id}`, config)
      .then((res) => setFollow(res.data))
      .catch((err) =>
        console.log("An error occurred while trying to get followed users")
      );
  }

  function followAndUnfollow() {
    setDisabled(true);

    api
      .post(`/follows`, { userId: user.id, followedId: id }, config)
      .then((res) => {
        checkFollow();
        setDisabled(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(
          "An error occurred while trying to follow or unfollow a user"
        );
        setDisabled(false);
      });
  }

  function fetchOlderPosts() {
    const offset = page * 10;

    if (timeline?.length < 10) {
      setHasMorePosts(false);
      return;
    }

    api
      .get(`/user/${id}`, {
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
      <Header follow={follow}></Header>
      <Container>
        {user.id !== Number(id) &&
          loading === false &&
          (follow.length === 0 ? (
            <Follow
              onClick={followAndUnfollow}
              disabled={disabled}
              data-test="follow-btn"
            >
              Follow
            </Follow>
          ) : (
            <Unfollow
              onClick={followAndUnfollow}
              disabled={disabled}
              data-test="follow-btn"
            >
              Unfollow
            </Unfollow>
          ))}
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
            <InfiniteScroll
              pageStart={1}
              loadMore={fetchOlderPosts}
              hasMore={hasMorePosts}
              loader={<LoadingInfiniteScroll key="loading-infinite" />}
            >
              {timeline.map((post) => (
                <Posts
                  key={post.id}
                  post={post}
                  getPosts={getPosts}
                  idPost={post.id}
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
