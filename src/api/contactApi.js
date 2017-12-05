import CONF from "@/config";
import axios from "axios"

export default {
  // dashboard thumb components
  fetchThumbAll() {
    return axios.get(CONF.FETCH_THUMBALL);
  },
  // fetchCompData(comp) {
  //   return axios.get(CONF.FETCH_THUMBDATA, comp);
  // }
}
