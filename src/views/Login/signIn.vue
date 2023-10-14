<template>
  <div>
  <el-form ref="signInForm" :model="signInData">
    <el-form-item prop="phone_num">
      <el-input v-model="signInData.phone_num" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item prop="phone_code">
      <div class="CodePass">
        <el-input v-model="signInData.phone_code" clearable placeholder="请输入验证码"></el-input>
        <el-button @click="getCode(ruleFormRef)" :disabled="countDown != 0">
          {{ countDown == 0 ? "获取验证码" : countDown + "后重新获取" }}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="signInData.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="signInData.password" placeholder="请确认密码"></el-input>
    </el-form-item>
    <el-form-item class="login-form-item">
        <el-button class="login-button" type="primary" @click="login">注册</el-button>
      </el-form-item>
  </el-form>
</div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from "vue";

interface signInData {
	phone_num: string;
	phone_code: string;
	password: string;
}

const signInData = ref<signInData>({
	phone_num: "",
	phone_code: "",
	password: "",
});

const countDown = ref<number>(0);

const getCode = (FormRules: any) => {
	FormRules.validateField("phone_num", (bool: boolean, b) => {
		if (bool) {
			countDown.value = 60;
			const Time = setInterval(() => {
				countDown.value = countDown.value - 1;
				if (countDown.value == 0) {
					clearTimeout(Time);
				}
			}, 1000);
		}
	});
}


</script>

<style scoped>
.CodePass {
	display: grid;
	grid-template-columns: 3fr 0.3fr;
	gap: 10px;
}

.login-button {
  width: 100vw;
}
</style>
