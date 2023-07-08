import { saveAccountAdmin } from "@/api/modules/system/account";
import { useColumns } from "../useColumns";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useCreate = () => {
	const { columns, ruleForm } = useColumns();
	const proFromData: ProFormProps = {
		title: "创建账号",
		type: "create",
		form: {
			labelWidth: "130px"
		},
		http: {
			api: saveAccountAdmin
		},
		columns: columns
	};

	return {
		proFromData,
		ruleForm
	};
};
