<template>
	<div>
		<ProForm v-bind="proFromData">
			<template #operation>
				<div />
			</template>
		</ProForm>
	</div>
</template>

<script setup lang="ts" name="system-account-detail">
import { useView } from "./useView";

const { proFromData } = useView();
</script>
