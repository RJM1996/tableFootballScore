<script setup lang="ts">
import { ref, toRaw, reactive, onMounted, computed } from 'vue'
import { Soccer } from '@icon-park/vue-next'
import axios from '~/common/axios'

interface RankData {
  scoreList: any[],
  rankList: any[],
}
const gameData = reactive<RankData>({
  scoreList: [],
  rankList: []
})
onMounted(() => {
  getRankData()
})
const getRankData = () => {
  loading.value = true
  axios.get(`/rank?season=${season.value}`).then((result: any) => {
    console.log(result)
    const { code, data = {}, msg } = result.data || {}
    if (code === 200) {
      gameData.scoreList = data.scoreList
      gameData.rankList = data.rankList
    }
    loading.value = false
  }).catch((err: any) => {
    console.error(err)
    loading.value = false
  });
}
const seasonOpts = [
  {
    label: 'S10',
    value: 10
  },
  {
    label: 'S9',
    value: 9
  },
  {
    label: 'S8',
    value: 8
  },
  {
    label: 'S7',
    value: 7
  },
  {
    label: 'S6',
    value: 6
  },
  {
    label: 'S5',
    value: 5
  },
  {
    label: 'S4',
    value: 4
  },
  {
    label: 'S3',
    value: 3
  },
  {
    label: 'S2',
    value: 2
  },
  {
    label: 'S1',
    value: 1
  },
]
const season = ref(seasonOpts[0].value)
const onSeasonChange = () => {
  getRankData()
}
const loading = ref(false)


const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
  console.log(currentPath.value)
})
const isAdmin = computed(() => {
  const isAdmin = currentPath.value.includes('admin')
  return isAdmin
})
</script>

<template>
  <div>
    <div class="title">
      <Soccer theme="filled" size="40" fill="#333" />
      <span>桌上足球俱乐部</span>
    </div>
    <div>
      <div class="season">
        <span>当前赛季</span>
        <el-select v-model="season" style="width:100px" @change="onSeasonChange">
          <el-option
            v-for="item in seasonOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <Rank :rank-list="gameData.rankList" :loading="loading"></Rank>
      <ScoreList
        :loading="loading"
        :score-list="gameData.scoreList"
        :season="season"
        :isAdmin="isAdmin"
        @onSuccess="getRankData"
      ></ScoreList>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  height: initial;
  width: 850px;
  margin: 0 auto;
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
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-right: 5px;
  }
}

.element-plus-logo {
  width: 30%;
}
.el-input__inner {
  font-size: 18px;
}
</style>
