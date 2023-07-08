import { useColumns } from "../useColumns";
import { saveDictAdmin } from "@/api/modules/system/dict";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useCreate = () => {
	const { columns } = useColumns();
	const proFromData: ProFormProps = {
		title: "创建字典",
		type: "create",
		http: {
			api: saveDictAdmin
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
