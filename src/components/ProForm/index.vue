<template>
	<div class="card content-box">
		<h4 class="title-box">{{ title }}</h4>
		<el-form v-bind="form" ref="proFormRef" :model="ruleForm">
			<el-row v-bind="rowProp">
				<template v-for="item in columns || []" :key="item.formItem.prop">
					<el-col v-bind="item.col">
						<template v-if="item.formList?.length">
							<FormList
								v-model="ruleForm"
								:row-prop="rowProp"
								:showOperation="showOperation"
								:aAttrsList="AAttrsList"
								:info="item"
								@on-add-form-item="handleAddFormItem"
								@on-remove-form-item="handleRemoveFormItem"
							/>
						</template>
						<template v-else>
							<!-- 正常表单 -->
							<el-form-item
								v-bind="item.formItem"
								v-if="!item?.formItem?.hidden?.(ruleForm, ruleForm[item.formItem.prop], item)"
							>
								<template v-if="item.formItem.labelTips" #label="{ label }">
									<div class="pro-form-item-label">
										<span>{{ label }}</span>
										<el-tooltip :content="item.formItem.labelTips" placement="top">
											<el-icon class="pro-form-item-label__tips" :size="16"><Warning /></el-icon>
										</el-tooltip>
									</div>
								</template>
								<component
									:is="((item.attrs.typeName === 'VNode' 
										? item.attrs.VNode?.(ruleForm[item.formItem.prop], ruleForm, item) 
										: item.attrs.typeName) as any)
									"
									v-if="item.attrs"
									v-bind="item.attrs.typeName === 'VNode' 
										? undefined : (item.attrs as any)[item.attrs.typeName]
									"
									:attrs="item.attrs.typeName !== 'VNode' && AAttrsList.includes(item.attrs.typeName)
										? (item.attrs as any)[item.attrs.typeName].attrs : undefined"
									:placeholder="showOperation ? (item.attrs as any)[item.attrs.typeName]?.placeholder : ``"
									v-model="ruleForm[item.formItem.prop]"
								/>
							</el-form-item>
						</template>
					</el-col>
				</template>
			</el-row>
			<slot name="operation">
				<el-form-item v-if="showOperation">
					<footer class="mt20 pt20 w-100-p flex-justify-between form-footer">
						<div class="footer-left">
							<el-button type="danger" icon="Refresh" @click="handleReset()"> 重置 </el-button>
						</div>
						<div class="footer-right">
							<el-button
								v-if="showContinuousCreate"
								type="primary"
								:loading="loading"
								icon="Connection"
								@click="handleSubmit(true)"
							>
								继续创建
							</el-button>
							<el-button type="primary" :loading="loading" icon="Edit" @click="handleSubmit()"> 提交 </el-button>
						</div>
					</footer>
				</el-form-item>
			</slot>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="ProForm">
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { mergeObject, deepCopy } from "@/utils/utils";
import mittBus from "@/utils/mittBus";
import FormList from "./components/form-list.vue";

import type {
	FormInstance,
	FormProps,
	FormItemProps,
	InputProps,
	DatePickerProps,
	InputNumberProps,
	SliderProps,
	SwitchProps,
	RowProps,
	ColProps
} from "element-plus";
import type { VNode } from "vue";
import type { RouteLocationRaw } from "vue-router";
import type { AUploadFileProps } from "@/components/AUpload/AUploadFile/index.vue";
import type { AUploadImgProps } from "@/components/AUpload/AUploadImg/index.vue";
import type { AUploadImgsProps } from "@/components/AUpload/AUploadImgs/index.vue";
import type { ASelectProps } from "@/components/ASelect/index.vue";
import type { ARadioProps } from "@/components/ARadio/index.vue";
import type { ACheckboxProps } from "@/components/ACheckbox/index.vue";
import type { ATreeFilterProps } from "@/components/ATreeFilter/index.vue";
import type { ARichEditorProps } from "@/components/ARichEditor/index.vue";
import type { AFormTableProps } from "@/components/AFormTable/index.vue";
import type { ASelectIconProps } from "@/components/ASelectIcon/index.vue";

export type DefaultValue = number | boolean | string | string[] | Record<string, any> | Record<string, any>[];

