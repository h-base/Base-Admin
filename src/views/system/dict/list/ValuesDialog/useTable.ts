import { ref } from "vue";

import type { ProTableInstance, ProTableProps } from "@/components/ProTable/interface";

export const useTable = () => {
	// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
	const proTableRef = ref<ProTableInstance>();
	const proTableAttrs = ref<ProTableProps>({
		data: undefined,
		indent: 30,
		columns: [
			{ prop: "id", label: "id", width: 100 },
			{ prop: "name", label: "名称" },
			{ prop: "code", label: "代码" },
			{ prop: "remarks", label: "备注" }
		],
		pagination: false,
		toolButton: false
	});

	return {
		proTableRef,
		proTableAttrs
	};
};
