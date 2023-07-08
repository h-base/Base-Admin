import { ref } from "vue";
import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useForm = () => {
	const ruleForm = ref({});

	const proFromData: ProFormProps = {
		title: "动态表单",
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
					prop: "list",
					defaultValue: [],
					label: "动态表单-列表",
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入用户名",
						clearable: true
					}
				},
				formList: [
					{
						formItem: {
							prop: "input",
							defaultValue: "",
							label: "输入框1",
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
							prop: "input2",
							defaultValue: "",
							label: "输入框2",
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
							prop: "radio",
							defaultValue: "",
							label: "单选"
						},
						attrs: {
							typeName: "ARadio",
							ARadio: {
								options: [
									{
										label: "单选1",
										value: 1
									},
									{
										label: "单选2",
										value: 2
									},
									{
										label: "单选3 (禁用)",
										value: 3,
										disabled: true
									}
								]
							}
						}
					}
				]
			},
			{
				formItem: {
					prop: "slider",
					defaultValue: 10,
					label: "滑块"
				},
				attrs: {
					typeName: "ElSlider",
					ElSlider: {}
				}
			},
			{
				formItem: {
					prop: "table",
					defaultValue: [],
					label: "动态表单-表格",
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "AFormTable",
					AFormTable: {
						columns: [
							{
								prop: "input",
								defaultValue: "",
								columnsAttrs: {
									label: "输入框"
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
								prop: "select",
								defaultValue: "",
								columnsAttrs: {
									label: "单选框"
								},
								attrs: {
									typeName: "ARadio",
									ARadio: {
										options: [
											{
												label: "单选1",
												value: 1
											},
											{
												label: "单选2",
												value: 2
											},
											{
												label: "单选3 (禁用)",
												value: 3,
												disabled: true
											}
										]
									}
								}
							}
						]
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
