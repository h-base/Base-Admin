import { shallowRef } from "vue";
import { enum_base_sex_options } from "@/enum/base";
import { getRoleAdminList } from "@/api/modules/system/role";

import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useColumns = () => {
	const ruleForm = shallowRef<{ [key: string]: any }>({});
	const columns: ProFormProps["columns"] = [
		{
			formItem: {
				prop: "userName",
				defaultValue: "",
				label: "用户名",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入用户名",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "password",
				defaultValue: "",
				label: "密码",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入密码",
					showPassword: true,
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "name",
				defaultValue: "",
				label: "昵称",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入昵称",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "sex",
				defaultValue: "",
				label: "性别",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ASelect",
				ASelect: {
					options: enum_base_sex_options
				}
			}
		},
		{
			formItem: {
				prop: "brief",
				defaultValue: "",
				label: "简介"
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入简介",
					type: "textarea",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "avatar",
				defaultValue: "",
				label: "头像"
			},
			attrs: {
				typeName: "AUploadImg",
				AUploadImg: {}
			}
		},
		{
			formItem: {
				prop: "role",
				defaultValue: "",
				label: "角色"
			},
			attrs: {
				typeName: "ASelect",
				ASelect: {
					attrs: {
						placeholder: "请选择",
						remote: true,
						remoteMethod: async () => {
							const { data } = await getRoleAdminList({ pageSize: 200 });
							return data.list?.map(item => ({ label: item.name, value: item.id }));
						}
					}
				}
			}
		},
		{
			formItem: {
				prop: "status",
				defaultValue: true,
				label: "状态",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElSwitch",
				ElSwitch: {}
			}
		},
		{
			formItem: {
				prop: "order",
				defaultValue: 0,
				label: "序号"
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
		columns,
		ruleForm
	};
};
