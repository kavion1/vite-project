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
      <el-input v-model="signInData.confirm" placeholder="请确认密码"></el-input>
    </el-form-item>
    <el-form-item class="login-form-item">
        <el-button class="login-button" type="primary" @click="handleRegister">注册</el-button>
      </el-form-item>
  </el-form>
</div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, defineProps } from "vue";
const { proxy } = getCurrentInstance() as any;
import { Md5 } from "ts-md5";

interface SignInData {
	phone_num: string;
	phone_code: string;
	password: string;
  confirm: 'string'

}

let signInData = ref<SignInData>({
	phone_num: "",
	phone_code: "",
	password: "",
  confirm: ''
});


const countDown = ref<number>(0);

const emits = defineEmits(['getActiveName']);

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

const handleRegister = () => {
  console.log('shuang signInData', signInData.value)
  const params = {
    phone_num: signInData._value.phone_num,
    phone_code: signInData._value.password,
    password: signInData._value.password,
  }
  proxy?.$axios.post('/apis/api/1.0/user/register', {
    ...params,
    password: Md5.hashStr(signInData._value.password)
  }).then( res => {

    if (res.re_code === '0') {
      signInData = {
        phone_num: "",
        phone_code: "",
        password: "",
        confirm: '',
      };
      ElMessage({
        message: '注册成功',
        type: 'success',
      });
      setTimeout(() => {
          emits('getActiveName', 'login');
      }, 500);
    } else {
      ElMessage({
        message: res.msg || '注册失败',
        type: 'error',
      });
    }
  });
};
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
