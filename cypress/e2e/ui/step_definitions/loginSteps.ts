import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';
Given('I open the login page', () => {
  cy.visit('/');
  cy.get('.login').click();
});

When('I login with email {string} and password {string}', (email: string, password: string) => {
  LoginPage.login(email, password);
});

When(
  'I login with account {string} provided in fixture file {string}',
  (accountType: string, fixtureFile: string) => {
    cy.loginWithAccountType(fixtureFile, accountType);
  },
);
Then('I should see my account name as {string}', (accountName: string) => {
  cy.assertHaveText("a[title='View my customer account']", 'span', accountName);
});
