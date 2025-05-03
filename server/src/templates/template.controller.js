const {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
  } = require('./template.service');
  
  const AppError = require('../../utils/AppError');
  
  // CREATE
  async function create(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        throw new AppError('All fields are required', 400);
      }
  
      const user = await createUser({ username, email, password });
  
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  
  // READ
  async function getById(req, res, next) {
    try {
      const user = await getUserById(req.params.id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // UPDATE
  async function update(req, res, next) {
    try {
      const updated = await updateUser(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }
  
  // DELETE
  async function remove(req, res, next) {
    try {
      await deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = {
    create,
    getById,
    update,
    remove,
  };
  