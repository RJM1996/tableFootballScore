var fs = require('fs')
const shell = require('shelljs')

const filePath = './score/score-s4.json'

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
  return `${year}-${month}-${date}`
}

function addGame() {
  const game = {
    time: getDate(),
    winner: ['yan', 'bing'],
    loser: ['xu', 'ming'],
    score: [10, 5]
  }
  readFile(game)
}
addGame()

function rank() {
  const players = ['bing', 'yan', 'yu', 'xu', 'ming', 'hanyu']
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      const gameArr = JSON.parse(data)
      const rankArr = []
      // 统计每位选手的大比分,小比分,场次
      players.forEach((p) => {
        const pData = {
          name: '',
          big: 0,
          small: 0,
          num: 0,
          score: 0
          // averageScore: 0
        }
        gameArr.forEach((game) => {
          const person = [...game.winner, ...game.loser]
          if (person.includes(p)) {
            pData.num += 1
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
        // pData.averageScore = Math.round(pData.small / pData.num)
        rankArr.push(pData)
      })
      rankArr.sort((a, b) => b.score - a.score)
      console.log(rankArr)
    }
  })
}

// rank()
