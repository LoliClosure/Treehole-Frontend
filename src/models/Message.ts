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

  constructor(message: MessageInterface) {
    this.id = message.id;
    this.title = message.title;
    this.content = message.content;
    this.nickname = message.nickname;
    this.likes = message.likes;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}