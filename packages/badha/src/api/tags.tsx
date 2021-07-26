import client from "./client";
/**
 * Get All Tags
 * @returns
 */
export const getTags = async () => {
  const resp = await client.get("/tags");
  return resp.data;
};
