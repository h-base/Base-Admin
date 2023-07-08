/*
 **全局注册组件
 */
import { defineAsyncComponent } from "vue";
import type { App } from "vue";

// components下所有的index.vue自动注册
const components = import.meta.glob("@/components/**/**/index.vue");

export function setupComponents(app: App) {
	for (const [key, value] of Object.entries(components)) {
		const name = key
			.split("/")
			?.slice(-2)?.[0]
			?.replace(/(\.\/|\.vue)/g, "");
		app.component(name, defineAsyncComponent(value as any));
	}
}
