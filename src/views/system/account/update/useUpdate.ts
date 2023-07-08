import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useColumns } from "../useColumns";
import { getAccountAdminDetail, updateAccountAdmin } from "@/api/modules/system/account";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useUpdate = () => {
	const route = useRoute();
	const { columns } = useColumns();
	const { id } = route.query;

	const proFromData = reactive<ProFormProps>({
		title: "编辑账号",
		type: "update",
		info: undefined,
		http: {
			api: updateAccountAdmin,
			params: undefined
		},
		form: {
			labelWidth: "130px"
		},
		columns: columns
	});

	const getInfo = async () => {
		const { data } = await getAccountAdminDetail(id as string);
		proFromData.info = data;
		if (proFromData.http) {
			proFromData.http.params = { id: data.id };
		}
	};
	getInfo();

	return {
		proFromData
	};
};