export type Attrs =
	| {
			typeName: "ElInput";
			ElInput?: {
				[P in keyof InputProps]?: InputProps[P];
			};
	  }
	| {
			typeName: "ElInputNumber";
			ElInputNumber?: {
				[P in keyof InputNumberProps]?: InputNumberProps[P];
			};
	  }
	| {
			typeName: "ElDatePicker";
			ElDatePicker?: {
				[P in keyof DatePickerProps]?: DatePickerProps[P];
			};
	  }
	| {
			typeName: "ElSlider";
			ElSlider?: {
				[P in keyof SliderProps]?: SliderProps[P];
			};
	  }
	| {
			typeName: "ElSwitch";
			ElSwitch?: {
				[P in keyof SwitchProps]?: SwitchProps[P];
			};
	  }
	| {
			typeName: "AUploadFile";
			AUploadFile?: {
				[P in keyof AUploadFileProps]?: AUploadFileProps[P];
			};
	  }
	| {
			typeName: "AUploadImg";
			AUploadImg?: {
				[P in keyof AUploadImgProps]?: AUploadImgProps[P];
			};
	  }
	| {
			typeName: "AUploadImgs";
			AUploadImgs?: {
				[P in keyof AUploadImgsProps]?: AUploadImgsProps[P];
			};
	  }
	| {
			typeName: "ASelect";
			ASelect?: {
				[P in keyof ASelectProps]?: ASelectProps[P];
			};
	  }
	| {
			typeName: "ARadio";
			ARadio?: {
				[P in keyof ARadioProps]?: ARadioProps[P];
			};
	  }
	| {
			typeName: "ACheckbox";
			ACheckbox?: {
				[P in keyof ACheckboxProps]?: ACheckboxProps[P];
			};
	  }
	| {
			typeName: "ATreeFilter";
			ATreeFilter?: {
				[P in keyof ATreeFilterProps]?: ATreeFilterProps[P];
			};
	  }
	| {
			typeName: "ARichEditor";
			ARichEditor?: {
				[P in keyof ARichEditorProps]?: ARichEditorProps[P];
			};
	  }
	| {
			typeName: "AFormTable";
			AFormTable?: {
				[P in keyof AFormTableProps]?: AFormTableProps[P];
			};
	  }
	| {
			typeName: "ASelectIcon";
			ASelectIcon?: {
				[P in keyof ASelectIconProps]?: ASelectIconProps[P];
			};
	  }
	| {
			typeName: "VNode";
			VNode: (
				value: DefaultValue,
				ruleForm: ProFormProps["info"],
				item: ColumnsProps,
				childrenItem?: Omit<ColumnsProps, "formList">
			) => VNode;
	  };

export interface ColumnsProps {
	formItem: {
		[P in keyof Omit<FormItemProps, "prop">]?: Omit<FormItemProps, "prop">[P];
	} & {
		/** 如果嵌套 meta.title */
		prop: string;
		defaultValue: DefaultValue;
		/** label tips */
		labelTips?: string;
		/** 是否隐藏 */
		hidden?: (ruleForm: { [key: string]: any }, value: any, item: ColumnsProps) => boolean;
	};
	col?: {
		[P in keyof ColProps]?: ColProps[P];
	};
	attrs?: Attrs;
	/** 动态表单 */
	formList?: Omit<ColumnsProps, "formList">[];
}

export interface ProFormProps {
	modelValue?: { [key: string]: any };
	title?: string;
	type: "create" | "update" | "look";
	rowProp?: {
		[P in keyof RowProps]?: RowProps[P];
	};
	form?: {
		[P in keyof FormProps]?: FormProps[P];
	};
	columns: ColumnsProps[];
	/** 值 */
	info?: { [key: string]: any };
	/** 接口的信息 */
	http?: {
		/** 接口 */
		api?: (params: any) => Promise<API.Response<any>>;
		/** params */
		params?: { [key: string]: any };
		/** 提交完返回的路由 */
		backRoute?: RouteLocationRaw;
	};
}

interface ProFromEmits {
	<T>(e: "on-submit", value: T): void;
	(e: "update:modelValue", value: ProFormProps["modelValue"]): void;
}

const props = withDefaults(defineProps<ProFormProps>(), {
	modelValue: () => ({}),
	type: "create",
	title: "",
	rowProp: undefined,
	form: undefined,
	columns: undefined,
	info: undefined,
	http: undefined
});

const emit = defineEmits<ProFromEmits>();
const router = useRouter();
const proFormRef = ref<FormInstance>();
const ruleForm = ref<any>({});
const loading = ref(false);

// 二次封装的formitem
const AAttrsList = [
	"AUploadFile",
	"AUploadImg",
	"AUploadImgs",
	"ASelect",
	"ARadio",
	"ACheckbox",
	"ATreeFilter",
	"ARichEditor",
	"AFormTable",
	"ASelectIcon"
];

// 显示操作栏
const showOperation = computed(() => props.type !== "look");
// 显示继续创建
const showContinuousCreate = computed(() => props.type === "create");

