import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest.get("/posts/" + params.id);
  return res.data.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest.get("/posts?" + query);
  // return res.data.data;
  return defer({
    postResponse: postPromise,
  });
};
export const profilePageLoader = async () => {
  const postPromise = apiRequest.get("/users/profilePosts");
  return defer({
    postResponse: postPromise,
  });
};