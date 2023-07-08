<template>
	<el-form-item class="border_bottom">
		<template #label>
			<div class="bold">{{ info.formItem.label }}</div>
		</template>
	</el-form-item>
	<el-row class="border_bottom mb20" v-bind="rowProp">
		<!-- 动态表单 -->
		<template v-for="(ruleFormItem, ruleFormIndex) in ruleForm[info.formItem.prop]" :key="ruleFormIndex">
			<template v-for="childrenItem in info.formList || []" :key="childrenItem.formItem.prop">
				<el-col v-bind="childrenItem.col">
					<el-form-item
						v-bind="childrenItem.formItem"
						:prop="`${info.formItem.prop}.${ruleFormIndex}.${childrenItem.formItem.prop}`"
						:key="`${info.formItem.prop}.${ruleFormIndex}.${childrenItem.formItem.prop}`"
						v-if="!childrenItem?.formItem?.hidden?.(ruleForm, ruleForm[childrenItem.formItem.prop], childrenItem)"
					>
						<template v-if="childrenItem.formItem.labelTips" #label="{ label }">
							<div class="pro-form-item-label">
								<span>{{ label }}</span>
								<el-tooltip :content="childrenItem.formItem.labelTips" placement="top">
									<el-icon class="pro-form-item-label__tips" :size="16"><Warning /></el-icon>
								</el-tooltip>
							</div>
						</template>
						<component
							:key="`${info.formItem.prop}.${ruleFormIndex}.${childrenItem.formItem.prop}`"
							:is="
								((childrenItem.attrs.typeName === 'VNode'
									? childrenItem.attrs.VNode?.(ruleForm[info.formItem.prop], ruleForm, info, childrenItem)
									: childrenItem.attrs.typeName) as any)
							"
							v-if="childrenItem.attrs"
							v-bind="childrenItem.attrs.typeName === 'VNode' 
										? undefined : (childrenItem.attrs as any)[childrenItem.attrs.typeName]
									"
							:attrs="childrenItem.attrs.typeName !== 'VNode' && aAttrsList.includes(childrenItem.attrs.typeName)
										? (childrenItem.attrs as any)[childrenItem.attrs.typeName].attrs : undefined"
							:placeholder="showOperation ? (childrenItem.attrs as any)[childrenItem.attrs.typeName]?.placeholder : ``"
							v-model="ruleFormItem[childrenItem.formItem.prop]"
						/>
					</el-form-item>
				</el-col>
			</template>
			<el-col :span="24">
				<el-form-item>
					<div class="w-100-p text-r border_bottom pb20">
						<el-button type="danger" icon="Minus" @click="handleRemoveFormItem(info, ruleFormIndex)" />
					</div>
				</el-form-item>
			</el-col>
		</template>
		<el-col :span="24">
			<el-form-item>
				<div>
					<el-button type="primary" icon="Plus" @click="handleAddFormItem(info)" />
				</div>
			</el-form-item>
		</el-col>
	</el-row>
</template>
<script setup lang="ts" name="FormContent">
import { computed } from "vue";
import type { ProFormProps, ColumnsProps } from "../index.vue";

export type FormContentProps = {
	showOperation: boolean;
	aAttrsList: string[];
	info: ColumnsProps;
	modelValue?: { [key: string]: any };
	rowProp?: ProFormProps["rowProp"];
};

interface FormContentEmits {
	(e: "update:modelValue", value: FormContentProps["modelValue"]): void;
	(e: "onRemoveFormItem", value: { item: ColumnsProps; index: number }): void;
	(e: "onAddFormItem", value: { item: ColumnsProps }): void;
}

const props = withDefaults(defineProps<FormContentProps>(), {
	info: () => ({} as ColumnsProps),
	modelValue: () => ({}),
	rowProp: undefined
});

const emits = defineEmits<FormContentEmits>();

const ruleForm = computed({
	get: () => props.modelValue,
	set: val => {
		emits("update:modelValue", val);
		console.log('emits("update:modelValue", val)', val);
	}
});

const handleRemoveFormItem = (item: ColumnsProps, index: number) => {
	emits("onRemoveFormItem", { item, index });
};

const handleAddFormItem = (item: ColumnsProps) => {
	emits("onAddFormItem", { item });
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
