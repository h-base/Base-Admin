declare namespace API {
	/** 分页 */
	interface PageRequest {
		/** 当前分页 */
		pageNum?: number;
		/** 每页数量 */
		pageSize?: number;
	}

	/** 普通结果 */
	interface Response<T> {
		code: number;
		data: T;
		msg: string;
	}

	/** 分页结果 */
	interface PageResponse<T> {
		code: number;
		data: {
			list: T[];
			total: number;
			pageNum: number;
			pageSize: number;
		};
		msg: string;
	}

	/** 列表结果 */
	interface ListResponse<T> {
		code: number;
		data: T[];
		msg: string;
	}
}
