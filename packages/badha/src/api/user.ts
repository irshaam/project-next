import client from "./client";
/**
 * Get All Users
 * @returns
 */
export const getUsers = async () => {
  const resp = await client.get("/users");
  return resp.data;
};

export const getUserByID = async (id: number) => {
  const resp = await client.get(`/users/${id}`);
  return resp.data;
};
