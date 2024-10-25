export interface CounterState {
  value: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface LoginType {
  username: string;
  email: string;
  password: string;
}

export interface Register {
  token: string;
  user: {
    full_name: string;
    username: string;
    email: string;
    password: string;
    photo: string;
  };
  isLoading: boolean;
}

export interface UserData {
  _id: string;
  photo: string;
  username: string;
  fullName: string;
  followers: [];
}

export interface PostData {
  id?: string;
  content: string[];
  contentAlt: string;
  caption: string;
  location: string;
  createdAt?: string;
  user?: UserData;
}

export interface Post {
  id?: string;
  content: string[];
  contentAlt: string;
  caption: string;
  location: string;
  createdAt?: string;
  user?: UserData;
}

export interface ErrorMessage {
  message: string;
}

export interface PeopleProps {
  username: string;
  photo: string;
}