/**
 * 动态表单添加一项
 * @param item
 */
const addFormItem = (item: ColumnsProps, value?: any) => {
	const formData: any = {};
	//todo 数据没填进来
	for (const formItem of item.formList ?? []) {
		formData[formItem.formItem.prop] = value?.[formItem.formItem.prop] ?? formItem.formItem.defaultValue;
	}

	// 初始化为数组
	if (!ruleForm.value[item.formItem.prop]?.length) {
		ruleForm.value[item.formItem.prop] = [];
	}
	ruleForm.value[item.formItem.prop].push(formData);
};

/**
 * 校验动态表单并添加
 */
const handleAddFormItem = ({ item }: { item: ColumnsProps }) => {
	const validateField = ruleForm.value[item.formItem.prop]?.reduce((prev: string[], _: any, i: number) => {
		const value = item.formList?.map(childrenItem => `${item.formItem.prop}.${i}.${childrenItem.formItem.prop}`);
		prev = prev.concat(value ?? []);
		return prev;
	}, []);
	proFormRef.value?.validateField(validateField, valid => {
		if (valid) {
			addFormItem(item);
		}
	});
};

/**
 * 删除动态表单的一项
 */
const handleRemoveFormItem = ({ item, index }: { item: ColumnsProps; index: number }) => {
	if (ruleForm.value[item.formItem.prop].length > 1) {
		ruleForm.value[item.formItem.prop].splice(index, 1);
	}
};

/**
 * 设置默认数据
 * @description 如果有info就是编辑或者查看，将数据填进去，没有就是创建使用默认值
 */
const setRuleForm = () => {
	const info = deepCopy(props.info);
	for (const item of props.columns) {
		if (item.formList?.length) {
			// 有数据
			const values = info?.[item.formItem.prop];
			if (values?.length) {
				ruleForm.value[item.formItem.prop] = [];
				for (const listItem of values) {
					addFormItem(item, deepCopy(listItem));
				}
			} else {
				addFormItem(item);
			}
		} else if (item.formItem.prop.includes(".")) {
			// 嵌套属性 "meta.title"
			const propValue = item.formItem.prop.split(".")?.reduce((prev, cur, i, arr) => {
				if (i === arr.length - 1) {
					return prev?.[cur] ?? item.formItem.defaultValue;
				} else {
					return prev?.[cur] ?? {};
				}
			}, info);
			ruleForm.value[item.formItem.prop] = propValue;
		} else {
			// 正常 string
			ruleForm.value[item.formItem.prop] = info?.[item.formItem.prop] ?? item.formItem.defaultValue;
		}
	}
};

/**
 * 重置表单
 */
const handleReset = () => {
	proFormRef.value?.resetFields();
};

/**
 * 提交
 */
const handleSubmit = async (next = false) => {
	return await new Promise((resolve, reject) => {
		proFormRef.value?.validate(async valid => {
			if (valid) {
				// 格式表单数据
				const params: any = {};
				Object.keys(ruleForm.value).forEach(key => {
					if (key.includes(".")) {
						// 如果 prop 为 "meta.title"，手动拼接对象
						const keys = key.split(".");
						let origin: any = {};
						for (let i = keys.length - 1; i >= 0; i--) {
							origin = { [keys[i]]: i === keys.length - 1 ? ruleForm.value[key] : origin };
						}
						mergeObject(params, origin);
					} else {
						params[key] = ruleForm.value[key];
					}
				});
				if (props.http?.api) {
					loading.value = true;
					const submitParams = Object.assign({}, props.http?.params, params);
					props.http
						?.api?.(submitParams)
						?.then(res => {
							// 成功后返回
							if (next) {
								mittBus.emit("layout-refresh");
								const elMainEl = document.querySelector(".el-main");
								elMainEl?.scrollTo(0, 0);
							} else if (props.http?.backRoute) {
								router.push(props.http?.backRoute);
							} else {
								router.back();
							}
							ElMessage.success("提交成功");
							resolve(res);
						})
						.catch(error => {
							reject(error);
						})
						.finally(() => (loading.value = false));
				} else {
					emit("on-submit", params);
					resolve(params);
				}
			}
		});
	});
};

/**
 * 设置数据
 */
watch(
	() => props.info,
	() => setRuleForm(),
	{
		immediate: true,
		deep: true
	}
);

watch(
	ruleForm,
	val => {
		emit("update:modelValue", val);
	},
	{
		immediate: true,
		deep: true
	}
);

defineExpose({
	element: proFormRef,
	ruleForm,
	handleReset,
	handleSubmit
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
