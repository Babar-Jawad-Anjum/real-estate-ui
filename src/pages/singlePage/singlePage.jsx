import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import "./singlePage.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";

const SinglePage = () => {
  const { post } = useLoaderData();
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(post.isSaved);

  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    setIsSaved((prev) => !prev);
    if (!currentUser) {
      return navigate("/login");
    }

    try {
      const data = await apiRequest.post("/users/save", { postId: post.id });
      toast.success(data.data.message);
    } catch (err) {
      console.log(err);
      setIsSaved((prev) => !prev);
    }
  };

  const createChat = async (receiverId) => {
    if (!currentUser) {
      return navigate("/login");
    }
    try {
      await apiRequest.post("/chats", { receiverId });
      navigate("/profile");
    } catch (err) {
      err.status === 400 ? navigate("/profile") : "";
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post?.user?.avatar || "/noavatar.png"} alt="" />
                <span>{post?.user?.username}</span>
              </div>
            </div>
            <h1 className="desc">Description</h1>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner"
                  ? " Owner is responsible"
                  : " Tenant is responsible"}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed"
                  ? " Pets allowed"
                  : " Pets not allowed"}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span> {post.postDetail.income}
              </div>
            </div>
          </div>
          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurants}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={() => createChat(post.user?.id)}>
              <img src="/chat.png" alt="" />
              <span>Send a Message</span>
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: isSaved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              <span>{isSaved ? "Saved Paced " : "Save the Place"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
