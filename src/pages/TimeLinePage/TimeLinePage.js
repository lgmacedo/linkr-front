import axios from "axios";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
  ContainerButton,
  CreateButton,
  CreatePost,
  Description,
  LeftSide,
  NoPosts,
  RightSide,
  TimeLineContainer,
  Title,
  Link,
  TrendingContainer,
  Container,
} from "./styles";
import Trending from "../../components/Trending";
import { useNavigate } from "react-router-dom";
import ButtonMorePosts from "../../components/ButtonMorePosts";
import useInterval from "use-interval";

export default function TimeLinePage() {
  const { user } = useContext(UserContext);
  const [timeline, setTimeline] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ link: "", description: "" });
  const [loadingForm, setLoadingForm] = useState(false);
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/");
    } else {
      fetchInitialPosts();
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

  function fetchInitialPosts(){
    setLoading(true);
    getPosts();
    getTrending();
  }

  function getPosts() {
    api
    .get("/timeline", config)
    .then((res) => {
      setLoading(false);
      setTimeline(res.data);
      setNewPosts([]);
    })
    .catch((err) =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCreatePost(e) {
    setLoadingForm(true);
    e.preventDefault();

    const promise = api.post("/new-post", form, config);
    promise.then((res) => {
      getPosts();
      setForm({ link: "", description: "" });
      setLoadingForm(false);
    });
    promise.catch(() => {
      alert("There was an error publishing your link");
      setLoadingForm(false);
    });
  }

  function getTrending() {
    api
      .get("/trending", config)
      .then((res) => setTrending(res.data))
      .catch((err) =>
        alert("An error occurred while loading trending hashtags")
      );
  }

  useInterval(() => {
    refreshPosts();
  }, 15000);

  function refreshPosts() {
    api
      .get("/timeline", config)
      .then((res) => {
        const newPostsData = res.data;
        const filteredPosts = newPostsData.filter((post) => {
          return post.userId !== user.id && !timeline.some(({ id }) => id === post.id);
        });
  
        if (filteredPosts.length > 0) {
          setNewPosts(filteredPosts);
          setNewPostsCount(filteredPosts.length)
        }
      })
      .catch((err) =>
        alert("Error while getting new posts, please refresh the page")
      );
  }

  function handleButtonNewPost(){
    setTimeline(newPosts);
    setNewPosts([]);
    setNewPostsCount(0);
}


  return (
    <>
      <Header></Header>
      <Container>
        <TimeLineContainer>
          <Title>timeline</Title>
          <CreatePost data-test="publish-box">
            <LeftSide>
              <img src={user.picture} alt="profile" />
            </LeftSide>
            <RightSide>
              <p>What are you going to share today?</p>
              <form onSubmit={(e) => handleCreatePost(e)}>
                <Link
                  data-test="link"
                  required
                  placeholder="http://..."
                  type="text"
                  name="link"
                  value={form.link}
                  disabled={loadingForm}
                  onChange={(e) => handleChange(e)}
                />
                <Description
                  data-test="description"
                  placeholder="Awesome article about #javascript"
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={(e) => handleChange(e)}
                  disabled={loadingForm}
                />
                <ContainerButton>
                  <CreateButton
                    data-test="publish-btn"
                    type="Submit"
                    disabled={loadingForm}
                  >
                    {loadingForm ? "Publishing..." : "Publish"}
                  </CreateButton>
                </ContainerButton>
              </form>
            </RightSide>
          </CreatePost>
          { newPosts.length > 0 ? <ButtonMorePosts newPostsCount={newPostsCount} handleButtonNewPost={handleButtonNewPost} /> : "" }
          {loading ? (
            <NoPosts>Loading...</NoPosts>
          ) : timeline.length === 0 ? (
            <NoPosts data-test="message">There are no posts yet</NoPosts>
          ) : (
            timeline.map((post) => {
              return <Posts key={post.id} post={post} getPosts={getPosts} idPost={post.id}/>;
            })
          )}
        </TimeLineContainer>
        <Trending trending={trending} />
      </Container>
    </>
  );
}
