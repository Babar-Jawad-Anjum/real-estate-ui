import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Card = ({ item, loadLatestData }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSave = async (postId) => {
    if (!currentUser) {
      return navigate("/login");
    }
    try {
      const data = await apiRequest.post("/users/save", { postId });
      toast.success(data.data.message);
      loadLatestData();
    } catch (err) {
      console.log(err);
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
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <div className="headline">
          <div className="titleSec">
            <h2 className="title">
              <Link to={`/${item.id}`}>{item.title}</Link>
            </h2>
            <p className="address">
              <img src="/pin.png" alt="" />
              <span>{item.address}</span>
            </p>
          </div>
          <div className="userDetails">
            <img src={item.user?.avatar || "/noavatar.png"} alt="" />
            <p>{item.user?.username}</p>
          </div>
        </div>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div
              className="icon"
              onClick={() => handleSave(item.id)}
              style={{
                backgroundColor: item.isSaved ? "#fece51" : "",
              }}
            >
              <img src="/save.png" alt="" />
            </div>
            <div className="icon" onClick={() => createChat(item.user?.id)}>
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
