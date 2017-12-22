export default {
  methods: {
    openSHA(val){
      const url = "http://192.168.100.19/Explanation-Info?sha256="+val;
      const op = "top=100, left=500, width=900, height=600, menubar=1, status=1, location=0";
      window.open(url,'', op )
    },
    openRULE(val){
      const url = "http://192.168.100.19/Explanation-Rule?id="+val;
      const op = "top=100, left=500, width=900, height=430, menubar=1, status=1, location=0";
      window.open(url,"", op )
    },
    openVirusTotal(val){
      const url = `https://www.virustotal.com/file/${val}/analysis/`;
      window.open(url)
    }
  }
}
