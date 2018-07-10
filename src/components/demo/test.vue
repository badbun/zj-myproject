<template>
  <div>
    <div class="demo"><p>777</p>this is test xxx</div>
    <el-button @click="startHacking">Start</el-button>
  </div>
</template>

<script>
export default {
    methods: {
        startHacking() {
            this.$notify({
                title: 'It works!',
                type: 'success',
                message: '哎哟，成功啦！',
                duration: 5000,
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