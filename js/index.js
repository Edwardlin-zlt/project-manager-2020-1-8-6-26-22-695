var allMissionNum = document.querySelector(".all .count-num")
var undoneMissionNum = document.querySelector(".undone .count-num")
var undergoingMissionNum = document.querySelector(".undergoing .count-num")
var doneMissionNum = document.querySelector(".done .count-num")
var undonePercentage = document.querySelector(".undone .count-percentage")
var undergoingPercentage = document.querySelector(".undergoing .count-percentage")
var donePercentage = document.querySelector(".done .count-percentage")

function updateNumberOrPercentage(targetEle, numberOrPercentage){
  targetEle.innerHTML = numberOrPercentage;
}

function updateAllMissionCard(number){
  allMissionNum.innerHTML = number;
}

function updateMissionCard(missionType, number){
  var allMissionNum = document.querySelector(".all .count-num");
  var percentage = number / parseInt(allMissionNum.innerHTML);
  percentage = Math.round(percentage * 100) + "%";
  var missionNum = document.querySelector(`.${missionType} .count-num`)
  var missionPercentage = document.querySelector(`.${missionType} .count-percentage`)
  updateNumberOrPercentage(missionNum, number);
  updateNumberOrPercentage(missionPercentage, percentage);
}
