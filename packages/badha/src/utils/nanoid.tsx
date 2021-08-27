const { customAlphabet } = require("nanoid");
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const customNanoid = customAlphabet(alphabet, 5);
export const nanoid = () => {
  return customNanoid(); //=> "6BR58ep9JByab21BQ4LQU"
};
