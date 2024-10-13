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
