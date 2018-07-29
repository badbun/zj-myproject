<template>
  <div>
    <div class="demo"><p>777</p>this is test xxx</div>
    <el-button @click="startHacking">测试测试</el-button>
    <el-input v-model="username" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" placeholder="请输入密码"></el-input>
    <el-button @click="dologin">登录登录登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    startHacking() {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: '哎哟，成功啦！',
        duration: 5000,
      });
    },
    dologin() {
      this.$http.post('/sol/zh/login', {
        username: this.username,
        password: this.password,
      }).then(() => {
        this.$notify({
          title: 'It works!',
          type: 'success',
          message: '登录成功',
          duration: 2000,
        });
      });
    },
  },
};
</script>
<style lang="scss">
.demo {
  border:1px solid red;
  p {
    border:1px solid blue;
  }
}
</style>