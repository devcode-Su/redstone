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
  fetchEditUser(dept){
    return axios.get(CONF.FETCH_EDITEUSR.replace("${no}", dept));
  },
  setupAdmin(){
    return axios.get(CONF.SETUP_ADMIN);
  },
  updateAdmin(form){
    return axios.post(CONF.SETUP_ADMIN, form);
  },
  deleteAdmin(id){
    return axios.delete(CONF.DELETE_ADMIN.replace("${no}", id));
  }
}
