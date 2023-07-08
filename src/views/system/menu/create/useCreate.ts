import { saveMenuAdmin } from "@/api/modules/system/menu";
import { useColumns } from "../useColumns";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useCreate = () => {
	const { columns } = useColumns();
	const proFromData: ProFormProps = {
		title: "创建菜单",
		type: "create",
		http: {
			api: saveMenuAdmin
		},
		form: {
			labelWidth: "130px"
		},
		columns: columns
	};

	return {
		proFromData
	};
};
