// src/models/User.ts

export type User = {
    _id: string; // Corresponds to MongoDB's _id
    email: string;
    username: string;
    name: string;
    avatar?: string;
  };
  