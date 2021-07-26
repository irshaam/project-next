import client from "./client";
/**
 * Get All Media
 * @returns
 */
export const getMedia = async () => {
  const resp = await client.get("/media");
  return resp.data;
};

/**
 * Get  Media by ID
 * @returns
 */
export const getMediaById = async (id: number) => {
  const resp = await client.get(`/media/${id}`);
  return resp.data;
};
