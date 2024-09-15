import Filter from "../../components/filter/Filter";
import "./listPage.scss";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/loader/Loader";

const ListPage = () => {
  const data = useLoaderData();
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<Loader />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading Posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.data.posts.length > 0 ? (
                  postResponse.data.data.posts.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                ) : (
                  <p style={{ fontSize: "13px", padding: "10px" }}>
                    No data found!
                  </p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<Loader />}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error Loading Posts!</p>}
          >
            {(postResponse) =>
              postResponse.data.data.posts.length > 0 ? (
                <Map items={postResponse.data.data.posts} />
              ) : (
                <p style={{ fontSize: "13px", padding: "20px" }}>
                  No data found!
                </p>
              )
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
