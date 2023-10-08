<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';

// import * as particlesJS from 'particles.js';
export default defineComponent ({
  name: 'Login',
  setup() {
    interface LoginData {
      username: string;
      password: string;
    }

    const loginData = ref<LoginData>({
      username: '',
      password: '',
    });

    const loginRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    };

    onMounted(() => {
      (window as any).particlesJS.load('particles-js', '../../../particles.json', function () {
        console.log('particles.js loaded');
      });
    });

    const login = () => {
      // 处理登录逻辑
      console.log('登录');
    };

    return {
      loginData,
      loginRules,
      login,
    };
  },

});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <div id="particles-js"></div>
      <el-main>
        <div class="login-container">
          <el-card class="login-card" shadow="hover">
            <el-form ref="loginForm" :model="loginData" :rules="loginRules">
              <el-form-item class="login-form-item" prop="username">
                <el-input v-model="loginData.username" prefix-icon="UserFilled"></el-input>
              </el-form-item>
              <el-form-item  class="login-form-item" prop="password">
                <el-input type="password" v-model="loginData.password"  prefix-icon="Key"></el-input>
              </el-form-item>
              <el-form-item class="login-form-item">
                <el-button class="login-button" type="primary" @click="login">登录</el-button>
              </el-form-item>
              <el-form-item class="login-form-item">
                <el-button color="#626aef" plain class="login-button" @click="login">注册</el-button>
              </el-form-item>
            </el-form>
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
  /* height: 200px; */
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
</style>
