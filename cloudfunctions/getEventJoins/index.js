// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  // 查询当前用户所有的 counters
  let getEventJoinResult = await db.collection('event_joins').where({
    event_id: event.event_id,
  }).orderBy('level', 'desc').limit(100).get({
    success: res => {
      return res;
    }
  });

  return {
    event_joins: getEventJoinResult,
    event_joins_counts: getEventJoinResult.data.length,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}