import { ref, reactive, onActivated } from "vue";
import { useEnumOption } from "../useEnumOption";
import { useHandleData } from "@/hooks/useHandleData";
import { deleteMenuAdmin } from "@/api/modules/system/menu";
import authMenuList from "@/assets/json/authMenuList.json";

import type { ProTableInstance, ProTableProps } from "@/components/ProTable/interface";

export const useTable = () => {
	const { routerMetaType, RouterMetaTypeTag } = useEnumOption();
	// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
	const proTableRef = ref<ProTableInstance>();
	const proTableAttrs = reactive<ProTableProps>({
		requestAuto: false,
		data: [],
		indent: 10,
		rowKey: "name",
		pagination: false,
		columns: [
			{ type: "selection", fixed: "left", width: 80 },
			{ type: "index", label: "#", width: 150 },
			{ prop: "meta.title", label: "菜单名称" },
			{
				prop: "meta.type",
				label: "菜单类型",
				enum: routerMetaType,
				render: scope => {
					return RouterMetaTypeTag(scope.row.meta.type);
				}
			},
			{ prop: "name", label: "路由名字" },
			{ prop: "path", label: "路由路径" },
			{ prop: "component", label: "组件路径" },
			{
				prop: "meta.icon",
				label: "菜单图标"
			},
			{ prop: "operation", label: "操作", width: 250, fixed: "right" }
		]
	});

	const batchDelete = async (id: string[]) => {
		await useHandleData(deleteMenuAdmin, { id }, "确定删除所选信息?");
		proTableRef.value?.clearSelection();
		proTableRef.value?.getTableList();
	};

	const handleDelete = async (params: any) => {
		await useHandleData(deleteMenuAdmin, { id: [params.id] }, `确定删除【${params.meta.title}】?`);
		proTableRef.value?.getTableList();
	};

	onActivated(async () => {
		// const { data = [] } = await getMenuAdminTree();
		proTableAttrs.data = authMenuList.data as any;
	});

	return {
		proTableRef,
		proTableAttrs,
		batchDelete,
		handleDelete
	};
};
