import CONF from "@/config";
import axios from "axios"

export default {
  // dashboard thumb components
  fetchThumbAll() {
    return axios.get(CONF.FETCH_THUMBALL);
  },
  fetchGroup(){
    return axios.get(CONF.FETCH_GROUP);
  },
  addGroup(addDept){
    return axios.post(CONF.MANAGEMENT_GROUP, addDept);
  },
  fetchGlobalUser(dept){
    return axios.get(CONF.FETCH_GLOBALUSER.replace("${no}", dept));
  },
  globalRangeUser(nodeid){
    return axios.get(CONF.GLOBAL_RANGEUSER.replace("${no}", nodeid));
  },
  setupAdmin(){
    return axios.get(CONF.SETUP_ADMIN);
  },
  addAdmin(form){
    return axios.post(CONF.SETUP_ADMIN, form);
  },
  updateAdmin(form){
    return axios.put(CONF.SETUP_ADMIN, form);
  },
  deleteAdmin(id){
    return axios.delete(CONF.DELETE_ADMIN.replace("${no}", id));
  }
}
