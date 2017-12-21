export default {
  methods: {
    locationCheck() {
      return !!location.href.match('Dashboard');
    }
  }
}
