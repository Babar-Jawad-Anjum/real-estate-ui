import { useContext, useEffect, useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationsStore } from "../../store/notificationsStore";

const Navbar = () => {
  const [sideMenuOpened, setSideMenuOpened] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationsStore((state) => state.fetch);
  const number = useNotificationsStore((state) => state.number);

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]); // Only call fetch if currentUser changes

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>eEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="">About</Link>
        <Link to="">Agents</Link>
        <Link to="/list">Properties</Link>
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
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="signUp">
              Sign up
            </Link>
          </>
        )}
        <div
          className="menuIcon"
          onClick={() => setSideMenuOpened((prev) => !prev)}
        >
          <img src="/menu.png" alt="" />
        </div>
        {sideMenuOpened && (
          <div className={sideMenuOpened ? "sideMenu active" : "sideMenu"}>
            <Link onClick={() => setSideMenuOpened((prev) => !prev)} to="/">
              Home
            </Link>
            <Link onClick={() => setSideMenuOpened((prev) => !prev)} to="">
              About
            </Link>
            <Link onClick={() => setSideMenuOpened((prev) => !prev)} to="">
              Agents
            </Link>
            <Link onClick={() => setSideMenuOpened((prev) => !prev)} to="/list">
              Properties
            </Link>
            <Link
              onClick={() => setSideMenuOpened((prev) => !prev)}
              to="/profile"
            >
              Profile
            </Link>
            {!currentUser && (
              <>
                <Link
                  onClick={() => setSideMenuOpened((prev) => !prev)}
                  to="/login"
                >
                  Sign in
                </Link>
                <Link
                  onClick={() => setSideMenuOpened((prev) => !prev)}
                  to="/register"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
