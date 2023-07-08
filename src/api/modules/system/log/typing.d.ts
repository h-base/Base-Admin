declare namespace SystemLog {
	/** 列表查询参数 */
	interface LogListParams extends API.PageRequest {
		name?: string;
		userName?: string;
	}

	/** 账号参数 */
	interface LogProps {
		id?: string;
		userName: string;
		name: string;
		roleName: string;
		ip: string;
		brief: string;
		status: boolean;
	}

	interface LogListProps extends LogProps {
		roleName: string;
	}

	interface LogDeleteRequest {
		id: string[];
	}
}
