import { useColumns } from "../useColumns";
import { saveRoleAdmin } from "@/api/modules/system/role";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useCreate = () => {
	const { columns } = useColumns();
	const proFromData: ProFormProps = {
		title: "创建角色",
		type: "create",
		http: {
			api: saveRoleAdmin
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
