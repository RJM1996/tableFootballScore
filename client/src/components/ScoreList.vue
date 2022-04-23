<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineProps, toRaw } from "vue";
import { Timer, Plus } from '@element-plus/icons-vue'
import { playerOpts, player } from './data'
import { AddOne, Delete } from '@icon-park/vue-next'
import { ElMessage, FormInstance } from "element-plus";
import axios from "~/common/axios";

const props = defineProps<{ scoreList: any[], season: number, loading: boolean, isAdmin: boolean }>();
const emit = defineEmits(['onSuccess'])

const tableData = computed(() => {
  return props.scoreList.reverse()
})

const tableColumns = computed(() => {
  return props.isAdmin ? columns : columns.filter(col => col.key !== 'action')
})

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
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    slot: "action"
  }
];

const score = computed(() => {
  return (scoreArr: number[]) => `${scoreArr[0]} : ${scoreArr[1]}`
})

const addFormRef = ref<FormInstance>()
const onSubmit = () => {
  addFormRef.value?.validate((valid, fields) => {
    if (valid) {
      const req = {
        season: props.season,
        games: toRaw(addGameFormList.items)
      }
      console.log(req)
      addGame(req)
    } else {
      console.log('error submit!', fields)
    }
  })
}
const addGame = (req = {}) => {
  axios.post('/add', req).then((result) => {
    console.log(result)
    const { code, msg } = result.data
    if (code == 200) {
      emit('onSuccess')
      showAddModal.value = false
      ElMessage.success('添加成功')
    }
  }).catch((err) => {
    console.error(err)
  });
}

let showAddModal = ref(false)
const onAddGame = () => {
  resetAddForm()
  showAddModal.value = true
}
const onDeleteGame = (id: number) => {
  console.log(id)
  const req = {
    season: props.season,
    id
  }
  axios.post('/delete', req).then((result) => {
    console.log(result)
    const { code, msg } = result.data
    if (code == 200) {
      ElMessage.success('删除成功')
      emit('onSuccess')
    }
  }).catch((err) => {
    console.error(err)
  });
}

const addGameFormList = reactive({
  items: [
    {
      winner: [],
      loser: [],
      score: [10, 0]
    }
  ]
})
const onAddGameItem = () => {
  addGameFormList.items.push({
    winner: [],
    loser: [],
    score: [10, 0]
  })
}
const onDeleteGameItem = (index: number) => {
  addGameFormList.items.splice(index, 1)
}
const rules = {
  required: true,
  // message: 'can not be null',
  trigger: 'change',
}

const resetAddForm = () => {
  addFormRef.value?.resetFields()
  addGameFormList.items = [
    {
      winner: [],
      loser: [],
      score: [10, 0]
    }
  ]
}
const onModalClose = () => {
  resetAddForm()
}

</script>

<template>
  <div class="table">
    <div class="action-btn">
      <el-button v-if="isAdmin" type="primary" @click="onAddGame">新增对局</el-button>
    </div>
    <!-- table -->
    <el-table :data="tableData" v-loading="loading" border stripe max-height="400">
      <template v-for="col in tableColumns">
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
                <el-tag :type="col.slot === 'loser' ? 'danger' : 'success'">{{ p }}</el-tag>
              </template>
            </div>
            <div v-if="['score'].includes(col.slot)" style="display: flex; align-items: center">
              <el-tag>{{ score(scope.row.score) }}</el-tag>
            </div>
            <el-popconfirm
              v-if="['action'].includes(col.slot) && isAdmin"
              title="Are you sure to delete this?"
              @confirm="onDeleteGame(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" plain size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-table-column v-else :label="col.title" :prop="col.key" :width="col.width" />
      </template>
    </el-table>
    <!-- add modal -->
    <el-dialog v-model="showAddModal" title="新增对局" :width="800" @close="onModalClose">
      <el-form
        ref="addFormRef"
        inline
        :model="addGameFormList"
        label-width="auto"
        label-position="top"
      >
        <template v-for="(item, index) in addGameFormList.items">
          <el-form-item label="胜方" :prop="'items.' + index + '.winner'" :rules="rules">
            <el-select
              v-model="item.winner"
              multiple
              :multiple-limit="3"
              placeholder="请选择胜方"
              style="width:200px"
            >
              <el-option v-for="p in playerOpts" :key="p.value" :value="p.value" :label="p.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="败方" :prop="'items.' + index + '.loser'" :rules="rules">
            <el-select
              v-model="item.loser"
              multiple
              :multiple-limit="3"
              placeholder="请选择败方"
              style="width:200px"
            >
              <el-option v-for="p in playerOpts" :key="p.value" :value="p.value" :label="p.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="比分" :prop="'items.' + index + '.score'" :rules="rules">
            <el-input-number
              v-model="item.score[0]"
              :min="1"
              :max="20"
              :controls="false"
              style="width:80px"
            />
            <span class="colon">:</span>
            <el-input-number
              v-model="item.score[1]"
              :min="1"
              :max="20"
              :controls="false"
              style="width:80px"
            />
          </el-form-item>
          <!-- 最后一项才显示添加图标 -->
          <div class="item-action">
            <add-one
              v-if="index === addGameFormList.items.length - 1"
              theme="outline"
              size="20"
              class="add-icon"
              @click="onAddGameItem"
            />
            <delete
              v-if="addGameFormList.items.length !== 1"
              theme="outline"
              size="20"
              class="delete-icon"
              @click="onDeleteGameItem(index)"
            />
          </div>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddModal = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>



<style scoped lang="scss">
.table {
  margin: 20px 0;
}
.action-btn {
  text-align: left;
  margin: 20px 0;
}
.colon {
  font-size: 18px;
  font-weight: bold;
  margin: 0 5px;
}
.item-action {
  display: flex;
  justify-content: flex-end;
  width: 50px;
  .delete-icon {
    margin-left: 20px;
    &:hover {
      cursor: pointer;
      color: #db2828;
    }
  }
  .add-icon {
    &:hover {
      cursor: pointer;
      color: #409eff;
    }
  }
}
.el-form--inline.el-form--label-top {
  align-items: center;
}
</style>
