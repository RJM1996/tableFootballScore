<template>
  <div class="table">
    <!-- search form -->
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="选手">
        <el-select v-model="formData.player" placeholder="选手">
          <el-option v-for="player in playerOpts" :label="player.label" :value="player.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table :data="tableData" border stripe max-height="600">
      <template v-for="col in columns">
        <el-table-column v-if="col.slot" :label="col.title">
          <template #default="scope">
            <div v-if="col.slot === 'time'" style="display: flex; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.time }}</span>
            </div>
            <div
              v-if="['winner', 'loser'].includes(col.slot)"
              style="display: flex; align-items: center"
            >
              <template v-for="p in player(scope.row, col.slot)">
                <el-tag
                  :type="col.slot === 'loser' ? 'danger' : 'success'"
                  style="margin-left: 10px"
                >{{ p }}</el-tag>
              </template>
            </div>
            <div v-if="['score'].includes(col.slot)" style="display: flex; align-items: center">
              <el-tag style="margin-left: 10px">{{ score(scope.row.score) }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else :label="col.title" :prop="col.key" :width="col.width" />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Timer } from '@element-plus/icons-vue'
import { scoreList, playerOpts } from './data'

// 时间, 比分, 胜方, 败方
const columns = [
  {
    key: 'id',
    title: 'ID',
    align: 'center',
    width: 80,
  },
  {
    title: "时间",
    key: "time",
    align: "center",
    slot: "time"
  },
  {
    title: "比分",
    key: "score",
    align: "center",
    slot: "score"
  },
  {
    title: "胜方",
    key: "winner",
    align: "center",
    slot: "winner"
  },
  {
    title: "败方",
    key: "loser",
    align: "center",
    slot: "loser"
  }
];
const tableData = scoreList.reverse()

const formData = ref({
  player: "yan",
})
const player = computed(() => {
  return (row, key) => {
    const names = row[key].map(r => {
      return playerOpts.find(p => p.value === r).label
    })
    return names
  }
})
const score = computed(() => {
  return (scoreArr) => `${scoreArr[0]} : ${scoreArr[1]}`
})
const onSubmit = () => {
  console.log(formData.value)
}
</script>

<style scoped>
.table {
  margin: 20px;
}
</style>
