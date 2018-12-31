// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  console.log(event.userInfo.openId)
  const db = cloud.database();
  const _ = db.command
  let winAPrize = false;

  // 查询当前用户所有的 counters
  let getEventSucResult = await db.collection('event_joins').where({
    event_id: event.event_id,
    level: _.gt(0)
  }).orderBy('level', 'desc').get({
    success: res => {
      result = res;
      return result;
    }
  });
  console.log('#####getEventSucResult')
  console.log(getEventSucResult.data)

  for (let i = 0, len = getEventSucResult.data.length; i < len; i++) {
    console.log('#####tem')
    console.log(getEventSucResult.data[i])
    if (getEventSucResult.data[i]._openid == event.userInfo.openId) {
      winAPrize = true
    }
  }



  return {
    winAPrize: winAPrize
  }
}