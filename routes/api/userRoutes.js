const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends/fiendId').post(addFriend).delete(deleteFriend);

module.exports =router;