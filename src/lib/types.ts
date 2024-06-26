export type ItemProps = {
  id: string;
  title?: string;
  body: string;
  folder?: string;
  pinned?: boolean;
};

export type UserProps = {
  login: string;
  password: string;
};
