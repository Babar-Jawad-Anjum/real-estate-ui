import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-toastify";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const handleSave = async (postId) => {
    try {
      const data = await apiRequest.post("/users/save", { postId });
      toast.success(data.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const createChat = async (receiverId) => {
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
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
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
