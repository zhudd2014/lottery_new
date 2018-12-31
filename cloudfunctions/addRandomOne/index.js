// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('[数据库addRandomOne] event: ', event)
  const wxContext = cloud.getWXContext()

  const db = cloud.database();

  let res = await db.collection('event_joins').where({
    event_id: event.event_id,
    level: 0
  }).get({
    success: res => {
      return res;
    }
  });

  const length = res.data.length;
  //随机一个 更新为中奖
  const random = Math.floor(Math.random() * (length));
  console.log('[数据库addRandomOne] [查询未中奖人] 成功，人数: ', length)
  console.log('[数据库addRandomOne] [生成随机数] 成功，随机数: ', random)
  console.log('[数据库addRandomOne] [设置中奖人id] 成功，中奖人id：', res.data[random]._id)
  let updateId = res.data[random]._id;


  //取中奖人的数据
  let updateResult = await db.collection('event_joins').doc(updateId).update({
    data: {
      level: 1,
    },
    success(res) {
      return res;
    }
  })

  return {
    updateResult: updateResult
  }
}