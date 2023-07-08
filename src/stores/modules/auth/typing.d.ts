export interface AuthState {
	/** token */
	token: string;
	/** 登录的用户信息 */
	userInfo: Auth.UserInfo;
	/** 当前路由name */
	routeName: string;
	/** 菜单权限列表 */
	authMenuList: Auth.MenuProps[];
	/** 按钮权限列表 */
	authButtonList: string[];
}
