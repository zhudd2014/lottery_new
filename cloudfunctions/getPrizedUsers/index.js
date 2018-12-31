// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  // 查询所有奖品
  let getPrizeListRet = await db.collection('prizes').where({
    event_id: 'testA',
  }).orderBy('level', 'asc').get({
    success: res => {
      return res;
    }
  });

  let prizeList = getPrizeListRet.data;
  // console.log('getPrizeListRet')
  // console.log(prizeList)

  //查询所有中奖人
  let getPrizedUsersListRet = await db.collection('prizedUsers').where({
    event_id: 'testA',
    level: _.gt(0)
  }).orderBy('level', 'asc').get({
    success: res => {
      return res;
    }
  });

  let prizedUsers = getPrizedUsersListRet.data;

  // console.log('getPrizedUsersListRet')
  // console.log(prizedUsers)

  let result = [];
  //组装返回数据
  for (let i = 0, prizeLen = prizeList.length; i < prizeLen; i++) {
    console.log('#####prize')
    console.log(prizeList[i])

    let eachRow ={};
    eachRow = prizeList[i];
    let eachRowOfUsers = [];

    for (let j = 0, userLen = prizedUsers.length; j < userLen; j++) {
      console.log('#####prizedUser')
      console.log(prizedUsers[j].level)
      console.log(prizeList[i].level == prizedUsers[j].level)
      if (prizeList[i].level == prizedUsers[j].level){
        eachRowOfUsers.push(prizedUsers[j])
      }
      console.log(eachRowOfUsers)
    }
    eachRow.users_info = eachRowOfUsers;

    result.push(eachRow)
  }


  return {
    result:result,
  }
}