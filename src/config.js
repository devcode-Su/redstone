//var BASE_URL = "/static/data";

var BASE_URL = "/api/admin";
// 상수 네이밍과 동일하게 적으면 좋을 듯
export default {
  // 로그인
  LOGIN: BASE_URL + "/userdata.josn",
  // 로그아웃
  LOGOUT: BASE_URL + "/",
  //LOGIN : BASE_URL + "/login",
  //LOGOUT : BASE_URL + "/logout",
  USER_INFO: BASE_URL + "/info",
  GROUP_GET: BASE_URL + "/group",

  // 대시보드 썸네일 콤포넌트 설정 조회
  FETCH_THUMBALL: "/dashboard/?method=define",

  // 그룹관리
  FETCH_GROUP : BASE_URL + "/group/list",
  MANAGEMENT_GROUP : BASE_URL + "/group",
  FETCH_GLOBALUSER : BASE_URL + "/group/recurse/${no}",
  FETCH_EDITEUSR : BASE_URL + "/group/node/${no}",
  UPDATE_EDITUSER : BASE_URL + "/node/${no}",

  //관리자 관리
  SETUP_ADMIN : BASE_URL,
  ADD_ADMIN : BASE_URL,
  UPDATE_ADMIN : BASE_URL,
  DELETE_ADMIN : BASE_URL + "/${no}"
}
