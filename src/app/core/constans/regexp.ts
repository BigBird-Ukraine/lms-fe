export const regExp = {
  nameRegexp: '^[a-zA-ZА-яЁёЇїъіІ]*$',
  passwordRegexp: '^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$',
  phone: '^[0-9]{10,10}$'
};
