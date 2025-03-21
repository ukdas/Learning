export const LeetCodeSelectors = {
  GridPage: "[class*='grid'] >> nth=0",
  HomePage: {
    BaseContent: "[id='base_content']",
    NavBar: "[id='navbar-root']",
  },
  LandingPage: "[id='landing-page-app']",
  SignInLink: "[href='/accounts/login/']",
  SignInPage: "[id='app']",
  SignInBoxContainer: "[class^='sign-in-box__']",
  SignInButton: "[id='signin_btn']",
  UserNameTextBox: "[id='id_login']",
  PasswordTextBox: "[id='id_password']",
  ProblemsButton: "[href='/problemset/all/']",
};
