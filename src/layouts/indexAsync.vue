<!-- 💥 这里是异步加载 LayoutComponents -->
<template>
	<suspense>
		<template #default>
			<component :is="LayoutComponents[layout]" />
		</template>
		<template #fallback>
			<ALoading />
		</template>
	</suspense>
	<ThemeDrawer />
</template>

<script setup lang="ts" name="layoutAsync">
import { computed, defineAsyncComponent, type Component } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import ALoading from "@/components/ALoading/index.vue";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import type { GlobalState } from "@/stores/modules/global/typing";

const LayoutComponents: Record<GlobalState["layout"], Component> = {
	vertical: defineAsyncComponent(() => import("./LayoutVertical/index.vue")),
	classic: defineAsyncComponent(() => import("./LayoutClassic/index.vue")),
	transverse: defineAsyncComponent(() => import("./LayoutTransverse/index.vue")),
	columns: defineAsyncComponent(() => import("./LayoutColumns/index.vue"))
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>

<style scoped lang="scss">
.layout {
	min-width: 730px;
}
</style>
