import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useColumns = () => {
	const columns: ProFormProps["columns"] = [
		{
			formItem: {
				prop: "name",
				defaultValue: "",
				label: "名称",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入名称",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "code",
				defaultValue: "",
				label: "代码",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入代码",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "brief",
				defaultValue: "",
				label: "备注"
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入昵称",
					clearable: true,
					type: "textarea"
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
				prop: "list",
				defaultValue: [],
				label: "字典值列表",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入字典值",
					clearable: true
				}
			},
			formList: [
				{
					formItem: {
						prop: "name",
						defaultValue: "",
						label: "字典值名称",
						rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
					},
					attrs: {
						typeName: "ElInput",
						ElInput: {
							placeholder: "请输入字典值名称",
							clearable: true
						}
					}
				},
				{
					formItem: {
						prop: "code",
						defaultValue: "",
						label: "字典值代码",
						rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
					},
					attrs: {
						typeName: "ElInput",
						ElInput: {
							placeholder: "请输入字典值代码",
							clearable: true
						}
					}
				},
				{
					formItem: {
						prop: "brief",
						defaultValue: "",
						label: "字典值备注"
					},
					attrs: {
						typeName: "ElInput",
						ElInput: {
							placeholder: "请输入字典值备注",
							clearable: true,
							type: "textarea"
						}
					}
				}
			]
		}
	];

	return {
		columns
	};
};
