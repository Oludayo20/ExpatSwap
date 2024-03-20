import express from 'express';
import UserController from '../controllers/userController.js';
import useCatchErrors from '../helper/useCatchErrors.js';

export default class UserRoute {
  router = express.Router();
  userController = new UserController();
  path = '/user';

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/get-all-user`,
      useCatchErrors(this.userController.getAllUser.bind(this.userController))
    );

    this.router.post(
      `${this.path}/create-user`,
      useCatchErrors(this.userController.createUser.bind(this.userController))
    );
  }
}
