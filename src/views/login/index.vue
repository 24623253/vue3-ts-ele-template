<template>
	<div class="login">
		<el-form ref="ruleFormRef" :model="loginForm" :rules="loginRules" class="login-form">
			<h3 class="title">核算后台管理系统</h3>
			<el-form-item prop="username" size="large">
				<el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
					<template #prefix>
						<!-- <svg-icon icon-class="user" class="el-input__icon input-icon" /> -->
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password" size="large">
				<el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
					@keyup.enter="handleLogin">
					<template #prefix>
						<!-- <svg-icon icon-class="password" class="el-input__icon input-icon" /> -->
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="code" v-if="captchaOnOff">
				<el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"
					@keyup.enter="handleLogin">
					<template #prefix>
						<!-- <svg-icon icon-class="validCode" class="el-input__icon input-icon" /> -->
					</template>
				</el-input>
				<div class="login-code">
					<img :src="codeUrl" @click="getCode" class="login-code-img" />
				</div>
			</el-form-item>
			<el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
			<el-form-item style="width:100%;">
				<el-button :loading="loading" type="primary" style="width:100%;" @click.prevent="handleLogin(ruleFormRef)">
					<span v-if="!loading">登 录</span>
					<span v-else>登 录 中...</span>
				</el-button>
				<div style="float: right;" v-if="register">
					<router-link class="link-type" :to="'/register'">立即注册</router-link>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const loginForm = ref({
  username: 'admin',
	password: 'admin123',
	rememberMe: false,
	code: '',
	uuid: '',
})
const temp = ref('liuhongwie')
const codeUrl = ref('');
const loading = ref(false);
// 验证码开关
const captchaOnOff = ref(true);
// 注册开关
const register = ref(false);
const redirect = ref(undefined);
// 验证规则
const loginRules = {
	username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
	password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
	code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
};
// const handleLogin = ()=>{

// }

const handleLogin = async (formEl: FormInstance | undefined) => {
  console.log(formEl,'>>>')
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!',loginForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang='scss' scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url('@/assets/images/login-background.jpg');
	background-size: cover;
}
.title {
	margin: 0px auto 30px auto;
	text-align: center;
	color: #707070;
}

.login-form {
	border-radius: 6px;
	background: #ffffff;
	width: 400px;
	padding: 25px 25px 5px 25px;
	.el-input {
		height: 38px;
		input {
			height: 38px;
		}
	}
	.input-icon {
		height: 39px;
		width: 14px;
		margin-left: 2px;
	}
}
.login-tip {
	font-size: 13px;
	text-align: center;
	color: #bfbfbf;
}
.login-code {
	width: 33%;
	height: 38px;
	float: right;
	img {
		cursor: pointer;
		vertical-align: middle;
	}
}
.el-login-footer {
	height: 40px;
	line-height: 40px;
	position: fixed;
	bottom: 0;
	width: 100%;
	text-align: center;
	color: #fff;
	font-family: Arial;
	font-size: 12px;
	letter-spacing: 1px;
}
.login-code-img {
	height: 38px;
}
</style>