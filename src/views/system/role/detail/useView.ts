import { createVNode, reactive } from "vue";
import { useRoute } from "vue-router";
import { useColumns } from "../useColumns";
import { getRoleAdminDetail } from "@/api/modules/system/role";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useView = () => {
	const route = useRoute();
	const { columns } = useColumns();
	const { id } = route.params;

	const proFromData = reactive<ProFormProps>({
		title: "查看角色",
		type: "look",
		info: undefined,
		form: {
			disabled: true,
			hideRequiredAsterisk: true,
			labelWidth: "130px"
		},
		columns: [
			...columns,
			{
				formItem: {
					prop: "createTime",
					defaultValue: "",
					label: "创建时间"
				},
				attrs: {
					typeName: "VNode",
					VNode: value => createVNode("div", {}, value)
				}
			}
		]
	});

	const getInfo = async () => {
		const { data } = await getRoleAdminDetail(id as string);
		proFromData.info = data;
	};
	getInfo();
	return {
		proFromData
	};
};
