export interface UserInterface {
  wxName: string;
  nickname: string;
  avatar: string;
}

export class User implements UserInterface {
  wxName: string;
  nickname: string;
  avatar: string;

  constructor(user: UserInterface) {
    this.wxName = user.wxName;
    this.nickname = user.nickname;
    this.avatar = user.avatar;
  }
}