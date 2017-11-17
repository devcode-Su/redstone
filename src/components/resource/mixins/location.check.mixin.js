export default {
  methods: {
    locationCheck() {
      let pageUrl = location.href;
      let u = pageUrl.match("Dashboard");
      if (u !== null) return false;
    }
  }
}