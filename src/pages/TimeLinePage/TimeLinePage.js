import axios from "axios";
import Header from "../../components/Header";
import Posts from "../../components/Posts";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { ContainerButton, CreateButton, CreatePost, Description, LeftSide, NoPosts, RightSide, TimeLineContainer, Title, Link } from "./styles";
  
  export default function TimeLinePage() {
    const [user, setUser] = useContext(UserContext);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({link: "", description: ""});
    const [loadingForm, setLoadingForm] = useState(false);
    const navigate = useNavigate();

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    useEffect(() => {
      setLoading(true);

      const userToken = localStorage.getItem("user");
      if (userToken === null){
        navigate("/");
      } else {
        setUser(JSON.parse(userToken));
        getPosts();
      }
    }, [])

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    function getPosts(){
      const promise = api.get("/timeline", config);
      promise.then((res) => {
      setLoading(false);
      setTimeline(res.data);
    })
    promise.catch(err => alert("An error occured while trying to fetch the posts, please refresh the page"));
    }

    function handleChange(e){
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleCreatePost(e){
      e.preventDefault();
      setLoadingForm(true);

      const promise = api.post("/new-post", form, config)
      promise.then(res => {
        getPosts();
        setLoadingForm(false);
        setForm({link:"", description:""});
      })
      promise.catch(() => {
        alert("An error occurred while publishing your link");
        setLoadingForm(false);
      })
    }

    return (
      <>
      <Header></Header>
    <TimeLineContainer>
      <Title>timeline</Title>
      <CreatePost>
        <LeftSide>
          <img src={user.picture} alt="profile" />
        </LeftSide>
        <RightSide>
          <p>What are you going to share today?</p>
          <form onSubmit={handleCreatePost}>
          <Link
          required
          placeholder="http://..."
          type="text"
          name="link"
          value={form.link}
          onChange={(e) => handleChange(e)}
          disabled={loadingForm}
          />
          <Description
          placeholder="Awesome article about #javascript"
          type="text"
          name="description"
          value={form.description}
          onChange={(e) => handleChange(e)}
          disabled={loadingForm}
          />
          <ContainerButton>
          <CreateButton type="Submit" disabled={loadingForm}>Publish</CreateButton>
          </ContainerButton>
          </form>
        </RightSide>
      </CreatePost>
      { loading ? <NoPosts>Loading...</NoPosts> :
      timeline.length === 0 ? <NoPosts data-test="message">There are no posts yet</NoPosts> :
      (
      timeline.map((post) => {return <Posts key={post.id} post={post}/>}))}
    </TimeLineContainer>
    </>
    )
  }