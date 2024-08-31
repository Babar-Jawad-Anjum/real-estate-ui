import SearchBar from "../../components/SearchBar/SearchBar";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h2 className="title">Find Real Estate & Get Your Dream Place</h2>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quas
            magni eos qui temporibus a repellat assumenda, voluptatum nemo
            accusamus ratione beatae natus
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
