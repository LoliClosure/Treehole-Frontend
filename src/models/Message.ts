export interface MessageInterface {
  id: number;
  title: string;
  content: string;
  contentHtml: string;
  likes: number;
  createTime: string;
}

export class Message implements MessageInterface {
  id: number;
  title: string;
  content: string;
  contentHtml: string;
  likes: number;
  createTime: string;

  constructor(data: MessageInterface) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.contentHtml = data.contentHtml;
    this.likes = data.likes;
    this.createTime = data.createTime;
  }
}