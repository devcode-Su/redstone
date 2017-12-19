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
          //this.startDate.setSeconds(0);
          //this.startDate.setMilliseconds(0);
          break;
        case 2:
          this.startDate = new Date();
          this.startDate.setDate(this.startDate.getDate() - ((this.startDate.getDay() + 7 - 1) % 7));
          this.startDate.setHours(0);
          this.startDate.setMinutes(0);
          //this.startDate.setSeconds(0);
          //this.startDate.setMilliseconds(0);
          break;
        case 3:
          this.startDate = new Date();
          this.startDate.setDate(1);
          this.startDate.setHours(0);
          this.startDate.setMinutes(0);
          //this.startDate.setSeconds(0);
          //this.startDate.setMilliseconds(0);
          break;
        default:
          break;
      }
      this.endDate = new Date();
    },
    setFormDateTime(num) {
      switch (num) {
        case 0:
          this.form.startDate = new Date(new Date().getTime() - 3600 * 1000 * 1);
          break;
        case 1:
          this.form.startDate = new Date();
          this.form.startDate.setHours(0);
          this.form.startDate.setMinutes(0);
          //this.form.startDate.setSeconds(0);
          //this.form.startDate.setMilliseconds(0);
          break;
        case 2:
          this.form.startDate = new Date();
          this.form.startDate.setDate(this.form.startDate.getDate() - ((this.form.startDate.getDay() + 7 - 1) % 7));
          this.form.startDate.setHours(0);
          this.form.startDate.setMinutes(0);
          //this.form.startDate.setSeconds(0);
          //this.form.startDate.setMilliseconds(0);
          break;
        case 3:
          this.form.startDate = new Date();
          this.form.startDate.setDate(1);
          this.form.startDate.setHours(0);
          this.form.startDate.setMinutes(0);
          //this.form.startDate.setSeconds(0);
          //this.form.startDate.setMilliseconds(0);
          break;
        default:
          break;
      }
      this.form.endDate = new Date();
    },
    setDatelast(num) {
      switch (num) {
        case 0:
          this.date = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7);
          break;
        case 1:
          this.date = new Date(new Date().getTime() - 3600 * 1000 * 24 * 30);
          break;
        case 2:
          this.date = new Date(new Date().getTime() - 3600 * 1000 * 24 * 90);
          break;
        case 3:
          this.date = new Date(new Date().getTime() - 3600 * 1000 * 24 * 180);
          break;
        default:
          break;
      }
      if (this.date) {
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(0);
        this.date.setMilliseconds(0);
      }
    },
  },
}
