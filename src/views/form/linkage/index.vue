<template>
	<div>
		<ProForm v-bind="proFromData" v-model="ruleForm" />
		<div class="card mt20">点击提交的数据： {{ ruleForm }}</div>
	</div>
</template>

<script setup lang="ts" name="form-linkage">
import { useForm } from "./useForm";
const { proFromData, ruleForm } = useForm();
</script>
