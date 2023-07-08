<template>
	<div>
		<ProForm v-bind="proFromData" />
	</div>
</template>

<script setup lang="ts" name="system-menu-create">
import { useCreate } from "./useCreate";
const { proFromData } = useCreate();
</script>
