<template>
  <div>
    <el-form ref="ruleFormRef" :model="loginData" :rules="loginRules" status-icon>
      <el-form-item class="login-form-item" prop="phone_num">
        <el-input v-model="loginData.phone_num" prefix-icon="UserFilled" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item  class="login-form-item" prop="password">
        <el-input type="password" v-model="loginData.password"  prefix-icon="Key" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="login-form-item">
        <el-button class="login-button" type="primary" @click="login(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from "vue";
import type { FormInstance, FormRules } from 'element-plus';

const { proxy } = getCurrentInstance() as any;

interface LoginData {
	phone_num: string;
	password: string;
}

const loginData = ref<LoginData>({
	phone_num: "",
	password: "",
});

const ruleFormRef = ref<FormInstance>();

const validatePhone = (rule: any, value: string, callback: any) => {
  console.log('shuang value', value);
  const pattern = /^1[0-9]{10}$/;
  if (!value) {
    callback(new Error('电话号码不能为空'));
  } else if (!pattern.test(value)) {
    callback(new Error('请输入正确的电话号码'));
  } else {
    callback();
  }
}

const loginRules = reactive<FormRules<LoginData>>({
  phone_num: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur',
    },
    {
      validate: validatePhone,
      trigger: 'change',
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ]
});


const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      // proxy?.$axios.post('/api/1.0/user/login', this.loginData).then( res => {

      // });
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.login-form-item {
  padding: 5px;
}

.login-button {
  width: 100vw;
}
</style>