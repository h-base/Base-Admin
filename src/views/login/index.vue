<template>
	<div class="login-container flex-center">
		<div class="login-box bruce">
			<ul class="bubble-bgwall">
				<li>html</li>
				<li>css</li>
				<li>typescript</li>
				<li>vue3</li>
				<li>vite</li>
				<li>pinia</li>
			</ul>
			<SwitchDark class="dark" />
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.png" alt="" />
					<h2 class="logo-text">Base Admin</h2>
				</div>
				<LoginForm />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
@import "./bubble.scss";
</style>
