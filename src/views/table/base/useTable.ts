import { ref, createVNode, onActivated } from "vue";
import { ElImage, ElButton } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
import { getAccountAdminList, deleteAccountAdmin, updateAccountAdmin } from "@/api/modules/system/account";
import { AStatus } from "@/tsx/AStatus";
import { ATagStatus } from "@/tsx/ATagStatus";
import { enum_base_sex_options } from "@/enum/base";
import ImportExcel from "@/components/ImportExcel/index.vue";

import type { ProTableInstance, ProTableProps } from "@/components/ProTable/interface";

export const useTable = () => {
	const proTableRef = ref<ProTableInstance>();
	const importExcelRef = ref<InstanceType<typeof ImportExcel> | null>(null);
	const proTableAttrs: ProTableProps = {
		requestApi: getAccountAdminList,
		indent: 30,
		columns: [
			{ type: "selection", fixed: "left", width: 80 },
			{ prop: "id", label: "id", width: 100 },
			{
				prop: "roleName",
				headerRender: () => {
					return createVNode(ElButton, { type: "primary" }, () => "角色");
				},
				tag: true
			},
			{ prop: "userName", label: "用户名", search: { el: "input" } },
			{ prop: "name", label: "昵称", search: { el: "input" } },
			{ prop: "sex", label: "性别(枚举)", enum: enum_base_sex_options, search: { el: "select" } },
			{
				prop: "avatar",
				label: "头像",
				width: 150,
				render: ({ row }) => {
					return createVNode(ElImage, {
						style: { width: "40px", height: "40px" },
						lazy: true,
						src: row?.avatar,
						previewSrcList: [row?.avatar],
						zIndex: 99,
						previewTeleported: true,
						fit: "cover"
					});
				}
			},
			{
				prop: "status",
				label: "状态（tsx）",
				width: 200,
				render: ({ row }) => {
					return createVNode(AStatus, {
						value: row.status,
						change: (val: boolean) => (row.status = val),
						http: { api: updateAccountAdmin, params: { id: row.id } }
					});
				}
			},
			{
				prop: "statusTag",
				label: "登录状态(tsx)",
				width: 200,
				render: ({ row }) => {
					return createVNode(ATagStatus, {
						value: row.statusTag
					});
				}
			},
			{ prop: "operation", label: "操作", width: 250, fixed: "right" }
		]
	};

	const batchDelete = async (id: string[]) => {
		await useHandleData(deleteAccountAdmin, { id }, "删除所选信息");
		proTableRef.value?.clearSelection();
		proTableRef.value?.getTableList();
	};

	const handleDelete = async (params: any) => {
		await useHandleData(deleteAccountAdmin, { id: [params.id] }, `确定删除【${params.name}】?`);
		proTableRef.value?.getTableList();
	};

	const batchAdd = () => {
		const params = {
			title: "账号",
			// tempApi: (params: any) => Promise<any>,
			// importApi: (params: any) => Promise<any>,
			getTableList: proTableRef.value?.getTableList
		};
		importExcelRef.value?.acceptParams(params);
	};

	onActivated(() => {
		proTableRef.value?.getTableList();
	});

	return {
		proTableRef,
		proTableAttrs,
		importExcelRef,
		batchAdd,
		batchDelete,
		handleDelete
	};
};
