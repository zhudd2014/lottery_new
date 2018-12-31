// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 获取抽奖结果
 */
// 云函数入口函数
exports.main = async (event, context) => {


  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  // 查询当前用户所有的 counters
  // let getEventSucResult = await db.collection('event_joins').where({
  //   event_id: event.event_id,
  //   level: _.gt(0)
  // }).orderBy('level', 'desc').get({
  //   success: res => {
  //     result = res;
  //     return result;
  //   }
  // });

  return {
    getEventSucResult: '',
    sucResultCounts: '',
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }

}