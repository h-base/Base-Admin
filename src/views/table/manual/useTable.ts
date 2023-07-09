import { ref, reactive, createVNode } from "vue";
import { ElImage, ElButton } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
import { getAccountAdminList, deleteAccountAdmin, updateAccountAdmin } from "@/api/modules/system/account";
import { AStatus } from "@/tsx/AStatus";
import { ATagStatus } from "@/tsx/ATagStatus";
import { enum_base_sex_options } from "@/enum/base";

import type { ProTableInstance, ProTableProps } from "@/components/ProTable/interface";

export const useTable = () => {
	const proTableRef = ref<ProTableInstance>();
	const proTableAttrs = reactive<ProTableProps>({
		requestApi: getAccountAdminList,
		requestAuto: false,
		indent: 30,
		initParam: undefined,
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
	});

	const selectFilterData = reactive([
		{
			title: "用户状态(单)",
			key: "userStatus",
			options: [
				{
					label: "全部",
					value: ""
				},
				{
					label: "状态1",
					value: "1",
					icon: "User"
				},
				{
					label: "状态2",
					value: "2",
					icon: "Bell"
				},
				{
					label: "状态3",
					value: "3",
					icon: "Clock"
				},
				{
					label: "状态4",
					value: "4",
					icon: "CircleClose"
				},
				{
					label: "状态5",
					value: "5",
					icon: "CircleCheck"
				}
			]
		},
		{
			title: "用户角色(多)",
			key: "userRole",
			multiple: true,
			options: [
				{
					label: "全部",
					value: ""
				},
				{
					label: "角色1",
					value: "1"
				},
				{
					label: "角色2",
					value: "2"
				},
				{
					label: "角色3",
					value: "3"
				},
				{
					label: "角色4",
					value: "4"
				}
			]
		}
	]);

	// 默认 selectFilter 参数
	const selectFilterValues = ref({ userStatus: "1", userRole: ["1", "2"] });
	const changeSelectFilter = (value: typeof selectFilterValues.value) => {
		proTableRef.value!.pageable.pageNum = 1;
		selectFilterValues.value = value;
		proTableAttrs.initParam = Object.assign({}, proTableAttrs.initParam, {
			userStatus: selectFilterValues.value.userStatus,
			role: selectFilterValues.value.userRole.join(",")
		});
	};

	const handleDelete = async (params: any) => {
		await useHandleData(deleteAccountAdmin, { id: [params.id] }, `确定删除【${params.name}】?`);
		proTableRef.value?.getTableList();
	};

	const getTableData = (isChange: boolean) => {
		if (isChange) {
			proTableAttrs.initParam = {
				sex: "1"
			};
		} else {
			proTableRef.value?.getTableList();
		}
	};

	return {
		proTableRef,
		proTableAttrs,
		selectFilterData,
		selectFilterValues,
		changeSelectFilter,
		getTableData,
		handleDelete
	};
};
