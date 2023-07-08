<template>
	<div>
		<ProForm v-bind="proFromData" />
	</div>
</template>

<script setup lang="ts" name="system-dict-update">
import { useUpdate } from "./useUpdate";
const { proFromData } = useUpdate();
</script>
