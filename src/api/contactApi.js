import CONF from "@/config";
import axios from "axios"

export default {
  // dashboard thumb components
  fetchThumbList() {
    return axios.get(CONF.FETCH_THUMBLIST);
  },
  fetchCompData(comp) {
    return axios.get(CONF.FETCH_THUMBDATA, comp);
  }
}