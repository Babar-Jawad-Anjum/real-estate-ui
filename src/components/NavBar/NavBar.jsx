import { useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sideMenuOpened, setSideMenuOpened] = useState(false);

  const user = true;

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
        {user ? (
          <div className="user">
            <img
              src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              alt=""
            />
            <span>John Doe</span>
            <Link to="/profile" className="profile">
              <div className="notification">2</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="">Sign in</a>
            <a href="" className="signUp">
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
