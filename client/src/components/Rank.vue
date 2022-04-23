<script setup lang="ts">
import { player } from './data';

defineProps<{ rankList: any[], loading: boolean }>();

// rank, name, big, small, num, score
const columns = [
  {
    key: 'rank',
    title: '排名',
    align: 'center',
    width: 80,
    slot: 'rank'
  },
  {
    title: "姓名",
    key: "name",
    align: "center",
    slot: "name"
  },
  {
    title: "积分",
    key: "score",
    align: "center",
    slot: "score"
  },
  {
    title: "获胜局数",
    key: "big",
    align: "center",
  },
  {
    title: "进球数",
    key: "small",
    align: "center",
  },
  {
    title: "场次",
    key: "num",
    align: "center",
  },
];

</script>

<template>
  <div>
    <p class="tip">积分计算规则: (获取局数*5 + 进球数) / 场次</p>
    <el-table :data="rankList" v-loading="loading" border stripe>
      <template v-for="col in columns">
        <el-table-column v-if="col.slot" :label="col.title">
          <template #default="scope">
            <div v-if="col.slot === 'name'" style="display: flex; align-items: center">
              <template v-for="p in player(scope.row, col.slot)">
                <el-tag>{{ p }}</el-tag>
              </template>
            </div>
            <div v-if="col.slot === 'score'" style="display: flex; align-items:">
              <el-tag>{{ scope.row.score }}</el-tag>
            </div>
            <span v-if="col.slot === 'rank'">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column v-else :label="col.title" :prop="col.key" :width="col.width" />
      </template>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.tip {
  font-size: 12px;
  color: #606266;
  text-align: left;
}
</style>