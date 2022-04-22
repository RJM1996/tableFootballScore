<script setup lang="ts">
import { TabsPaneContext } from 'element-plus/lib/tokens';
import { ref, toRaw } from 'vue'

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
    <img alt="Vue logo" class="element-plus-logo" src="./assets/logo.png" />
    <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
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
  /* color: var(--el-text-color-primary); */
  font-size: 16px;
}

.element-plus-logo {
  width: 30%;
}
</style>
