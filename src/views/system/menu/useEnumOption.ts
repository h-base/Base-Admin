import { createVNode } from "vue";
import { ElTag } from "element-plus";
import { enum_system_router_meta_type } from "@/enum/system";
import { useGlobalStore } from "@/stores/modules/global";
import type { TagProps } from "element-plus";

interface RouterMetaTypeProps {
	label: string;
	value: enum_system_router_meta_type;
	color?: TagProps["type"];
}

export const useEnumOption = () => {
	const globalStore = useGlobalStore();
	const routerMetaType: RouterMetaTypeProps[] = [
		{
			label: "路由",
			value: enum_system_router_meta_type.route,
			color: ""
		},
		{
			label: "页面",
			value: enum_system_router_meta_type.page,
			color: "success"
		},
		{
			label: "按钮",
			value: enum_system_router_meta_type.button,
			color: "warning"
		}
	];

	/**
	 * 路由类型标签
	 */
	const RouterMetaTypeTag = (val: RouterMetaTypeProps["value"], size: TagProps["size"] = globalStore.assemblySize) => {
		const currentType = routerMetaType.find(item => item.value === val);
		return createVNode(ElTag, { type: currentType?.color, size }, () => currentType?.label);
	};

	return {
		routerMetaType,
		RouterMetaTypeTag
	};
};
