export interface MessageInterface {
  id: number;
  title: string;
  content: string;
  nickname: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export class Message implements MessageInterface {
  id: number;
  title: string;
  content: string;
  nickname: string;
  likes: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: MessageInterface) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.nickname = data.nickname;
    this.likes = data.likes;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}