<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="开始日期">
        <el-input v-model="formInline.start" placeholder="开始日期" />
      </el-form-item>
      <el-form-item label="结束日期">
        <el-input v-model="formInline.end" placeholder="结束日期" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">计算</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  const formInline = reactive({
    start: '',
    end: '',
  })

  const result = reactive({ count: 0 })

  const onSubmit = () => {
    console.log('submit!', formInline)
  }
</script>

<style lang="scss" scoped></style>
