import { createVNode, reactive } from "vue";
import { useRoute } from "vue-router";
import { useColumns } from "../useColumns";
import { useAuthStore } from "@/stores/modules/auth";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useView = () => {
	const route = useRoute();
	const { columns } = useColumns();
	const { id } = route.params;
	const authStore = useAuthStore();

	const proFromData = reactive<ProFormProps>({
		title: "查看菜单",
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

	const getInfo = () => {
		const data = authStore.flatMenuListGet.find(it => it.name === id);
		proFromData.info = data;
	};
	getInfo();

	return {
		proFromData
	};
};
