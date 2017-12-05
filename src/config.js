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
  FETCH_HIDELIST: BASE_URL + "/resourcelist.json",
  FETCH_VIEWLIST: BASE_URL + "/resourcelist.json",
  THUMBDATA: BASE_URL + "/resourcelist.json",
}
