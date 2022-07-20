const Post = require("../models").posts;
const Op = require("sequelize").Op;
const axios = require("axios");
const logger = require("../../utils/logConfig");
const getAllPublicPosts = async () => {
  return await Post.findAll({ where: { isHidden: false } });
};

const getAllExternalPosts = async () => {
  return await axios
    .get("https://gorest.co.in/public/v2/posts", { timeout: 1000 })
    .then((res) => res.data)
    .catch((error) => {
      logger.error(error);
    });
};

const getAllPosts = async () => {
  return await Post.findAll();
};

const getAllPostsByUser = async (user_id) => {
  return await Post.findAll({ where: { user_id: user_id } });
};

const getOnePost = async (post_id) => {
  return await Post.findOne({ where: { post_id } });
};

const createNewPost = async (newPost) => {
  return await Post.create(newPost);
};

const getPostByTitle = async (title) => {
  return await Post.findOne({ where: { title } });
};

const updateOnePost = async (newPost, post_id) => {
  return await Post.update(newPost, { where: { post_id } });
};

const updateOnePostByUser = async (newPost, post_id, user_id) => {
  return await await Post.update(newPost, {
    where: { [Op.and]: [{ user_id }, { post_id }] },
  });
};

const deleteOnePost = async (post_id) => {
  return await Post.destroy({ where: { post_id: post_id } });
};

const deleteOnePostByUser = async (post_id, user_id) => {
  return await Post.destroy({
    where: { [Op.and]: [{ user_id }, { post_id }] },
  });
};

module.exports = {
  getAllPosts,
  getAllExternalPosts,
  getAllPostsByUser,
  getOnePost,
  createNewPost,
  updateOnePost,
  updateOnePostByUser,
  deleteOnePost,
  getPostByTitle,
  getAllPublicPosts,
  deleteOnePostByUser,
};
