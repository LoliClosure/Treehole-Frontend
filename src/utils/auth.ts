import { reactive } from 'vue';
import ajax from './ajax';
import { Base64 } from 'js-base64';
import { User } from '../models/User';

export interface AuthStateType {
  profile?: User;
  login: () => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

export interface JWTClaims {
  username: string;
  id: string;
  exp: number;
  role: string;
  iat: number;
}

export interface AuthType {
  token: string;
}

export function getStorageJWT(): string | undefined {
  return uni.getStorageSync('token');
}

function getProfileFromJWT(token?: string): JWTClaims | undefined {
  if (!token) {
    return undefined;
  }
  try {
    const payload = token.split('.')[1];
    const profile = JSON.parse(Base64.decode(payload));
    if (profile.exp < Date.now() / 1000) {
      return undefined;
    }
    return profile as JWTClaims;
  } catch (error) {
    uni.removeStorageSync('token');
    throw new Error('Invalid token');
  }
}

function claims2Profile(claims?: JWTClaims): User | undefined {
  if (!claims) {
    return undefined;
  }
  return {
    username: claims.username,
    nickname: claims.username,
    id: claims.id,
  };
}

export const user = reactive<AuthStateType>({
  profile: claims2Profile(getProfileFromJWT(getStorageJWT())),
  login() {
    return new Promise((resolve, reject) => {
      uni.login({
        success: (res) => {
          ajax.post<AuthType>('/auth/wechat', { code: res.code })
            .then((res) => {
              uni.setStorageSync('token', res.data.token);
              this.profile = claims2Profile(getProfileFromJWT(res.data.token));
              this.getProfile().catch((err) => reject(err));
            })
            .catch((err) => {
              reject(err);
            });
        },
        fail: err => reject(err),
      });
    });
  },
  logout() {
    this.profile = undefined;
    try {
      uni.removeStorageSync('token');
    } catch (err) {
      console.error(err);
    }
  },
  getProfile() {
    if (!this.profile) {
      throw new Error('User not logged in');
    }
    return new Promise((resolve, reject) => {
      ajax.get<User>('/user')
        .then((res) => {
          this.profile = res.data;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
});