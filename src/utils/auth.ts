import { reactive } from 'vue';
import UserInfo = UniNamespace.UserInfo;

export interface UserProfileType {
  avatar: string;
  nickname: string;
  openid: string;
}

export interface AuthStateType {
  profile?: UserProfileType;
  encryptedData?: string;
  iv?: string;
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
  profile: uni.getStorageSync('profile') as UserProfileType,
  encryptedData: uni.getStorageSync('encryptedData') as string,
  iv: uni.getStorageSync('iv') as string,
  login() {
    return new Promise((resolve, reject) => {
      uni.getUserProfile({
        desc: '登录',
        success: (res) => {
          const { userInfo, encryptedData, iv } = res;
          this.profile = uniUserProfile2UserProfile(userInfo);
          this.encryptedData = encryptedData;
          this.iv = iv;
          try {
            uni.setStorageSync('profile', this.profile);
            uni.setStorageSync('encryptedData', this.encryptedData);
            uni.setStorageSync('iv', this.iv);
          } catch (err) {
            console.error(err);
          }
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
    this.encryptedData = undefined;
    this.iv = undefined;
    try {
      uni.removeStorageSync('profile');
      uni.removeStorageSync('encryptedData');
      uni.removeStorageSync('iv');
    } catch (err) {
      console.error(err);
    }
  },
});