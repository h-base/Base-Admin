<template>
	<div>
		<ProForm v-bind="proFromData" v-model="ruleForm" @on-submit="handelSubmit" />
		<div class="card mt20">点击提交的数据： {{ ruleForm }}</div>
	</div>
</template>

<script setup lang="ts" name="form-dynamic">
import { useForm } from "./useForm";
const { proFromData, ruleForm, handelSubmit } = useForm();
</script>
