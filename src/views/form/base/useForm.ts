import { ref } from "vue";
import { enum_base_sex_options } from "@/enum/base";
import authMenuList from "@/assets/json/authMenuList.json";
import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useForm = () => {
	const ruleForm = ref({});
	const submitParams = ref({});

	const proFromData: ProFormProps = {
		title: "基础表单（实际应用在 system/account/create）",
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
					prop: "meta.input",
					defaultValue: "",
					label: "属性嵌套"
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
					prop: "textarea",
					defaultValue: "",
					label: "多行文本"
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入多行文本",
						type: "textarea",
						clearable: true
					}
				}
			},
			{
				formItem: {
					prop: "password",
					defaultValue: "",
					label: "密码框",
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
					prop: "number",
					defaultValue: 0,
					label: "数字"
				},
				attrs: {
					typeName: "ElInputNumber",
					ElInputNumber: {
						placeholder: "请输入"
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
			},
			{
				formItem: {
					prop: "checkbox",
					defaultValue: [],
					label: "多选"
				},
				attrs: {
					typeName: "ACheckbox",
					ACheckbox: {
						showCheckAll: true,
						options: [
							{
								label: "多选1",
								value: 1
							},
							{
								label: "多选2",
								value: 2
							},
							{
								label: "多选3 (禁用)",
								value: 3,
								disabled: true
							}
						]
					}
				}
			},
			{
				formItem: {
					prop: "select",
					defaultValue: "",
					label: "下拉"
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
					prop: "datepick",
					defaultValue: "",
					label: "日期"
				},
				attrs: {
					typeName: "ElDatePicker",
					ElDatePicker: {
						type: "datetime",
						valueFormat: "YYYY-MM-DD HH:mm:ss"
					}
				}
			},
			{
				formItem: {
					prop: "datetimerange",
					defaultValue: [],
					label: "日期区间"
				},
				attrs: {
					typeName: "ElDatePicker",
					ElDatePicker: {
						type: "datetimerange",
						valueFormat: "YYYY-MM-DD HH:mm:ss"
					}
				}
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
					prop: "img",
					defaultValue: "",
					label: "图片"
				},
				attrs: {
					typeName: "AUploadImg",
					AUploadImg: {
						fileSize: 1
					}
				}
			},
			{
				formItem: {
					prop: "imgs",
					defaultValue: [],
					label: "多张图片"
				},
				attrs: {
					typeName: "AUploadImgs",
					AUploadImgs: {
						limit: 3
					}
				}
			},
			{
				formItem: {
					prop: "file",
					defaultValue: [],
					label: "文件"
				},
				attrs: {
					typeName: "AUploadFile",
					AUploadFile: {}
				}
			},
			{
				formItem: {
					prop: "status",
					defaultValue: true,
					label: "开关"
				},
				attrs: {
					typeName: "ElSwitch",
					ElSwitch: {}
				}
			},
			{
				formItem: {
					prop: "aTreeFilter",
					defaultValue: [],
					label: "树控件",
					labelTips: "权限控制在 system/role/useColumns"
				},
				attrs: {
					typeName: "ATreeFilter",
					ATreeFilter: {
						data: authMenuList.data,
						isAuth: false,
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
					prop: "ARichEditor",
					defaultValue: "",
					label: "富文本"
				},
				attrs: {
					typeName: "ARichEditor",
					ARichEditor: {}
				}
			}
		]
	};

	const handelSubmit = (data: any) => {
		submitParams.value = data;
	};

	return {
		proFromData,
		ruleForm,
		submitParams,
		handelSubmit
	};
};
