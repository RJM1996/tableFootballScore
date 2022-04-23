<script setup lang="ts">
import { TabsPaneContext } from 'element-plus/lib/tokens';
import { ref, toRaw } from 'vue'
import { Soccer } from '@icon-park/vue-next'

let activeTab = ref('list')
const tabs = [
  { label: '排名榜', name: 'rank' },
  { label: '场次记录', name: 'list' }
]
const handleClick = (pane: TabsPaneContext, ev: Event) => {
  const curTab: any = toRaw(pane.paneName)
  console.log(curTab)
  activeTab = curTab
}
</script>

<template>
  <div>
    <div class="title">
      <Soccer theme="filled" size="40" fill="#333" />
      <span>桌上足球俱乐部</span>
    </div>
    <div>
      <h2 class="season">当前赛季: S9</h2>
      <Rank></Rank>
      <ScoreList></ScoreList>
    </div>
    <el-tabs v-if="false" v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name">
        <ScoreList v-if="tab.name === 'list'"></ScoreList>
        <template v-if="tab.name === 'rank'">
          <Rank></Rank>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
#app {
  height: initial;
  padding: 40px;
  text-align: center;
  font-size: 16px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  gap: 10px;
}
.season {
  font-size: 18px;
  font-weight: bold;
}

.element-plus-logo {
  width: 30%;
}
</style>
