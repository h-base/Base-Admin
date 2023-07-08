import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useColumns } from "../useColumns";
import { useAuthStore } from "@/stores/modules/auth";
import { updateMenuAdmin } from "@/api/modules/system/menu";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useUpdate = () => {
	const route = useRoute();
	const { columns } = useColumns();
	const { id } = route.query;
	const authStore = useAuthStore();

	const proFromData = reactive<ProFormProps>({
		title: "编辑菜单",
		type: "update",
		info: undefined,
		http: {
			api: updateMenuAdmin,
			params: {}
		},
		form: {
			labelWidth: "130px"
		},
		columns: columns
	});

	const getInfo = () => {
		const data = authStore.flatMenuListGet.find(it => it.name === id);
		proFromData.info = data;
		if (proFromData.http) {
			proFromData.http.params = { id: data?.name };
		}
	};
	getInfo();

	return {
		proFromData
	};
};
