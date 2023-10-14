<script lang="ts" setup>
import { ref, onMounted, defineComponent } from 'vue';
import SignIn from './signIn.vue';
import Login from './login.vue';
import HelloWorld from '../HelloWorld.vue';

import type { TabsPaneContext } from 'element-plus'
// import * as particlesJS from 'particles.js';

interface LoginData {
  username: string;
  password: string;
}

interface signInData {
	phone_num: string;
	phone_code: string;
	password: string;
  confirmPassword: string;

}

const loginData = ref<LoginData>({
  username: '',
  password: '',
});

const signInData = ref<signInData>({
	phone_num: "",
	phone_code: "",
	password: "",
  confirmPassword: "",
});

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
};
const countDown = ref<number>(0);

onMounted(() => {
  (window as any).particlesJS.load('particles-js', '../../../particles.json', function () {
    console.log('particles.js loaded');
  });
});
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

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const login = () => {
  // 处理登录逻辑
  console.log('登录');
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <div id="particles-js"></div>
      <el-main>
        <div class="login-container">
          <el-card class="login-card" shadow="hover">
            <el-tabs
              v-model="activeName"
              type="card"
              class="tabs"
              @tab-click="handleClick"
              :stretch=true
            >
              <el-tab-pane label="登录" name="login">
                <div style="margin-top: 20px">
                  <Login />
                </div>
              </el-tab-pane>
                <el-tab-pane label="注册" name="signIn">
                  <div style="margin-top: 20px">
                    <SignIn />
                </div>
                </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
  height: 350px;
  padding: 40px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-form-item {
  padding: 10px;
}

.login-button {
  width: 100vw;
}

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.CodePass {
	display: grid;
	grid-template-columns: 2fr 0.3fr;
	gap: 10px;
}
</style>
