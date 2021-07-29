import client from "./client";
/**
 * Get All Tags
 * @returns
 */
export const getPosts = async (typeId?: number) => {
  const resp = await client.get("/posts");
  return resp.data;
};
