export type ItemProps = {
  id: string;
  name: string;
  folder?: string;
  pinned?: boolean;
};

export type UserProps = {
  login: string;
  password: string;
};
