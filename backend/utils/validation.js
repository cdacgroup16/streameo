exports.validateEmail = (email) => {
  // Email validation regex
  const regx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return regx.test(email)
}

exports.validatePassword = (password) => {
  // Password validation regex
  // One uppercase letter, One lowercase letter and One number
  const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
  return regx.test(password)
}
