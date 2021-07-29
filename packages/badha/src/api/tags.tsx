import client from "./client";
/**
 * Get All Tags
 * @returns
 */
export const getTags = async (typeId?: number) => {
  const resp = await client.get("/tags");
  return resp.data;
};

export const getTagTypes = async () => {
  const resp = await client.get("/tag-types");
  return resp.data;
};
