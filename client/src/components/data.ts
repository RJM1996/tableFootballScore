import { computed } from 'vue'

export const scoreList: any[] = [
  { time: '2022-4-11 12:34', winner: ['ming', 'yan'], loser: ['yu', 'xu'], score: [10, 5], id: 1 },
  { time: '2022-4-11 12:34', winner: ['bing', 'xu'], loser: ['yan', 'ming'], score: [10, 7], id: 2 },
  { time: '2022-4-11 20:30', winner: ['yan', 'xu'], loser: ['bing', 'ming'], score: [10, 8], id: 3 },
  { time: '2022-4-11 20:31', winner: ['ming', 'xu'], loser: ['bing', 'yan'], score: [10, 4], id: 4 },
  { time: '2022-4-11 20:31', winner: ['bing', 'yan'], loser: ['xu', 'ming'], score: [10, 7], id: 5 },
  { time: '2022-4-11 20:31', winner: ['xu', 'yan'], loser: ['bing', 'ming'], score: [10, 8], id: 6 },
  { time: '2022-4-12 12:38', winner: ['xu', 'ming'], loser: ['bing', 'yu'], score: [10, 2], id: 7 },
  { time: '2022-4-12 12:39', winner: ['xu', 'bing'], loser: ['yan', 'yu'], score: [10, 6], id: 8 },
  { time: '2022-4-12 12:39', winner: ['yan', 'ming'], loser: ['xu', 'yu'], score: [10, 4], id: 9 },
  { time: '2022-4-12 12:39', winner: ['yu', 'xu'], loser: ['yan', 'ming'], score: [10, 6], id: 10 },
  { time: '2022-4-12 20:25', winner: ['yu', 'ming'], loser: ['yan', 'xu'], score: [10, 3], id: 11 },
  { time: '2022-4-12 20:25', winner: ['yu', 'xu'], loser: ['yan', 'ming'], score: [10, 8], id: 12 },
  { time: '2022-4-12 20:25', winner: ['ming', 'xu'], loser: ['yan', 'yu'], score: [10, 6], id: 13 },
  { time: '2022-4-12 20:25', winner: ['ming', 'xu'], loser: ['yan', 'yu'], score: [10, 5], id: 14 },
  { time: '2022-4-12 20:26', winner: ['ming', 'yan'], loser: ['xu', 'yu'], score: [10, 6], id: 15 },
  { time: '2022-4-12 20:26', winner: ['xu', 'yan'], loser: ['ming', 'yu'], score: [10, 9], id: 16 },
  { time: '2022-4-14 12:37', winner: ['ming', 'bing'], loser: ['xu', 'yu'], score: [10, 7], id: 17 },
  { time: '2022-4-14 12:38', winner: ['ming', 'bing'], loser: ['xu', 'yu'], score: [10, 8], id: 18 },
  { time: '2022-4-14 12:38', winner: ['xu', 'bing'], loser: ['ming', 'yu'], score: [10, 9], id: 19 },
  { time: '2022-4-14 19:59', winner: ['xu', 'yu'], loser: ['ming', 'bing'], score: [10, 2], id: 20 },
  { time: '2022-4-14 19:59', winner: ['ming', 'yu'], loser: ['xu', 'bing'], score: [10, 8], id: 21 },
  { time: '2022-4-14 19:59', winner: ['ming', 'bing'], loser: ['xu', 'yu'], score: [10, 3], id: 22 },
  { time: '2022-4-15 12:43', winner: ['yu', 'bing'], loser: ['yan', 'ming'], score: [10, 6], id: 23 },
  { time: '2022-4-15 12:43', winner: ['xu', 'yan'], loser: ['bing', 'ming'], score: [10, 1], id: 24 },
  { time: '2022-4-15 12:43', winner: ['bing', 'yan'], loser: ['yu', 'ming'], score: [10, 6], id: 25 },
  { time: '2022-4-18 12:34', winner: ['xu', 'yu'], loser: ['yan', 'bing'], score: [10, 5], id: 26 },
  { time: '2022-4-18 12:34', winner: ['xu', 'ming'], loser: ['yan', 'bing'], score: [10, 5], id: 27 },
  { time: '2022-4-18 12:34', winner: ['yu', 'ming'], loser: ['yan', 'bing'], score: [10, 7], id: 28 },
  { time: '2022-4-18 12:34', winner: ['yu', 'bing'], loser: ['yan', 'ming'], score: [10, 5], id: 29 },
  { time: '2022-4-18 20:27', winner: ['xu', 'ming'], loser: ['yan', 'yu'], score: [10, 8], id: 30 },
  { time: '2022-4-18 20:27', winner: ['xu', 'ming'], loser: ['bing', 'yu'], score: [10, 8], id: 31 },
  { time: '2022-4-18 20:28', winner: ['yu', 'ming'], loser: ['bing', 'yan'], score: [10, 8], id: 32 },
  { time: '2022-4-18 20:28', winner: ['xu', 'ming'], loser: ['bing', 'yan'], score: [10, 5], id: 33 },
  { time: '2022-4-18 20:28', winner: ['xu', 'yan'], loser: ['bing', 'yu'], score: [10, 8], id: 34 },
  { time: '2022-4-19 12:34', winner: ['xu', 'ming'], loser: ['yan', 'yu'], score: [10, 3], id: 35 },
  { time: '2022-4-19 12:34', winner: ['yu', 'ming'], loser: ['yan', 'xu'], score: [10, 6], id: 36 },
  { time: '2022-4-19 12:35', winner: ['yan', 'yu'], loser: ['ming', 'xu'], score: [10, 4], id: 37 },
  { time: '2022-4-19 20:6', winner: ['xu', 'bing'], loser: ['yu', 'ming'], score: [10, 6], id: 38 },
  { time: '2022-4-19 20:6', winner: ['xu', 'ming'], loser: ['yu', 'bing'], score: [10, 5], id: 39 },
  { time: '2022-4-19 20:6', winner: ['xu', 'yan'], loser: ['yu', 'ming'], score: [10, 2], id: 40 },
  { time: '2022-4-19 20:7', winner: ['ming', 'yan'], loser: ['yu', 'bing'], score: [10, 2], id: 41 },
  { time: '2022-4-20 12:35', winner: ['ming', 'yan'], loser: ['yu', 'bing'], score: [10, 3], id: 42 },
  { time: '2022-4-20 12:35', winner: ['ming', 'yan'], loser: ['yu', 'xu'], score: [10, 9], id: 43 },
  { time: '2022-4-20 12:35', winner: ['xu', 'yan'], loser: ['yu', 'ming'], score: [10, 9], id: 44 },
  { time: '2022-4-21 12:26', winner: ['xu', 'yan'], loser: ['yu', 'ming'], score: [10, 3], id: 45 },
  { time: '2022-4-21 12:27', winner: ['xu', 'ming'], loser: ['yu', 'yan'], score: [10, 8], id: 46 },
]
export const playerOpts = [
  // yan,bing,yu,xu,ming
  {
    label: "燕",
    value: "yan"
  },
  {
    label: "冰",
    value: "bing"
  },
  {
    label: "玉",
    value: "yu"
  },
  {
    label: "旭",
    value: "xu"
  },
  {
    label: "铭",
    value: "ming"
  },
  {
    label: "寒昱",
    value: "hanyu"
  }
]
export const player = computed(() => {
  return (row, key) => {
    if (row[key]) {
      const players = Array.isArray(row[key]) ? row[key] : [row[key]]
      return players.map(r => playerOpts.find(p => p.value === r.trim())?.label)
    }
    return '未知'
  }
})