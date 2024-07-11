/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { users, gigs, categories } from './data.js';
import Gig from '../models/gig.model.js';
import Category from '../models/category.model.js';

dotenv.config();

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO);
  console.log('Database connected');
};

const seedUser = async () => {
  users.forEach((u) => {
    u.password = bcrypt.hashSync(u.password);
  });
  await User.deleteMany();
  await User.insertMany(users);
  console.log('Users seeded');
};

const seedCategories = async () => {
  await Category.deleteMany();
  await Category.insertMany(categories);
};

const getUserIds = async () => {
  const allUsers = await User.find();
  const ids = allUsers.filter((user) => user.isSeller).map((user) => user._id.toString());
  return ids;
};

const getCategoryIds = async () => {
  const allCategories = await Category.find();
  const ids = allCategories.map((cat) => cat._id.toString());
  return ids;
};

const seedGigs = async () => {
  const userIds = await getUserIds();
  const catIds = await getCategoryIds();
  gigs.forEach((g, i) => {
    g.userId = userIds[i % userIds.length];
    g.categoryId = catIds[i % catIds.length];
  });
  await Gig.deleteMany();
  await Gig.insertMany(gigs);
};

const main = async () => {
  await connectDatabase();
  // Uncomment the next line if you want to seed users
  await seedUser();
  await seedCategories();
  await seedGigs();
  await mongoose.disconnect();
};

main().catch((err) => console.error(err));
