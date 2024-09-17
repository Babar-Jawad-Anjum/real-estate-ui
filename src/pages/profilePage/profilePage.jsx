import Chat from "../../components/chat/chat";
import List from "../../components/list/list";
import "./profilePage.scss";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";

const ProfilePage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    updateUser(null);
    navigate("/");
  };


  

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser?.avatar || "/noavatar.png"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<Loader />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading Posts! Refresh the page once.</p>}
            >
              {(postResponse) =>
                postResponse.data.data.userPosts.length > 0 ? (
                  <List posts={postResponse.data.data.userPosts} />
                ) : (
                  <p style={{ fontSize: "13px" }}>No data found!</p>
                )
              }
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<Loader />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading Posts! Refresh the page once.</p>}
            >
              {(postResponse) =>
                postResponse.data.data.savedPosts.length > 0 ? (
                  <List posts={postResponse.data.data.savedPosts} />
                ) : (
                  <p style={{ fontSize: "13px" }}>No data found!</p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<Loader />}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) =>
                chatResponse.data.data.chats.length > 0 ? (
                  <Chat chats={chatResponse.data.data.chats} />
                ) : (
                  <p style={{ fontSize: "13px" }}>No data found!</p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
