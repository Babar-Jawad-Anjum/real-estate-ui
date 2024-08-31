import { useState } from "react";
import "./NavBar.scss";

const Navbar = () => {
  const [sideMenuOpened, setSideMenuOpened] = useState(false);

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
        <a href="">Sign in</a>
        <a href="" className="signUp">
          Sign up
        </a>
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
