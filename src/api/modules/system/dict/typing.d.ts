declare namespace SystemDict {
	/** 列表查询参数 */
	interface DictListParams extends API.PageRequest {
		name?: string;
		code?: string;
	}

	interface DictProps {
		id?: string;
		name: string;
		code: string;
		brief?: string;
		list: { name: string; code: string; brief?: string };
		status: boolean;
	}

	interface DictDeleteRequest {
		id: string[];
	}
}
