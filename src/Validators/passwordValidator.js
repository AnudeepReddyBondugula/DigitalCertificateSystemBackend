
export const isValidPassword = (_pass, _pass2) => {
    const pswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  
    return (_pass == _pass2 && pswRegex.test(_pass));
  }