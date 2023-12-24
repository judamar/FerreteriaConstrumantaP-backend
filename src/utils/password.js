import bcrypt from 'bcrypt'

const saltRounds = 10

/**
 * The function `hashPassword` takes a password as input, checks if it is at least 8 characters long,
 * and then hashes the password using bcrypt.
 * @param password - The `password` parameter is the string that needs to be hashed.
 * @returns a promise that resolves to the hashed password.
 */
const hashPassword = async (password) => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer.')
  }
  return await bcrypt.hash(password, saltRounds)
}

/**
 * The function compares a plain text password with a hashed password using bcrypt.
 * @param password - The password parameter is the plain text password that needs to be compared with
 * the hashed password.
 * @param hashedPassword - The `hashedPassword` parameter is the password that has been previously
 * hashed using a hashing algorithm, such as bcrypt.
 * @returns a promise that resolves to a boolean value indicating whether the password matches the
 * hashed password.
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export default { hashPassword, comparePassword }
