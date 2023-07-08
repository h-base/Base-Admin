import { ref } from "vue";
import type { ProFormProps } from "@/components/ProForm/index.vue";

interface RuleFormProps {
	input: string;
	password: string;
	password2: string;
	select: number;
	linkage: string;
}

export const useForm = () => {
	const ruleForm = ref<RuleFormProps>({} as RuleFormProps);

	const proFromData: ProFormProps = {
		title: "表单联动",
		type: "create",
		form: {
			labelWidth: "130px"
		},
		columns: [
			{
				formItem: {
					prop: "input",
					defaultValue: "",
					label: "输入框",
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入",
						clearable: true
					}
				}
			},
			{
				formItem: {
					prop: "password",
					defaultValue: "",
					label: "密码",
					labelTips: "密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符(!@#$%^&*?)",
					rules: [
						{ required: true, message: "必填", trigger: ["blur", "change"] },
						{
							validator: (_, value: string, callback) => {
								const reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
								if (reg.test(value)) {
									callback();
								} else {
									callback(
										new Error(
											"密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符(!@#$%^&*?)"
										)
									);
								}
							}
						}
					]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入",
						showPassword: true,
						clearable: true
					}
				}
			},
			{
				formItem: {
					prop: "password2",
					defaultValue: "",
					label: "确认密码",
					rules: [
						{ required: true, message: "必填", trigger: ["blur", "change"] },
						{
							validator: (_, value: string, callback) => {
								if (ruleForm.value.password === value) {
									callback();
								} else {
									callback(new Error("和密码框不一致"));
								}
							}
						}
					]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入",
						showPassword: true,
						clearable: true
					}
				}
			},
			{
				formItem: {
					prop: "select",
					defaultValue: "",
					label: "联动选择",
					labelTips: "选择类型2隐藏【联动输入框】"
				},
				attrs: {
					typeName: "ASelect",
					ASelect: {
						options: [
							{
								label: "类型1",
								value: 1
							},
							{
								label: "类型2",
								value: 2
							}
						]
					}
				}
			},
			{
				formItem: {
					prop: "linkage",
					defaultValue: "",
					label: "联动输入框",
					hidden: info => {
						if (info.select === 2) {
							ruleForm.value.linkage = "";
						}
						return info.select === 2;
					},
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入",
						clearable: true
					}
				}
			}
		]
	};

	const handelSubmit = (data: any) => {
		ruleForm.value = data;
	};

	return {
		proFromData,
		ruleForm,
		handelSubmit
	};
};
