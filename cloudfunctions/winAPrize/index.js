// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  console.log(event.userInfo.openId)
  const db = cloud.database();
  const _ = db.command
  let winAPrize = false;
  let winAPrizeShowInfo = '';

  // 查询当前用户所有的 counters
  let getEventSucResult = await db.collection('prizedUsers').where({
    _openid: event.userInfo.openId,
    level: _.gt(0)
  }).get({
    success: res => {
      return res;
    }
  });
  console.log('#####getEventSucResult')
  console.log(getEventSucResult.data)

  if (getEventSucResult.data.length > 0) {
    winAPrize = true
    console.log('#####level')
    console.log(getEventSucResult.data[0].level)
    console.log('#####event_id')
    console.log(event.event_id)
    // 查询所有奖品
    let getPrizeListRet = await db.collection('prizes').where({
      event_id: event.event_id,
      level: getEventSucResult.data[0].level
    }).get({
      success: res => {
        return res;
      }
    });
    console.log(getPrizeListRet)
    winAPrizeShowInfo = getPrizeListRet.data[0].name;
  }

  return {
    winAPrize: winAPrize,
    winAPrizeShowInfo: winAPrizeShowInfo
  }
}