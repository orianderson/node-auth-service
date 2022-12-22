export const generateCode = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length - 1) * 9),
  );
};

// export const generateCode = (): number => {
//   return Math.floor(100000 + Math.random() * 900000);
// };
