import {
  ContainerPost,
  PostMainContent,
  Description,
  LeftSidePost,
  Link,
  LinkImg,
  LinkInfo,
  Name,
  RightSidePost,
  Hashtag,
  StyledTooltip,
  ModalContainer,
  EditDescription,
  CommentsContainer,
  Comment,
  NewComment,
} from "./styles";
import { useContext, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import reactStringReplace from "react-string-replace";
import Modal from "react-modal";
import { AiOutlineComment } from "react-icons/ai";
import { BsSend } from "react-icons/bs";

export default function Posts({ post, getPosts, idPost }) {
  const {
    id,
    image,
    userId,
    username,
    likescount,
    likedBy,
    link,
    picture,
    title,
    description,
    desc,
    commentscount,
  } = post;
  const { user, setUserIdSearch } = useContext(UserContext);
  const [like, setLike] = useState("");
  const [color, setColor] = useState("");
  const [count, setCount] = useState(likescount);
  const [openModal, setOpenModal] = useState(false);
  const [modalConfirmText, setModalConfirmText] = useState("Yes, delete it");
  const [openEditInput, setOpenEditInput] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [commentsOpened, setCommentsOpened] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const editRef = useRef(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setNewComment(e.target.value);
  }

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      position: "fixed",
      zIndex: "2",
    },
    content: {
      height: "262px",
      width: "597px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#333333",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "0px",
    },
  };

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    const currentUserLiked =
      likedBy && likedBy.find((o) => o.name === user.username);

    if (currentUserLiked) {
      setColor("#AC0000");
      setLike("heart");
    } else if (likedBy && Array.isArray(likedBy)) {
      setColor("#FFFFFF");
      setLike("heart-outline");
    } else {
      setColor("#FFFFFF");
      setLike("heart-outline");
    }
  }, [likedBy, user.username]);

  useEffect(() => {
    if (openEditInput) {
      editRef.current.focus();
    }
  }, [openEditInput]);

  useEffect(() => {}, [newComment]);

  function likePost() {
    const postId = idPost;
    const ui = user.id;
    const body = { postId, ui };
    const promise = api.post("/like", body, config);
    promise
      .then((res) => {
        setCount(res.data);
        if (like === "heart-outline") {
          getPosts();
          setLike("heart");
          setColor("#AC0000");
        } else if (like === "heart") {
          getPosts();
          setLike("heart-outline");
          setColor("#FFFFFF");
        }
      })
      .catch((err) => alert(err.message));
  }

  function searchUserId(id) {
    const obj = { userId, username, picture };
    setUserIdSearch(obj);
    navigate(`/user/${id}`);
  }

  function deletePost() {
    setModalConfirmText("Loading...");
    setDisabled(true);

    api
      .delete(`/post/${idPost}`, config)
      .then((res) => {
        getPosts();
        setOpenModal(false);
        setModalConfirmText("Yes, delete it");
        setDisabled(false);
      })
      .catch((err) => {
        alert("An error occurred while trying to delete the post");
        setOpenModal(false);
        setModalConfirmText("Yes, delete it");
        setDisabled(false);
      });
  }

  function editPost() {
    setDisabled(true);

    if (descriptionEdit === description) return;

    setLoadingEdit(true);

    api
      .put(`/post/${idPost}`, { descriptionEdit }, config)
      .then((res) => {
        setOpenEditInput(false);
        getPosts();
        setLoadingEdit(false);
        setDisabled(false);
        setDescriptionEdit("");
      })
      .catch((err) => {
        alert("An error occurred while trying to edit the post");
        setOpenEditInput(true);
        setLoadingEdit(false);
        setDisabled(false);
      });
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpenEditInput(false);
      setDescriptionEdit("");
    }
    if (e.key === "Enter" && !e.shiftKey) {
      editPost();
    }
  }

  function openInput() {
    if (openEditInput) {
      setOpenEditInput(false);
      setDescriptionEdit(description);
      return;
    }

    setOpenEditInput(true);
  }

  function addNewComment() {
    if (newComment === "") return;
    const promise = api.post(
      "/new-comment",
      { postId: idPost, comment: newComment },
      config
    );
    promise.then((res) => {
      setNewComment("");
      getPosts();
      getComments();
    });
    promise.catch(
      "An error occurred while trying to comment. Please try again"
    );
  }

  function getComments() {
    const promise = api.get(`/post/${idPost}/comments`, config);
    promise.then((res) => {
      setComments(res.data);
    });
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        style={modalStyle}
        appElement={document.getElementById("root")}
      >
        <ModalContainer openModal={openModal}>
          <div className="container">
            <span className="text">
              Are you sure you want to delete this post?
            </span>
            <div className="button-container">
              <button
                onClick={() => setOpenModal(false)}
                className="no"
                disabled={disabled}
                data-test="cancel"
              >
                No, go back
              </button>
              <button
                className="yes"
                onClick={deletePost}
                disabled={disabled}
                data-test="confirm"
              >
                {modalConfirmText}
              </button>
            </div>
          </div>
        </ModalContainer>
      </Modal>

      <ContainerPost data-test="post">
        {user.id === userId && (
          <>
            <div
              className="delete"
              onClick={() => setOpenModal(true)}
              data-test="delete-btn"
            >
              <ion-icon name="trash" />
            </div>
            <div
              className="edit"
              onClick={disabled ? undefined : openInput}
              data-test="edit-btn"
            >
              <ion-icon name="pencil" />
            </div>
          </>
        )}
        <PostMainContent>
          <LeftSidePost>
            <img
              src={picture}
              alt="profile pic"
              onClick={() => searchUserId(userId)}
            />
            <ion-icon
              name={like}
              style={{ color: color }}
              onClick={likePost}
              data-test="like-btn"
            ></ion-icon>
            <p
              data-tooltip-content={
                likedBy &&
                (likedBy.length === 1
                  ? likedBy[0].name === user.username
                    ? "You liked"
                    : `${likedBy[0].name}`
                  : likedBy.length === 2
                  ? likedBy.some((obj) => obj.name === user.username)
                    ? `You and ${
                        likedBy.find((obj) => obj.name !== user.username)?.name
                      }`
                    : likedBy.map((obj) => obj.name).join(" and ")
                  : likedBy.some((obj) => obj.name === user.username)
                  ? `You, ${
                      likedBy.find((obj) => obj.name !== user.username)?.name
                    } and other ${likedBy.length - 2} people`
                  : `${likedBy[0].name}, ${likedBy[1].name} and other ${
                      likedBy.length - 2
                    } people`)
              }
              data-tooltip-id={`tooltip-${idPost}`}
              data-test="counter"
            >
              {count} likes
            </p>
            <AiOutlineComment
              data-test="comment-btn"
              onClick={() => {
                if(!commentsOpened){
                  getComments();
                }
                setCommentsOpened((prevState) => !prevState);
              }}
            />
            <p data-test="comment-counter">{commentscount} comments</p>
            <div data-test="tooltip">
              <StyledTooltip
                id={`tooltip-${idPost}`}
                place="bottom"
                effect="solid"
                data-test="tooltip"
              ></StyledTooltip>
            </div>
          </LeftSidePost>
          <RightSidePost>
            <Name data-test="username" onClick={() => searchUserId(userId)}>
              {username}
            </Name>
            {openEditInput ? (
              <EditDescription onSubmit={editPost}>
                <textarea
                  disabled={disabled}
                  ref={editRef}
                  type="text"
                  onKeyDown={handleKeyDown}
                  value={descriptionEdit}
                  onChange={(e) => setDescriptionEdit(e.target.value)}
                  data-test="edit-input"
                />
              </EditDescription>
            ) : loadingEdit ? (
              <Description data-test="description">Loading...</Description>
            ) : (
              <Description data-test="description">
                {reactStringReplace(description, /#(\w+)/g, (match, i) => (
                  <Hashtag
                    onClick={() =>
                      navigate(`/hashtag/${match.replace("#", "")}`)
                    }
                  >
                    #{match}
                  </Hashtag>
                ))}
              </Description>
            )}
            <Link data-test="link" href={link} target="_blank">
              <LinkInfo>
                <p className="title">{title}</p>
                <p className="desc">{desc}</p>
                <p className="url">{link}</p>
              </LinkInfo>
              <LinkImg src={image} alt={title} />
            </Link>
          </RightSidePost>
        </PostMainContent>
        <CommentsContainer data-test="comment-box" opened={commentsOpened}>
          {comments.map((c) => (
            <Comment data-test="comment">
              <img src={c.picture} />
              <div>
                <p>
                  {c.username}{" "}
                  <span>
                    {c.postAuthor
                      ? "• post's author"
                      : c.following
                      ? "• following"
                      : ""}
                  </span>
                </p>
                <p>{c.comment}</p>
              </div>
            </Comment>
          ))}
          <NewComment>
            <img src={user.picture} />
            <div>
              <input
                data-test="comment-input"
                required
                type="text"
                name="new-comment"
                value={newComment}
                placeholder="write a comment..."
                onChange={(e) => handleChange(e)}
              />
              <BsSend data-test="comment-submit" onClick={addNewComment} />
            </div>
          </NewComment>
        </CommentsContainer>
      </ContainerPost>
    </>
  );
}
