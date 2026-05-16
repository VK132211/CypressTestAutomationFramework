class LoginPage {
  static readonly SELECTORS = {
    emailInput: '#email',
    passwordInput: '#passwd',
    submitButton: '#SubmitLogin',
  };

  static login(email: string, password: string) {
    cy.get(this.SELECTORS.emailInput).type(email);
    cy.get(this.SELECTORS.passwordInput).type(password);
    cy.get(this.SELECTORS.submitButton).click();
  }
}

export default LoginPage;
