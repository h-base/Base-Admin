<template>
	<div>
		<ProForm v-model="ruleForm" v-bind="proFromData" />
	</div>
</template>

<script setup lang="ts" name="system-account-create">
import { useCreate } from "./useCreate";
const { proFromData, ruleForm } = useCreate();
</script>
