class Validators {
  static isEmpty(string) {
    return string.length === 0 || string.trim() === "";
  }
}
export default Validators;
