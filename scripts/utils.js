export const generatePositiveOrNegativeNum = (num) => {
  // "Math.floor((Math.random() * 2))" to generate whole num between 0 and 1
  if (Math.floor((Math.random() * 2))) {
    return -num;
  } else {
    return num;
  }
}