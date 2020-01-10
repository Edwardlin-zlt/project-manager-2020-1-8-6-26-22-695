const API_ROOT = "http://localhost:3000/projects";
var infoList = document.getElementById("info-list");
var alertWindow = document.querySelector(".alert-window")
var alertWindowMask = document.querySelector(".mask")
var toDelId = -1;

function main() {
  getListData();

  infoList.addEventListener("click", function(e) {
    switch (true) {
      case (e.target.className.includes("del-btn")):
        toDelId = e.target.parentElement.parentElement.getAttribute("data-id");
        showConfirmWindow();
        break;
    }
  });

  alertWindow.addEventListener("click", function(e){
    switch (true) {
      case e.target.className.includes("close-window")
        || e.target.className.includes("cancel"):
        alertWindow.style.visibility = "hidden";
        alertWindowMask.style.visibility = "hidden"
        toDelId = -1;
        break;
      case e.target.className.includes("sure"):
        alertWindow.style.visibility = "hidden";
        alertWindowMask.style.visibility = "hidden"
        delInfoRowData(toDelId);
    }
  })
}

function updateNumberOrPercentage(targetEle, numberOrPercentage) {
  targetEle.innerHTML = numberOrPercentage;
}

function updateAllMissionCard(number) {
  var allMissionNum = document.querySelector(".all .count-num");
  allMissionNum.innerHTML = number;
}

function updateMissionCard(missionType, number) {
  var allMissionNum = document.querySelector(".all .count-num");
  var percentage = number / parseInt(allMissionNum.innerHTML);
  percentage = Math.round(percentage * 100) + "%";
  var missionNum = document.querySelector(`.${missionType} .count-num`);
  var missionPercentage = document.querySelector(
    `.${missionType} .count-percentage`
  );
  updateNumberOrPercentage(missionNum, number);
  updateNumberOrPercentage(missionPercentage, percentage);
}

function getListData() {
  options = {
    url: API_ROOT,
    method: "get",
    success: function(result) {
      let data = JSON.parse(result);
      renderInfoList(data);
    }
  };
  ajax(options);
}

function renderInfoList(data) {
  if (!Array.isArray(data) && !data instanceof Array) {
    return false;
  }

  var listHeadStr = `
    <li class="info-list-head">
      <span class="project-name">项目名称</span>
      <span class="project-describe">项目描述</span>
      <span class="deadline">截止日期</span>
      <span class="status">状态</span>
      <span class="operation">操作</span>
    </li>`;

  infoList.innerHTML = data.reduce((acc, cur) => {
    var curStr = `
      <li class="info-row" data-id="${cur.id}">
        <span class="project-name">${cur.name}</span>
        <span class="project-describe">${cur.description}</span>
        <span class="deadline">${cur.endTime}</span>
        <span class="status status-${cur.status.toLowerCase()}">${
      cur.status
    }</span>
        <span class="operation"><button class="del-btn">删除</button></span>
      </li> `;
    return (acc += curStr);
  }, listHeadStr);
}

function showConfirmWindow() {
  alertWindow.style.visibility = "visible";
  alertWindowMask.style.visibility = "visible"
}

function delInfoRowData(id) {
  options = {
    url: API_ROOT + `/${id}`,
    method: "DELETE",
    success: function(result) {
      console.log(`Deleted Item ID: ${id}`)
      delInfoRowEle(id);
    }
  };
  ajax(options);
}

function delInfoRowEle(id) {
  let toDelEle = infoList.querySelector(`[data-id = "${id}"]`);
  infoList.removeChild(toDelEle);
}

main();