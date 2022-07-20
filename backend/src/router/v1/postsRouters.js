const postRouter = require("express").Router();
const postController = require("../../controller/postsController");
const { tokenValidation } = require("../../middleware/security");
const { validatePost } = require("../../middleware/validation");


//bloggers can create posts
postRouter.post("/", tokenValidation, validatePost, postController.createNewPost);

//bloggers can see their posts whether they're public or hidden
postRouter.get("/user", tokenValidation, postController.getAllPostsByUser);

//bloggers can see posts of other bloggers as long as they're public
postRouter.get("/", tokenValidation, postController.getAllPosts);

//bloggers can remove their posts && admins can remove any public post
postRouter.delete("/:post_id", tokenValidation, postController.deleteOnePost);

//bloggers can update their posts && (note) - optional admins can update any public post
postRouter.patch("/:post_id",tokenValidation, validatePost, postController.updateOnePost);

//bloggers can publish and hide their posts
postRouter.put("/status/:post_id", tokenValidation, postController.updateOnePostStatus);

module.exports = postRouter;