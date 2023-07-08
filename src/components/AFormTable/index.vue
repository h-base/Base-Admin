<template>
	<div class="a-form-table w-100-p">
		<el-form ref="ATableFormRef" :model="selectValue" :disabled="self_disabled">
			<el-table :data="selectValue.list" :row-key="rowKey">
				<el-table-column v-for="item in columns" :key="item.prop" v-bind="item.columnsAttrs">
					<template #default="scope">
						<el-form-item v-bind="item.formItemAttrs" :prop="`list.${scope.$index}.${item.prop}`">
							<component
								:is="item.attrs.typeName"
								:label="`list.${scope.$index}.${item.prop}`"
								v-if="item.attrs"
								v-bind="(item.attrs as any)[item.attrs.typeName]"
								v-model="selectValue.list[scope.$index][item.prop]"
							/>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column align="center" width="150">
					<template #default="scope">
						<el-button
							type="danger"
							circle
							icon="Delete"
							:disabled="self_disabled"
							@click="handleDeleteColumn(scope.$index)"
						/>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
		<div class="mt20">
			<el-button type="primary" icon="Plus" circle :disabled="self_disabled" @click="handleAddColumn" />
		</div>
	</div>
</template>

<script setup lang="ts" name="AFormTable">
import { ref, computed, watch, inject } from "vue";
import { formContextKey, formItemContextKey } from "element-plus";
import { deepCopy } from "@/utils/utils";
import { generateUUID } from "@/utils";

import type { TableColumnCtx, FormItemProps, FormInstance } from "element-plus";
import type { DefaultValue, Attrs } from "@/components/ProForm/index.vue";

export type ColumnsProps = {
	columnsAttrs?: {
		[P in keyof Omit<TableColumnCtx<any>, "children" | "renderCell" | "renderHeader">]?: Omit<
			TableColumnCtx<any>,
			"children" | "renderCell" | "renderHeader"
		>[P];
	};
	formItemAttrs?: {
		[P in keyof Omit<FormItemProps, "prop" | "label">]?: Omit<FormItemProps, "prop" | "label">[P];
	};
	prop: string;
	defaultValue: DefaultValue;
	attrs?: Attrs;
};

export type AFormTableProps = {
	modelValue: { [key: string]: any }[];
	columns: ColumnsProps[];
	rowKey?: string;
	disabled?: boolean;
};

interface AFormTableEmits {
	(e: "update:modelValue", value: AFormTableProps["modelValue"]): void;
}

// 接受父组件参数
const props = withDefaults(defineProps<AFormTableProps>(), {
	modelValue: () => [],
	columns: () => [],
	rowKey: "id",
	disabled: undefined
});

const emits = defineEmits<AFormTableEmits>();

const ATableFormRef = ref<FormInstance>();
// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用
const self_disabled = computed(() => {
	return props.disabled || formContext?.disabled;
});

const selectValue = computed({
	get: () => ({
		list: props.modelValue?.map(item => {
			item[props.rowKey] = item[props.rowKey] ?? generateUUID();
			return item;
		})
	}),
	set: val => {
		emits("update:modelValue", val.list);
	}
});

const columnItem = computed(() => {
	const params: { [key: string]: any } = {};
	for (const item of props.columns) {
		params[item.prop] = item.defaultValue ?? "";
	}
	return params;
});

// 调用 el-form 内部的校验方法（可自动校验）
const formItemValidateField = (type: "parent" | "current") => {
	ATableFormRef.value?.validate(valid => {
		if (valid && type === "current" && formItemContext?.validateState === "error") {
			formContext?.validateField([formItemContext?.prop as string]);
		}
	});
};

// 删除一项
const handleDeleteColumn = (index: number) => {
	const origin = deepCopy(selectValue.value);
	origin.list.splice(index, 1);
	selectValue.value = origin;
};

// 添加一项
const handleAddColumn = () => {
	ATableFormRef.value?.validate(valid => {
		if (valid) {
			const origin = deepCopy(selectValue.value);
			origin.list.push({
				...columnItem.value,
				[props.rowKey]: generateUUID()
			});
			selectValue.value = origin;
		}
	});
};

watch(
	() => formItemContext?.validateState,
	() => {
		formItemValidateField("parent");
	},
	{
		immediate: true,
		deep: true
	}
);

watch(
	() => selectValue.value.list,
	() => {
		formItemValidateField("current");
	},
	{
		deep: true
	}
);
</script>

<style lang="scss" scoped>
.a-form-table {
	:deep(.el-table__cell) {
		.cell {
			padding-bottom: 20px;
		}
	}
	:deep(.el-form-item) {
		&.is-error {
			.el-input__wrapper {
				box-shadow: 0 0 0 1px var(--el-color-danger) inset;
			}
		}
		&:not(.is-error) {
			.el-input__wrapper {
				box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
			}
		}
	}
}
</style>
