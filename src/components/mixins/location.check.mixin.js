export default {
  methods: {
    locationCheck() {
      let pageUrl = location.href;
      console.log(pageUrl)
      let u = pageUrl.match("Dashboard");
      if (u !== null) return false;
    }
  }
}
