declare namespace SystemMenu {
	/** 列表查询参数 */
	interface MenuListParams extends API.PageRequest {
		name?: string;
	}

	interface MenuProps extends Auth.MenuProps {
		id?: string;
	}
	interface MenuDeleteRequest {
		id: string[];
	}
}
