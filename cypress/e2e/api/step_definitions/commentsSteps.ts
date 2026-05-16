import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import endpoints from '../utils/endpoints';
import { StatusCodes } from 'http-status-codes';

When(
  'I send a GET request to the comments endpoint and save the response as {string}',
  (responseName: string) => {
    cy.GET({}, `${Cypress.env('apiUrl')}${endpoints.comments}`, false, responseName);
  },
);

Then(
  'I should receive a successful response {string} with status code 200',
  (responseName: string) => {
    cy.getItem(responseName).then((response) => {
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.statusText).to.equal(StatusCodes[StatusCodes.OK]);
    });
  },
);

Then(
  'I validate that the response body {string} against the expected response and JSON schema defined in {string}',
  (responseName: string, schemaName: string) => {
    cy.getItem(responseName).then((response) => {
      cy.validateJSONResponse(schemaName, response.body, ['id']);
    });
  },
);
