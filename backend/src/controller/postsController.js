const postService = require("../services/postsService");

const getAllPosts = async (req, res, next) => {
  try {
    const { type } = req.decoded;

    const allExternalPosts = await postService.getAllExternalPosts();

    if (type === "blogger") {
      const allPublicPosts = await postService.getAllPublicPosts();
      res.status(200).json({ allPublicPosts, allExternalPosts });
    } else if (type === "admin") {
      const allPosts = await postService.getAllPosts();
      res.status(200).json({ allPosts, allExternalPosts });
    } else {
      res.status();
    }
  } catch (error) {
    next(error);
  }
};

const getAllPostsByUser = async (req, res, next) => {
  try {
    const { user_id } = req.decoded;
    const allPostsUser = await postService.getAllPostsByUser(user_id);
    res.status(200).json(allPostsUser);
  } catch (error) {
    next(error);
  }
};

const createNewPost = async (req, res, next) => {
  try {
    const {
      body: { title, content, isHidden },
      decoded: { user_id },
    } = req;
    const newPost = { user_id, title, content, isHidden };
    const oldPost = await postService.getPostByTitle(title);

    if (oldPost) {
      return res.status(409).json({
        message: "Post Already Exist. Please create new post",
        oldPost,
      });
    }
    const createdPost = await postService.createNewPost(newPost);
    res
      .status(201)
      .json({ message: "Post has been created successfully !", createdPost });
  } catch (error) {
    next(error);
  }
};

const updateOnePost = async (req, res, next) => {
  try {
    const {
      decoded: { user_id, type },
      params: { post_id },
      body: { title, content, isHidden },
    } = req;
    const oldPost = await postService.getOnePost(post_id);
    const newPost = { title, content, isHidden };

    if (oldPost) {
      if (type === "blogger" && oldPost.user_id === user_id) {
        const updatedPostUser = await postService.updateOnePostByUser(
          newPost,
          post_id,
          user_id
        );
        res
          .status(200)
          .json({ message: "has been updated your post", updatedPostUser });
      } else if (type === "admin") {
        const updatedPost = await postService.updateOnePost(newPost, post_id);
        res
          .status(200)
          .json({ message: "has been updated user post", updatedPost });
      } else {
        res.status(403).json({ message: "you dont have right for that post" });
      }
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteOnePost = async (req, res, next) => {
  try {
    const {
      decoded: { user_id, type },
      params: { post_id },
    } = req;
    const foundPost = await postService.getOnePost(post_id);

    if (foundPost) {
      if (type === "blogger" && foundPost.user_id === user_id) {
        const deletedPostUser = await postService.deleteOnePostByUser(
          post_id,
          user_id
        );
        res
          .status(200)
          .json({ message: "has been deleted your post", deletedPostUser });
      } else if (type === "admin") {
        const deletedPost = await postService.deleteOnePost(post_id);
        res
          .status(200)
          .json({ message: "has been deleted user post", deletedPost });
      } else {
        res.status(403).json({ message: "you dont have right for that post" });
      }
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateOnePostStatus = async (req, res, next) => {
  try {
    const {
      decoded: { user_id },
      params: { post_id },
      body: { isHidden },
    } = req;

    const oldPost = await postService.getAllPostsByUser(user_id);

    if (oldPost[0].post_id.toString() === post_id) {
      const updatedPostStatus = await postService.updateOnePostByUser(
        { isHidden },
        post_id,
        user_id
      );
      res.status(200).json({
        message: "updated post status successfully",
        updatedPostStatus,
      });
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPostsByUser,
  getAllPosts,
  createNewPost,
  updateOnePost,
  updateOnePostStatus,
  deleteOnePost,
};
