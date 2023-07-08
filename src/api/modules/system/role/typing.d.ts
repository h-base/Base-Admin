declare namespace SystemRole {
	/** 列表查询参数 */
	interface RoleListParams extends API.PageRequest {
		name?: string;
	}

	interface RoleProps {
		id?: string;
		name: string;
		brief?: string;
		auth: string;
		status: boolean;
	}

	interface RoleDeleteRequest {
		id: string[];
	}
}
