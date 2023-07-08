import { enum_system_router_meta_type } from "@/enum/system";

declare global {
	namespace Auth {
		interface LoginParams {
			userName: string;
			password: string;
		}

		/** 登录返回的token */
		interface LoginResponse {
			access_token: string;
		}

		/** 用户信息 */
		interface UserInfo {
			token: string;
			id: string;
			name: string;
			userName: string;
			avatar: string;
		}

		/**
		 * @name 路由菜单元信息
		 */
		interface MetaProps {
			/**
			 * 路由的类型
			 * @description 如果是按钮，其他信息填按钮所在页面的
			 */
			type: enum_system_router_meta_type;
			/** 菜单和面包屑对应的图标 */
			icon?: string;
			/** 路由标题 (用作 document.title || 菜单的名称) */
			title: string;
			/** 当前路由为详情页时，需要高亮的菜单 */
			activeMenu?: string;
			/** 是否在菜单中隐藏 (通常列表详情页需要隐藏) */
			isHide?: boolean;
			/** 菜单是否全屏 (示例：数据大屏页面) */
			isFull?: boolean;
			/** 菜单是否固定在标签页中 (首页通常是固定项) */
			isAffix?: boolean;
			/** 当前路由是否缓存 */
			isKeepAlive?: boolean;
		}

		/**
		 * @name 菜单（路由）
		 */
		interface MenuProps {
			/** 路由菜单访问路径 */
			path: string;
			/** 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选) */
			name: string;
			/** 路由重定向地址 */
			redirect?: string;
			/** 视图文件路径 */
			component?: string | (() => Promise<unknown>);
			/** 路由菜单元信息 */
			meta: MetaProps;
			children?: MenuOptions[];
		}
	}
}
