export interface UserType {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  email: string;
  name: string;
  avatar?: string;
  password: string;
}
