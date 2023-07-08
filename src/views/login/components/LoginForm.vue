<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="userName">
			<el-input v-model="loginForm.userName" placeholder="用户名：admin / user">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				v-model="loginForm.password"
				type="password"
				placeholder="密码：123456"
				show-password
				autocomplete="new-password"
			>
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button icon="CircleClose" round size="large" @click="resetForm()">重置</el-button>
		<el-button icon="UserFilled" round size="large" type="primary" :loading="loading" @click="handleLogin()">
			登录
		</el-button>
	</div>
</template>

<script setup lang="ts">
import { useLogin } from "./useLogin";
const { loginFormRef, loginForm, loginRules, loading, resetForm, handleLogin } = useLogin();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
