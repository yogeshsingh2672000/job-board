const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/");
  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile: string): boolean => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

export { parseDate, validateEmail, validateMobile };
