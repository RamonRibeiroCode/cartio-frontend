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
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserWithoutPassword;
  signin: SigninResponse;
  updateUser: UserWithoutPassword;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  profile: UserWithoutPassword;
  sayHello: Scalars['String'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  email: Scalars['String'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};
