<template>
  <div>
    <h1>Rank</h1>
    <el-table :data="rankList" border stripe max-height="600">
      <template v-for="col in columns">
        <!-- <el-table-column v-if="col.slot" :label="col.title">
          <template #default="scope">
            <div v-if="col.slot === 'time'" style="display: flex; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.time }}</span>
            </div>
          </template>
        </el-table-column>-->
        <el-table-column :label="col.title" :prop="col.key" :width="col.width" />
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const rankList = [
  { name: 'xu  ', big: 27, small: 340, num: 39, score: '12.18' },
  { name: 'ming', big: 25, small: 356, num: 43, score: '11.19' },
  { name: 'yan ', big: 17, small: 281, num: 36, score: '10.17' },
  { name: 'bing', big: 11, small: 199, num: 28, score: '9.07' },
  { name: 'yu  ', big: 12, small: 270, num: 38, score: '8.68' }
]
// rank, name, big, small, num, score
const columns = [
  {
    key: 'rank',
    title: '排名',
    align: 'center',
    width: 80,
  },
  {
    title: "姓名",
    key: "name",
    align: "center",
    slot: "name"
  },
  {
    title: "获胜局数",
    key: "big",
    align: "center",
    slot: "big"
  },
  {
    title: "进球数",
    key: "small",
    align: "center",
    slot: "small"
  },
  {
    title: "场次",
    key: "num",
    align: "center",
    slot: "num"
  },
  {
    title: "积分",
    key: "score",
    align: "center",
    slot: "score"
  }
];

</script>

<style lang="scss" scoped>
</style>