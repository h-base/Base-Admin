<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<AssemblySize id="assemblySize" />
			<SearchMenu id="searchMenu" />
			<ThemeSetting id="themeSetting" />
			<Message id="message" />
			<Fullscreen id="fullscreen" />
		</div>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import AssemblySize from "./components/AssemblySize.vue";
import SearchMenu from "./components/SearchMenu.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import Message from "./components/Message.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 25px;
	.header-icon {
		display: flex;
		align-items: center;
		& > * {
			margin-left: 21px;
		}
	}
}
</style>
