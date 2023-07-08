import { defineStore } from "pinia";
import { enum_system_router_meta_type } from "@/enum/system";
import { getAuthListApi, getAdminAuthUserInfo } from "@/api/modules/auth";
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from "@/utils";
import piniaPersistConfig from "@/config/piniaPersist";

import type { AuthState } from "./typing";

export const useAuthStore = defineStore({
	id: "auth",
	state: (): AuthState => ({
		token: "",
		userInfo: {} as AuthState["userInfo"],
		// 按钮权限列表
		authButtonList: [],
		// 菜单权限列表
		authMenuList: [],
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: ""
	}),
	getters: {
		tokenGet: state => state.token,
		userInfoGet: state => state.userInfo,
		// 按钮权限列表
		authButtonListGet: state => state.authButtonList,
		// 菜单权限列表 ==> 这里的菜单没有经过任何处理
		authMenuListGet: state => state.authMenuList,
		// 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		// 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
		flatMenuListGet: state => getFlatMenuList(state.authMenuList),
		// 递归处理后的所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
	},
	actions: {
		/** 登录 */
		async getUserInfo() {
			const { data } = await getAdminAuthUserInfo();
			this.userInfo = data ?? {};
		},
		setToken(token: string) {
			this.token = token;
		},
		setUserInfo(userInfo: AuthState["userInfo"]) {
			this.userInfo = userInfo;
		},
		/**
		 * 获取按钮权限列表
		 * @description 按钮权限列表在 菜单的`meta`里面
		 */
		async getAuthButtonList() {
			this.authButtonList = this.flatMenuListGet
				.filter(item => item.meta.type === enum_system_router_meta_type.button)
				.map(item => item.name);
		},
		/**
		 * 获取菜单的权限列表
		 */
		async getAuthMenuList() {
			const { data } = await getAuthListApi();
			this.authMenuList = data;
		},
		// Set RouteName
		async setRouteName(name: string) {
			this.routeName = name;
		}
	},
	persist: piniaPersistConfig("auth", ["token", "userInfo"])
});
