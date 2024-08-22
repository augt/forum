export type PublicationType = {
  id: string;
  title: string;
  text: string;
  image: null | string;
  createdAt: string;
  updatedAt: null | string;
  user: UserType;
  comments: CommentType[];
  likes: LikeType[];
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string | null;
};

export type CommentType = {
  id: string;
  text: string;
  user: UserType;
  createdAt: string;
  updatedAt: string | null;
};

export type LikeType = {
  id: string;
  user: UserType;
  createdAt: string;
};
