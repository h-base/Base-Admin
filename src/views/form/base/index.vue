<template>
	<div>
		<ProForm v-bind="proFromData" v-model="ruleForm" @on-submit="handelSubmit" />
		<div class="card mt20">v-model的数据： {{ ruleForm }}</div>
		<div class="card mt20">点击提交处理后的数据： {{ submitParams }}</div>
	</div>
</template>

<script setup lang="ts" name="form-base">
import { useForm } from "./useForm";
const { proFromData, ruleForm, submitParams, handelSubmit } = useForm();
</script>
