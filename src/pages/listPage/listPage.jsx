import Filter from "../../components/filter/Filter";
import "./listPage.scss";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const ListPage = () => {
  const data = useLoaderData();
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading Posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.data.posts.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
          {/* {data.posts.map((item) => (
            <Card key={item.id} item={item} />
          ))} */}
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error Loading Posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data.data.posts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};
 
export default ListPage;
