const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '/database/score-s9.json')

function writeFile(content) {
  console.log('准备写入文件')
  const item = JSON.stringify(content)
  fs.writeFile(filePath, item, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('数据写入成功！')
      rank()
    }
  })
}
function readFile(game) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      // console.log('异步读取文件数据: ' + data.toString())
      const gameArr = JSON.parse(data)
      game.id = gameArr.length + 1
      gameArr.push(game)
      writeFile(gameArr)
    }
  })
}

function getDate() {
  var now = new Date()
  var year = now.getFullYear() //得到年份
  var month = now.getMonth() + 1 //得到月份
  var date = now.getDate() //得到日期
  const hours = now.getHours()
  const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
  return `${year}-${month}-${date} ${hours}:${minutes}`
}

function addGame() {
  const game = {
    time: getDate(),
    winner: ['xu', 'ming'],
    loser: ['yu', 'yan'],
    score: [10, 8],
  }
  readFile(game)
}
// addGame()

function rank(data) {
  const players = ['bing', 'yan', 'yu', 'xu', 'ming']
  let gameArr = data
  if (!gameArr) {
    try {
      const data = fs.readFileSync(filePath)
      gameArr = JSON.parse(data)
    } catch (error) {
      console.error(error)
    }
  }
  const rankArr = []
  // 统计每位选手的大比分,小比分,场次,组队最多/最少次的队友
  players.forEach((p) => {
    const pData = {
      name: '',
      big: 0,
      small: 0,
      num: 0,
      score: 0,
      xu: [0, 0],
      yu: [0, 0],
      yan: [0, 0],
      bing: [0, 0],
      ming: [0, 0],
      averagingGoal: 0,
    }
    gameArr.forEach((game) => {
      const person = [...game.winner, ...game.loser]
      if (person.includes(p)) {
        pData.num += 1
        // 统计当前选手队友出现的次数
        const { winner, loser } = game
        if (winner.includes(p)) {
          const key = winner[0] === p ? winner[1] : winner[0]
          // console.log(key, pData[key])
          // debug(pData[key][0])
          if (pData[key]) pData[key][0]++
        }
        if (loser.includes(p)) {
          const key = loser[0] === p ? loser[1] : loser[0]
          // console.log(key, pData[key])
          if (pData[key]) pData[key][1]++
        }
      }
      if (game.winner.includes(p)) {
        pData.big += 1
        pData.small += game.score[0]
      }
      if (game.loser.includes(p)) {
        pData.small += game.score[1]
      }
    })
    const score = pData.num > 0 ? (pData.big * 5 + pData.small) / pData.num : 0
    pData.score = score.toFixed(2)
    pData.name = p
    pData.averagingGoal = (pData.small / pData.num).toFixed(2)
    rankArr.push(pData)
  })
  rankArr.sort((a, b) => b.score - a.score)
  console.log(
    rankArr.map((item) => ({
      name: item.name,
      big: item.big,
      small: item.small,
      num: item.num,
      score: item.score,
    }))
  )
  fs.writeFile('./score/summary.json', JSON.stringify(rankArr), function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('总数据写入成功！')
    }
  })
}
// rank()

function summary() {
  const pathArr = ['./score/score-s1.json', './score/score-s2.json', './score/score-s3.json', './score/score-s4.json']
  let gameTotal = []
  try {
    pathArr.forEach((path) => {
      const data = fs.readFileSync(path, 'utf-8')
      const gameArr = JSON.parse(data)
      gameTotal = gameTotal.concat(gameArr)
    })
    console.log('总局数', gameTotal.length)
    rank(gameTotal)
  } catch (error) {
    console.error(error)
  }
}
// summary()

/**
 * 读取指定赛季的对局记录
 * @param season 赛季
 */
const getScoreList = (season = 9) => {
  const filePath = path.join(__dirname, `/database/score-s${season}.json`)
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    const gameArr = JSON.parse(data)
    return gameArr
  } catch (error) {
    console.error(error)
  }
}
/**
 * 读取指定赛季的排名列表
 * @param season 赛季
 */
const getRankList = (season = 9) => {
  const filePath = path.join(__dirname, `/database/score-s${season}.json`)
  const players = ['bing', 'yan', 'yu', 'xu', 'ming']
  let gameArr = []
  try {
    const data = fs.readFileSync(filePath)
    gameArr = JSON.parse(data)
    // 统计每位选手的大比分,小比分,场次,组队最多/最少次的队友
    const rankArr = players.map((p) => {
      const pData = {
        name: '',
        big: 0,
        small: 0,
        num: 0,
        score: 0,
        xu: [0, 0],
        yu: [0, 0],
        yan: [0, 0],
        bing: [0, 0],
        ming: [0, 0],
        averagingGoal: 0,
      }
      gameArr.forEach((game) => {
        const person = [...game.winner, ...game.loser]
        if (person.includes(p)) {
          pData.num += 1
          // 统计当前选手队友出现的次数
          const { winner, loser } = game
          if (winner.includes(p)) {
            const key = winner[0] === p ? winner[1] : winner[0]
            // console.log(key, pData[key])
            // debug(pData[key][0])
            if (pData[key]) pData[key][0]++
          }
          if (loser.includes(p)) {
            const key = loser[0] === p ? loser[1] : loser[0]
            // console.log(key, pData[key])
            if (pData[key]) pData[key][1]++
          }
        }
        if (game.winner.includes(p)) {
          pData.big += 1
          pData.small += game.score[0]
        }
        if (game.loser.includes(p)) {
          pData.small += game.score[1]
        }
      })
      const score = pData.num > 0 ? (pData.big * 5 + pData.small) / pData.num : 0
      pData.score = score.toFixed(2)
      pData.name = p
      pData.averagingGoal = (pData.small / pData.num).toFixed(2)
      return pData
    })
    rankArr.sort((a, b) => b.score - a.score)
    const rankList = rankArr.map((item) => ({
      name: item.name,
      big: item.big,
      small: item.small,
      num: item.num,
      score: item.score,
    }))
    return rankList
  } catch (error) {
    console.error(error)
  }
}

/**
 * 为指定赛季增加对局记录
 * @param {*} season
 */
const addGameForSeason = (season = 9, games = []) => {
  const filePath = path.join(__dirname, `/database/score-s${season}.json`)
  try {
    if (!games.length) throw new Error('game is required')
    const data = fs.readFileSync(filePath, 'utf-8')
    let gameArr = JSON.parse(data)
    games = games.map((game, index) => {
      return {
        ...game,
        time: getDate(),
        id: gameArr.length + index + 1,
      }
    })
    gameArr = [...gameArr, ...games]
    fs.writeFileSync(filePath, JSON.stringify(gameArr))
    return true
  } catch (error) {
    console.error(error)
    return error
  }
}

/**
 * 删除指定赛季的对局记录
 * @param {*} season 赛季
 * @param {*} id 对局id
 * @returns
 */
const deleteGameForSeason = (season = 9, id = 0) => {
  const filePath = path.join(__dirname, `/database/score-s${season}.json`)
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    let gameArr = JSON.parse(data)
    gameArr = gameArr.filter((game) => game.id !== id)
    fs.writeFileSync(filePath, JSON.stringify(gameArr))
    return true
  } catch (error) {
    console.error(error)
    return error
  }
}

module.exports = {
  getScoreList,
  getRankList,
  addGameForSeason,
  deleteGameForSeason,
}
