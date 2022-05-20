'use strict'
const db = require('./sqlWrap');
module.exports = {
  //testDB: testDB, //adds test entries to the DB
  insertVideo: insertVideo,
  dumpTable:dumpTable,
  getNum:getNum,
  updateTable:updateTable,
  mostRecen:mostRecen,
  delVideo:delVideo,
}

async function insertVideo(v) {
  const sql = "insert into VideoTable (url,nickname,userid,flag) values (?,?,?,TRUE)";
console.log("This is should be running now!");
await db.run(sql,[v.URL, v.Nickname, v.Username]);
}

async function dumpTable() {
  const sql = "select nickname from VideoTable"
  
  let result = await db.all(sql)
  return result;
}

async function updateTable() {
  const sql = "UPDATE VideoTable SET flag = 0 WHERE flag = 1";
  let result = await db.run(sql)
  return result;
}

async function getNum() {
  const sql = "select count(*) from VideoTable"
  
  let result = await db.all(sql);
  console.log(result);
  return result[0]["count(*)"]; 
}

async function mostRecen() {
  const sql = "SELECT * FROM VideoTable WHERE flag = 1";
  
  let result = await db.get(sql);
  console.log(result,"most Recent");
  return result;
}
async function delVideo(name) {
  const sql="DELETE FROM VideoTable WHERE nickname = ?";
  console.log("name send in dataops:",name);
  let result= await db.run(sql, [name]);
  console.log("dataops:", result);
  return result;
}