/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateProductInput = {
  additionalImages?: InputMaybe<Array<Scalars['Upload']>>;
  categoryId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  expiresIn?: InputMaybe<Scalars['DateTime']>;
  listPrice?: InputMaybe<Scalars['Float']>;
  mainImage?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
  quantity?: InputMaybe<Scalars['Float']>;
  sellingPrice?: InputMaybe<Scalars['Float']>;
  status: Scalars['String'];
  validIn?: InputMaybe<Scalars['DateTime']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createProduct: Product;
  createUser: UserWithoutPassword;
  deleteProfilePicture: UserWithoutPassword;
  signin: SigninResponse;
  updateProduct: Product;
  updateProfilePicture: UserWithoutPassword;
  updateUser: UserWithoutPassword;
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['String'];
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateProfilePictureArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Product = {
  __typename?: 'Product';
  additionalImageUrls: Array<Scalars['String']>;
  category: Category;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  expiresIn?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  imagesKeys: Array<Scalars['String']>;
  listPrice?: Maybe<Scalars['Float']>;
  mainImageKey?: Maybe<Scalars['String']>;
  mainImageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  quantity?: Maybe<Scalars['Float']>;
  sellingPrice?: Maybe<Scalars['Float']>;
  slug: Scalars['String'];
  status: Scalars['String'];
  validIn?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  product: Product;
  products: Array<Product>;
  profile: UserWithoutPassword;
  sayHello: Scalars['String'];
};


export type QueryProductArgs = {
  id: Scalars['String'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  email: Scalars['String'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type UpdateProductInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  expiresIn?: InputMaybe<Scalars['DateTime']>;
  listPrice?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  quantity?: InputMaybe<Scalars['Float']>;
  sellingPrice?: InputMaybe<Scalars['Float']>;
  status: Scalars['String'];
  validIn?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  imageKey?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  imageKey?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};
