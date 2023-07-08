import authMenuList from "@/assets/json/authMenuList.json";
import http from "@/api";

/**
 * @name 登录模块
 */

// 用户登录
export const loginAdminAuth = (params: Auth.LoginParams) => {
	return http.post<API.Response<Auth.LoginResponse>>(`/admin/auth/login`, params);
};

// 获取用户信息
export const getAdminAuthUserInfo = () => {
	return http.get<API.Response<Auth.UserInfo>>(`/admin/auth/userInfo`);
};

// 用户退出登录
export const logoutAdminAuth = () => {
	return http.post(`/admin/auth/logout`);
};

// 获取权限列表
export const getAuthListApi = () => {
	return new Promise<API.Response<Auth.MenuProps[]>>(resolve => {
		resolve(authMenuList);
	});
};
