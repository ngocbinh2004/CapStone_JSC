class Validation {
  isEmpty(value, errorMessageId, message) {
    if (value.trim() === "") {
      document.getElementById(errorMessageId).innerText = message;
      return false;
    }
    document.getElementById(errorMessageId).innerText = "";
    return true;
  }

  isNumber(value, errorMessageId, message) {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    if (!regex.test(value) || parseFloat(value) <= 0) {
      document.getElementById(errorMessageId).innerText = message;
      return false;
    }
    document.getElementById(errorMessageId).innerText = "";
    return true;
  }

  isOptionSelected(selectElement, errorMessageId, message) {
    if (selectElement.selectedIndex === 0) {
      document.getElementById(errorMessageId).innerText = message;
      return false;
    }
    document.getElementById(errorMessageId).innerText = "";
    return true;
  }
}

export default Validation;
