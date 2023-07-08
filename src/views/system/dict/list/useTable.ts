import { ref, createVNode, onActivated } from "vue";
import { useHandleData } from "@/hooks/useHandleData";
import { getDictAdminList, deleteDictAdmin } from "@/api/modules/system/dict";
import ADialog from "./ValuesDialog/index.vue";

import type { ProTableInstance, ProTableProps } from "@/components/ProTable/interface";

export const useTable = () => {
	// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
	const proTableRef = ref<ProTableInstance>();
	const proTableAttrs: ProTableProps = {
		requestApi: getDictAdminList,
		indent: 30,
		columns: [
			{ type: "selection", fixed: "left", width: 80 },
			{ prop: "id", label: "id", width: 100 },
			{ prop: "name", label: "名称", search: { el: "input" } },
			{ prop: "code", label: "代码", search: { el: "input" } },
			{
				prop: "list",
				label: "字典值",
				render: scope => {
					return createVNode(ADialog, { info: scope.row });
				}
			},
			{ prop: "brief", label: "备注" },
			{ prop: "operation", label: "操作", width: 250, fixed: "right" }
		]
	};

	// 批量删除用户信息
	const batchDelete = async (id: string[]) => {
		await useHandleData(deleteDictAdmin, { id }, "删除所选信息");
		proTableRef.value?.clearSelection();
		proTableRef.value?.getTableList();
	};

	// 删除用户信息
	const handleDelete = async (params: any) => {
		await useHandleData(deleteDictAdmin, { id: [params.id] }, `删除【${params.name}】?`);
		proTableRef.value?.getTableList();
	};

	onActivated(async () => {
		proTableRef.value?.getTableList();
	});

	return {
		proTableRef,
		proTableAttrs,
		batchDelete,
		handleDelete
	};
};
