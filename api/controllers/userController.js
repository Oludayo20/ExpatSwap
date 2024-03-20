import User from '../models/User.js';
import BaseController from './baseController.js';
import bcrypt from 'bcrypt';

export default class UserController extends BaseController {
  constructor() {
    super();
  }

  async getAllUser(req, res) {
    const page = req.query.page || 1;
    const limit = 2; // Number of users per page

    // Query users from MongoDB with pagination
    const users = await User.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password')
      .exec();

    // Count total number of users
    const totalUsers = await User.countDocuments();

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalUsers / limit);

    // If no user
    if (!users || users.length === 0) {
      return this.success(res, '200', 'No user found', 200, []);
    } else {
      return this.success(res, '200', 'User fetched successfully', 200, {
        users,
        currentPage: page,
        totalPages
      });
    }
  }

  async createUser(req, res) {
    const { firstName, lastName, phoneNum, email, password, dateOfBirth } =
      req.body;

    // Confirm data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNum ||
      !dateOfBirth ||
      !password
    ) {
      return this.error(res, '400', `All fields are required`, 400);
    }

    // Check for duplicate email
    const duplicate = await User.findOne({ email })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicate) {
      return this.error(res, '409', `User with this email already exist!`, 409);
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userData = {
      firstName,
      lastName,
      email,
      phoneNum,
      password: hashedPwd,
      dateOfBirth
    };

    // Create and store new user
    const user = await User.create(userData);

    if (user) {
      return this.success(
        res,
        '201',
        `New user ${user.firstName} created!`,
        201,
        user
      );
    } else {
      return this.error(res, '500', `Error saving user`, 500);
    }
  }
}
