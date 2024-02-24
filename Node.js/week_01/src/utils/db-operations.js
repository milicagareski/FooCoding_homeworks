import fs from "fs";

/**
 *
 * @param {Object[]} data
 * @returns {Object[]} result
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
    return JSON.parse(result);
  } catch (error) {
    return [];
  }
};

/**
 *
 * @param {Object[]} data
 * @returns {Object[]} result
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
    return JSON.parse(result);
  } catch (error) {
    return [];
  }
};
