import { useEnumOption } from "./useEnumOption";
import { useAuthStore } from "@/stores/modules/auth";
import { enum_system_router_meta_type } from "@/enum/system";
import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useColumns = () => {
	const { routerMetaType } = useEnumOption();
	const authStore = useAuthStore();
	const columns: ProFormProps["columns"] = [
		{
			formItem: {
				prop: "parentId",
				defaultValue: "",
				label: "上级菜单"
			},
			attrs: {
				typeName: "ASelect",
				ASelect: {
					attrs: {
						placeholder: "请选择",
						clearable: true,
						remote: true,
						remoteMethod: async () => {
							const list = authStore.flatMenuListGet.filter(it => it.meta.type !== enum_system_router_meta_type.button);
							return list?.map(item => {
								return {
									label: item.meta.title,
									value: item.name
								};
							});
						}
					}
				}
			}
		},
		{
			formItem: {
				prop: "meta.type",
				defaultValue: "",
				label: "路由类型",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ASelect",
				ASelect: {
					options: routerMetaType
				}
			}
		},
		{
			formItem: {
				prop: "name",
				defaultValue: "",
				label: "路由名字",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入路由名字",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "path",
				defaultValue: "",
				label: "路由路径",
				rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入路由路径",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "redirect",
				defaultValue: "",
				label: "路由重定向路径"
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入路由重定向路径",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "component",
				defaultValue: "",
				label: "组件路径"
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入组件路径",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "meta.title",
				defaultValue: "",
				label: "菜单名称",
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
				prop: "meta.icon",
				defaultValue: "",
				label: "菜单图标"
			},
			attrs: {
				typeName: "ASelectIcon",
				ASelectIcon: {
					attrs: {
						placeholder: "请选择菜单图标",
						clearable: true
					}
				}
			}
		},
		{
			formItem: {
				prop: "meta.activeMenu",
				defaultValue: "",
				label: "菜单高亮路径"
			},
			attrs: {
				typeName: "ElInput",
				ElInput: {
					placeholder: "请输入菜单高亮路径",
					clearable: true
				}
			}
		},
		{
			formItem: {
				prop: "meta.isHide",
				defaultValue: false,
				label: "菜单是否隐藏"
			},
			attrs: {
				typeName: "ElSwitch",
				ElSwitch: {}
			}
		},
		{
			formItem: {
				prop: "meta.isFull",
				defaultValue: false,
				label: "菜单是否全屏"
			},
			attrs: {
				typeName: "ElSwitch",
				ElSwitch: {}
			}
		},
		{
			formItem: {
				prop: "meta.isAffix",
				defaultValue: false,
				label: "是否固定标签页"
			},
			attrs: {
				typeName: "ElSwitch",
				ElSwitch: {}
			}
		},
		{
			formItem: {
				prop: "meta.isKeepAlive",
				defaultValue: false,
				label: "路由是否缓存"
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
		columns
	};
};
