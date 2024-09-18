import "./list.scss";
import Card from "../card/Card";

const List = ({ posts, loadLatestData }) => {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} loadLatestData={loadLatestData} />
      ))}
    </div>
  );
};

export default List;
