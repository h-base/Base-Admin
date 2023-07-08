# `API` 请求和相关返回结果

- 所有接口的 `http` 请求都返回成功，根据返回 [code](#结果的-code) 处理对应错误。

  - [普通数据返回结果](#普通数据返回结果)
  - [分页请求和返回结果](#分页请求和返回结果)
  - [列表返回结果（不需要分页的列表）](#列表返回结果（不需要分页的列表）)
  - [文件上传结果](#文件上传结果)

- `token` 和 `language` 放在[请求头](#请求头)。

  - 后台管理系统不区分语言

## 请求头

```typescript
interface HeaderConfig {
	/** token */
	authorization: string;
	/** 语言(admin不区分语言) */
	language: "zh_CN" | "en";
}
```

## 结果的 `code`

```typescript
// 没列出来的暂时没用到，或者后端提供其他错误码对应信息
const errorMap = new Map([
	[400, "请求失败！请您稍后重试"],
	[401, "登录失效！请您重新登录"],
	[403, "当前账号无权限访问！"],
	[404, "你所访问的资源不存在！"],
	[405, "请求方式错误！请您稍后重试"],
	[408, "请求超时！请您稍后重试"],
	[500, "服务异常！"],
	[502, "网关错误！"],
	[503, "服务不可用！"],
	[504, "网关超时！"],
	[9999, "请求失败！"]
]);
```

## 普通数据返回结果

```typescript
interface Response<T> {
	code: number;
	data: T;
	msg: string;
}
```

## 分页请求和返回结果

```typescript
interface PageRequest {
	pageNum: number;
	pageSize: number;
}

interface PageResponse<T> {
	code: number;
	data: {
		total: number;
		list: T[];
		pageNum: number;
		pageSize: number;
		// 其他分页数据等...
	};
	msg: string;
}
```

## 列表返回结果（不需要分页的列表）

```typescript
interface ListResponse<T> {
	code: number;
	data: T[];
	msg: string;
}
```

## 文件上传结果

```typescript
interface FileResponse {
	code: number;
	data: {
		/** 文件名 */
		name: string;
		// 文件地址
		url: string;
		// 其他文件信息等...
	};
	msg: string;
}
```

## admin 的菜单配置

```typescript
enum enum_system_router_meta_type {
	route = 1,
	page,
	button
}

interface MenuItem {
	/** 路由菜单访问路径 */
	path?: string;
	/** 路由 name */
	name: string;
	/** 路由重定向地址 */
	redirect?: string;
	/** 视图文件路径 */
	component?: string;
	/** 路由菜单元信息 */
	meta: {
		/**
		 * 路由的类型
		 * @description 如果是按钮，其他信息填按钮所在页面的
		 */
		type: enum_system_router_meta_type;
		/** 菜单和面包屑对应的图标([element-plus图标库](https://element-plus.org/component/icon.html)) */
		icon?: string;
		/** 路由标题 (用作 document.title || 菜单的名称) */
		title: string;
		/** 当前路由为详情页时，需要高亮的菜单 */
		activeMenu?: string;
		/** 是否在菜单中隐藏 (通常列表详情页需要隐藏) */
		isHide: boolean;
		/** 菜单是否全屏 (示例：数据大屏页面) */
		isFull: boolean;
		/** 菜单是否固定在标签页中 (首页通常是固定项) */
		isAffix: boolean;
		/** 当前路由是否缓存 */
		isKeepAlive: boolean;
	};
	/** 子菜单 */
	children?: MenuItem[];
}
```
