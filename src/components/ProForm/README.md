# 目前只有 `TypeMap` 的这几种，后续用到其他再添加

```typescript
const proFromData: ProFormProps = {
	title: "创建",
	type: "create",
	info: undefined,
	form: {
		labelWidth: "130px"
	},
	columns: [
		{
			formItem: {
				prop: "username",
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
				prop: "date",
				defaultValue: "",
				label: "日期",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElDatePicker",
				ElDatePicker: {
					type: "datetime",
					format: "YYYY/MM/DD HH:mm:ss",
					valueFormat: "YYYY/MM/DD HH:mm:ss",
					placeholder: "请选择日期",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "date2",
				defaultValue: "",
				label: "一段日期",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElDatePicker",
				ElDatePicker: {
					type: "daterange",
					format: "YYYY/MM/DD",
					valueFormat: "YYYY/MM/DD",
					placeholder: "请选择日期",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "img",
				defaultValue: "",
				label: "头像",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "AUploadImg"
			}
		},
		{
			formItem: {
				prop: "imgs",
				defaultValue: [],
				label: "头像列表",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "AUploadImgs",
				AUploadImgs: {
					limit: 10
				}
			}
		},
		{
			formItem: {
				prop: "file",
				defaultValue: { name: "文件.doc", url: "http://localhost:8848/#/system/account/post", id: 1 },
				label: "文件",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "AUploadFile",
				AUploadFile: {}
			}
		},
		{
			formItem: {
				prop: "role",
				defaultValue: "",
				label: "下拉选择",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ASelect",
				ASelect: {
					placeholder: "请选择",
					remote: true,
					remoteMethod: () => {
						return [
							{ label: "option1", value: 1 },
							{ label: "option2", value: 2 }
						];
					}
				}
			}
		},
		{
			formItem: {
				prop: "radio",
				defaultValue: "",
				label: "单选",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ARadio",
				ARadio: {
					options: [
						{ label: "选项1", value: 1 },
						{ label: "选项2", value: 2 }
					]
				}
			}
		},
		{
			formItem: {
				prop: "checkbox",
				defaultValue: [],
				label: "多选",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ACheckbox",
				ACheckbox: {
					showCheckAll: true,
					options: [
						{ label: "选项1", value: 1 },
						{ label: "选项2", value: 2 }
					]
				}
			}
		},
		{
			formItem: {
				prop: "meta.title",
				defaultValue: "",
				label: "属性嵌套",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入菜单名称",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "menu",
				defaultValue: [],
				label: "树结构",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ATreeFilter",
				ATreeFilter: {
					data: authMenuList.data,
					multiple: true,
					id: "name",
					label: "path"
				}
			}
		},
		{
			formItem: {
				prop: "status",
				defaultValue: true,
				label: "开关",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElSwitch",
				ElSwitch: {}
			}
		},
		{
			formItem: {
				prop: "forms",
				defaultValue: [],
				label: "动态表单",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入动态表单",
					clearable: true
				}
			},
			formList: [
				{
					formItem: {
						prop: "name",
						defaultValue: "",
						label: "动态输入框1",
						rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
					},
					attrs: {
						typeName: "ElInput",
						ElInput: {
							placeholder: "请输入name",
							clearable: true
						}
					}
				},
				{
					formItem: {
						prop: "age",
						defaultValue: "",
						label: "动态输入框2",
						rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
					},
					attrs: {
						typeName: "ElInput",
						ElInput: {
							placeholder: "请输入name",
							clearable: true
						}
					}
				}
			]
		},
		{
			formItem: {
				prop: "rich",
				defaultValue: "",
				label: "富文本",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ARichEditor",
				ARichEditor: {}
			}
		},
		// 数字输入框
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
					placeholder: "请输入序号",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "vnode",
				defaultValue: "123",
				label: "VNode"
			},
			attrs: {
				typeName: "VNode",
				VNode: (value, info, item) =>
					createVNode("div", { class: ["class1", "class2"], type: `${item.formItem.prop}` }, value)
			}
		}
	]
};
```
