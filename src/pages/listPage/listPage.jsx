import { Suspense } from "react";
import { Await, useFetcher, useLoaderData } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import Loader from "../../components/loader/Loader";
import "./listPage.scss";

const ListPage = () => {
  const data = useLoaderData();
  const fetcher = useFetcher();

  // Function to load the latest data
  const loadLatestData = () => {
    fetcher.load("/list");
  };

  // Use the updated data from fetcher if available, else use the original loader data
  const postsData = fetcher.data?.postResponse || data.postResponse;

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<Loader />}>
            <Await
              resolve={postsData}
              errorElement={<p>Error Loading Posts! Refresh the page once.</p>}
            >
              {(postResponse) =>
                postResponse.data.data.posts.length > 0 ? (
                  postResponse.data.data.posts.map((post) => (
                    <Card
                      key={post.id}
                      item={post}
                      loadLatestData={loadLatestData} // Pass function to reload data
                    />
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
            resolve={postsData}
            errorElement={<p>Error Loading Posts! Refresh the page once.</p>}
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
