import { ref, createVNode } from "vue";
import { useHandleData } from "@/hooks/useHandleData";
import { useDict } from "@/hooks/useDict";
import { getLogAdminList, deleteLogAdmin } from "@/api/modules/system/log";
import { ATagStatus } from "@/tsx/ATagStatus";

import type { ProTableInstance, ProTableProps } from "@/components/ProTable/interface";

export const useTable = () => {
	const { dictOrigin } = useDict();
	// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
	const proTableRef = ref<ProTableInstance>();
	const proTableAttrs: ProTableProps = {
		requestApi: getLogAdminList,
		indent: 30,
		columns: [
			{ prop: "id", label: "id", width: 100 },
			{ prop: "name", label: "昵称", align: "left", search: { el: "input" } },
			{ prop: "userName", label: "用户名", search: { el: "input" } },
			{ prop: "roleName", label: "角色", tag: true },
			{ prop: "ip", label: "ip" },
			{ prop: "loginDate", label: "登录时间" },
			{
				prop: "status",
				label: "登录状态",
				enum: dictOrigin.value["base_status"],
				render: scope => {
					return createVNode(ATagStatus, {
						value: `${scope.row.status}`
					});
				}
			},
			{ prop: "operation", label: "操作", width: 250, fixed: "right" }
		]
	};

	// 批量删除用户信息
	const batchDelete = async (id: string[]) => {
		await useHandleData(deleteLogAdmin, { id }, "删除所选用户信息");
		proTableRef.value?.clearSelection();
		proTableRef.value?.getTableList();
	};

	// 删除用户信息
	const handleDelete = async (params: any) => {
		await useHandleData(deleteLogAdmin, { id: [params.id] }, `删除【${params.username}】用户`);
		proTableRef.value?.getTableList();
	};

	return {
		proTableRef,
		proTableAttrs,
		batchDelete,
		handleDelete
	};
};
