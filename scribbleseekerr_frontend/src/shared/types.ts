export interface LooseObject {
  [key: string]: any;
}

export interface Post {
  text_type: string;
  pk: number;
  title: string;
  author: string;
  content: string;
  flames: FlameUser[];
  tags: string[];
  created_at: string;
}

export interface FlameUser {
  pk: number;
  username: string;
}
