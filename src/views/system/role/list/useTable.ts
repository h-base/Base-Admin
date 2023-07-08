import { ref, onActivated } from "vue";
import { useHandleData } from "@/hooks/useHandleData";
import { getRoleAdminList, deleteRoleAdmin } from "@/api/modules/system/role";

import type { ProTableInstance, ProTableProps } from "@/components/ProTable/interface";

export const useTable = () => {
	// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
	const proTableRef = ref<ProTableInstance>();
	const proTableAttrs: ProTableProps = {
		requestApi: getRoleAdminList,
		indent: 30,
		columns: [
			{ type: "selection", fixed: "left", width: 80 },
			{ prop: "id", label: "id", width: 100 },
			{ prop: "name", label: "角色名称", search: { el: "input" } },
			{ prop: "brief", label: "介绍" },
			{ prop: "auth", label: "权限" },
			{ prop: "operation", label: "操作", width: 250, fixed: "right" }
		]
	};

	// 批量删除用户信息
	const batchDelete = async (id: string[]) => {
		await useHandleData(deleteRoleAdmin, { id }, "删除所选用户信息");
		proTableRef.value?.clearSelection();
		proTableRef.value?.getTableList();
	};

	// 删除用户信息
	const handleDelete = async (params: any) => {
		await useHandleData(deleteRoleAdmin, { id: [params.id] }, `删除【${params.username}】用户`);
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
