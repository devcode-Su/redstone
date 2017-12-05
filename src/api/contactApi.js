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
  fetchGlobalUser(dept){
    return axios.get(CONF.FETCH_GLOBALUSER.replace("${no}", dept))
  }
}
