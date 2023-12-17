export const isValidEmail = (_email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(_email);
}

export const isValidPassword = (_password, _password2) => {
  //password with atleast one Upercase, lowercase, numeric, and one special caharacter
  const pswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  return (_password == _password2 && pswRegex.test(_password));
}

export const isValidPublicAddress = (_publicAddr) => {
  const publicAddrRegex = /^0x[a-fA-F0-9]{40}$/gm;
  return publicAddrRegex.test(_publicAddr);
}

export const isValidAadharNumber = (_aadharNumber) => {
  //12 digit aadharNumber ex: 789654123698(no spaces)
  const aadharNumberRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/

  return aadharNumberRegex.test(_aadharNumber);
}

