export default {
  methods: {
    setDatetime(num) {
      switch (num) {
        case 0:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 1);
          break;
        case 1:
          this.startDate = new Date();
          this.startDate.setHours(0);
          this.startDate.setMinutes(0);
          this.startDate.setSeconds(0);
          this.startDate.setMilliseconds(0);
          break;
        case 2:
          this.startDate = new Date();
          this.startDate.setDate(this.startDate.getDate() - ((this.startDate.getDay() + 7 - 1) % 7));
          this.startDate.setHours(0);
          this.startDate.setMinutes(0);
          this.startDate.setSeconds(0);
          this.startDate.setMilliseconds(0);
          break;
        case 3:
          this.startDate = new Date();
          this.startDate.setDate(1);
          this.startDate.setHours(0);
          this.startDate.setMinutes(0);
          this.startDate.setSeconds(0);
          this.startDate.setMilliseconds(0);
          break;
        default:
          break;
      }
      this.endDate = new Date();
    },
    setDatelast(num) {
      switch (num) {
        case 0:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7);
          break;
        case 1:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 30);
          break;
        case 2:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 90);
          break;
        case 3:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 180);
          break;
        default:
          break;
      }
      this.endDate = new Date();
    }
  }
}
