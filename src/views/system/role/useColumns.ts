import authMenuList from "@/assets/json/authMenuList.json";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useColumns = () => {
	const columns: ProFormProps["columns"] = [
		{
			formItem: {
				prop: "name",
				defaultValue: "",
				label: "角色名称",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入角色名称",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "brief",
				defaultValue: "",
				label: "介绍"
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入介绍",
					clearable: true,
					type: "textarea"
				}
			}
		},
		{
			formItem: {
				prop: "auth",
				defaultValue: [],
				label: "权限",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ATreeFilter",
				ATreeFilter: {
					data: authMenuList.data,
					isAuth: true,
					multiple: true,
					id: "name",
					label: data => {
						return data.meta?.title ?? "";
					}
				}
			}
		},
		{
			formItem: {
				prop: "order",
				defaultValue: 0,
				label: "序号",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInputNumber",
				ElInputNumber: {
					placeholder: "请输入序号"
				}
			}
		}
	];

	return {
		columns
	};
};
