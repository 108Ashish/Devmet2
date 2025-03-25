const { Router } = require( 'express');
const userController = require( "../controllers/user.js")

const router = Router();

router.post('/comment-post', userController.commentOnPost)
router.post('/likeUnlike-post', userController.likeUnlikePost)
router.post('/create-post', userController.createPost)
router.post('/followUnfolow-user', userController.followUnfollowUser)
router.post('/get-others-profile', userController.getOtherProfile)

module.exports = router;