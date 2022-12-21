import { reactive } from 'vue';
import UserInfo = UniNamespace.UserInfo;

export interface UserProfileType {
  avatar: string;
  nickname: string;
  openid: string;
}

export interface AuthStateType {
  profile?: UserProfileType;
  login: () => Promise<void>;
  logout: () => void;
}

function uniUserProfile2UserProfile(userInfo: UserInfo): UserProfileType {
  return {
    avatar: userInfo.avatarUrl,
    nickname: userInfo.nickName,
    openid: userInfo.openId,
  };
}

export const user = reactive<AuthStateType>({
  profile: undefined,
  login() {
    return new Promise((resolve, reject) => {
      uni.getUserProfile({
        desc: '登录',
        success: (res) => {
          const { userInfo } = res;
          this.profile = uniUserProfile2UserProfile(userInfo);
          resolve();
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },
  logout() {
    this.profile = undefined;
  },
});