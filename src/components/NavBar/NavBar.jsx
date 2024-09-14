import { useContext, useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationsStore } from "../../store/notificationsStore";

const Navbar = () => {
  const [sideMenuOpened, setSideMenuOpened] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationsStore((state) => state.fetch);
  const number = useNotificationsStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>eEstate</span>
        </a>
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser?.avatar || "/noavatar.png"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="signUp">
              Sign up
            </a>
          </>
        )}
        <div
          className="menuIcon"
          onClick={() => setSideMenuOpened((prev) => !prev)}
        >
          <img src="/menu.png" alt="" />
        </div>
        <div className={sideMenuOpened ? "sideMenu active" : "sideMenu"}>
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Agents</a>
          <a href="">Sign in</a>
          <a href="">Sign up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
