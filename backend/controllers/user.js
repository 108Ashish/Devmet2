const { PrismaClient } = require('@prisma/client');

const pclient = new PrismaClient();

const commentOnPost = async (req, res) => {
    const { postId, userId, content } = req.body;

    try {
        const user = await pclient.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verify post exists
        const post = await pclient.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = await pclient.comment.create({
            data: {
                content,
                postId,
                userId,
            }
        });

        res.status(201).json({ comment });
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllUserIds = async (req, res) => {
    try {
        const users = await pclient.user.findMany({
            select: {
                id: true
            }
        });

        res.status(200).json({ userIds: users.map(user => user.id) });
    } catch (error) {
        console.error('Error in getAllUserIds:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const likeUnlikePost = async(req, res)=> {
    try {
        const { postId, userId } = req.body;

        const likePost = await pclient.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });

        if (likePost) {
            const like = await pclient.like.delete({
                where: {
                    id: likePost.id,
                }
            });
            res.status(200).json({ like });
        } else {
            const [like, receiver, sender] = await pclient.$transaction([
                pclient.like.create({
                    data: {
                        postId,
                        userId,
                    },
                }),

                pclient.post.findUnique({
                    where: {
                        id: postId,
                    },
                    include: {
                        User: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }),

                pclient.user.findUnique({
                    where: {
                        id: userId,
                    },
                    select: {
                        username: true
                    }
                })
            ]);
            res.status(201).json({ like });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const createPost = async (req, res) => {
    try {
        const { title, description, Tech , Status, userId } = req.body;
        const user = await pclient.user.findUnique({
            where: { id: userId },
          });
      
          if (!user) {
            return res.status(404).json({ error: "User not found." });
          }

        const newPost = await pclient.post.create({
            data: {
                title,
                description,
                Tech,
                Status,
                userId,
    },
    });

        res.status(201).json({ newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const followUnfollowUser = async (req, res) => {
    try {
        const { userfollowingId, userToFollowId} = req.body;

        const follow = await pclient.follows.findFirst({
            where: {
                followerId: userfollowingId,
                followingId: userToFollowId,
            },
        });

        if (follow) {
            await pclient.follows.delete({
                where: {
                    id: follow.id
                },
            });
            res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            const [newFollow, sender] = await pclient.$transaction([
                pclient.follows.create({
                    data: {
                        followerId: userfollowingId,
                        followingId: userToFollowId,
                    },
                }),
                pclient.user.findUnique({
                    where: {
                        id: userfollowingId
                    },
                    select: {
                        username: true
                    }
                })
            ]);

            res.status(200).json({ 
                message: "Followed successfully",
                follow: newFollow
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getOtherProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const profileData = await pclient.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                bio: true,
                _count: {
                    select: {
                        posts: true,
                        followers: true,
                        following: true,
                    }
                }
            }
        });

        res.status(200).json({ profileData });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

// export const getHomePosts = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const userId = (req as any).user.userId;
//
//         const posts = await pclient.post.findMany({
//             where: {
//                 userId: { not: userId }
//             },
//             orderBy: {
//                 createdAt: 'desc'
//             },
//             select: {
//                 id: true,
//                 title: true,
//                 description: true,
//                 latitude: true,
//                 longitude: true,
//                 Cuisine: true,
//                 Dish: true,
//                 isBusinessPost: true,
//                 pictures: true,
//                 impressions: true,
//                 originalPostId: true,
//                 repostedPosts: true,
//                 createdAt: true,
//                 User: {
//                     select: {
//                         id: true,
//                         username: true,
//                         firstName: true,
//                         lastName: true,
//                         avatar: true,
//                         Type: true,
//                     }
//                 },
//                 _count: {
//                     select: {
//                         likes: true,
//                         comments: true,
//                     }
//                 },
//             },
//             take: 10,
//         });
//
//         res.status(200).json({ posts });
//     } catch (error) {
//         res.status (500).json({ error: "Internal server error" });
//     }
// };

module.exports = { commentOnPost, likeUnlikePost, createPost,  followUnfollowUser,  getOtherProfile, getAllUserIds}
