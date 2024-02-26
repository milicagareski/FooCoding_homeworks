import fs from "fs";

/**
 *
 * @param {Object[]} data
 */
export const saveUsers = (data) => {
  try {
    fs.writeFileSync("./data/users.json", JSON.stringify(data, null, 4));
  } catch (error) {
    throw new Error("Users failed to save");
  }
};

/**
 *
 * @returns {Object[]} result
 */
export const getUsers = () => {
  try {
    const result = fs.readFileSync("./data/users.json");
    return JSON.parse(result.filter((u) => !u.deleted));
  } catch (error) {
    return [];
  }
};

/**
 *
 * @param {Object[]} data
 */
export const savePosts = (data) => {
  try {
    fs.writeFileSync("./data/posts.json", JSON.stringify(data, null, 4));
  } catch (error) {
    throw new Error("Posts failed to save");
  }
};

/**
 *
 * @returns {Object[]} result
 */
export const getPosts = () => {
  try {
    const result = fs.readFileSync("./data/posts.json");
    return JSON.parse(result.filter((p) => !p.deleted));
  } catch (error) {
    return [];
  }
};
