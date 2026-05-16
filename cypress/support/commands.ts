/// <reference types="cypress" />

import LoginPage from '../e2e/ui/pages/LoginPage';
import Ajv from 'ajv';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      loginWithAccountType(path: string, accountType: string): Chainable<void>;
      clickOn(...args: any[]): Chainable<void>;
      assertHaveText(parentSelector: string, ...selectorsAndText: string[]): Chainable<void>;
      enterText(parentSelector: string, ...selectorsAndText: string[]): Chainable<void>;
      getTextFromElement(parentSelector: string, ...childSelectors: string[]): Chainable<string>;
      assertElementExists(
        parentSelector: string,
        ...childSelectors: string[]
      ): Chainable<JQuery<HTMLElement>>;
      assertContainText(parentSelector: string, ...selectorsAndText: string[]): Chainable<void>;
      assertCurrentUrlContains(expectedUrlPart: string): Chainable<void>;
      assertCurrentAndPreviousUrlContains(current: string, previous: string): Chainable<void>;
      assertChildrenCount(
        parentSelector: string,
        ...selectorsAndCount: (string | number)[]
      ): Chainable<void>;
      assertElementIsVisibleAndEnabled(
        parentSelector: string,
        ...childSelectors: string[]
      ): Chainable<void>;
      assertCheckboxState(
        parentSelector: string,
        ...selectorsAndState: (string | boolean)[]
      ): Chainable<void>;
      setItem(name: string, value: any): Chainable<void>;
      getItem(key: string): Chainable<any>;
      GET(
        headers: any,
        endpoint: string,
        payload?: any,
        saveResponseAlias?: string,
      ): Chainable<any>;
      POST(
        headers: any,
        endpoint: string,
        payload: any,
        isForm?: boolean,
        saveResponseAlias?: string,
      ): Chainable<any>;
      PUT(headers: any, endpoint: string, payload: any, saveResponseAlias?: string): Chainable<any>;
      DELETE(
        headers: any,
        endpoint: string,
        payload: any,
        saveResponseAlias?: string,
      ): Chainable<any>;
      PATCH(
        headers: any,
        endpoint: string,
        payload: any,
        saveResponseAlias?: string,
      ): Chainable<any>;
      compareJSONResponseSchema(
        expectedSchemaFileName: string,
        actualResponse: any,
      ): Chainable<void>;
      compareJSONResponse(
        expectedResponseFileName: string,
        actualResponse: any,
        excludeKeys: string[],
      ): Chainable<void>;
      validateJSONResponse(
        expectedFileName: string,
        actualResponse: any,
        excludeKeys: string[],
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginWithAccountType', (path: string, accountType: string) => {
  cy.fixture(path).then((testData) => {
    const user = testData[accountType];
    if (!user) {
      throw new Error(`Account type '${accountType}' not found in fixture`);
    }
    LoginPage.login(user.email, user.password);
  });
});

Cypress.Commands.add('clickOn', (...args: any[]) => {
  if (!args.length) {
    throw new Error('At least one argument is required for clickOn command');
  }
  let options: any = {};
  let selectorArgs: any[] = args;
  const lastArg = args[args.length - 1];
  if (typeof lastArg === 'object' && !Array.isArray(lastArg)) {
    options = lastArg;
    selectorArgs = args.slice(0, -1);
  }
  const [parentSelector, ...childSelectors] = selectorArgs;
  const element = getElementBySelector(parentSelector, ...childSelectors);
  element.click(options);
});

const getElementBySelector = (parentSelector: string, ...selectors: string[]) => {
  if (!parentSelector || !selectors.length) {
    throw new Error('Parent selector and at least one child selector are required');
  }
  let element = cy.get(parentSelector);
  selectors.forEach((selector: string) => {
    element = element.find(selector);
  });
  return element;
};

const popLastArgument = (args: any[], errorMessage: string) => {
  if (!args.length) throw new Error(errorMessage);
  return args.pop();
};

const withElement = (
  parentSelector: string,
  childSelectors: string[],
  callback: (element: Cypress.Chainable<JQuery<HTMLElement>>) => void,
) => {
  const element = getElementBySelector(parentSelector, ...childSelectors);
  callback(element);
};

const createHttpCommand = (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') => {
  return (
    headers: any,
    endpoint: string,
    payload?: any,
    isFormOrAlias?: boolean | string,
    saveResponseAlias?: string,
  ) => {
    const requestOptions: any = {
      url: endpoint,
      method,
      headers,
      failOnStatusCode: false,
    };

    if (method !== 'GET') {
      requestOptions.body = payload;
      if (method === 'POST' && typeof isFormOrAlias === 'boolean') {
        requestOptions.form = isFormOrAlias;
        saveResponseAlias = saveResponseAlias as string;
      } else if (method !== 'POST') {
        saveResponseAlias = isFormOrAlias as string;
      }
    } else {
      saveResponseAlias = isFormOrAlias as string;
    }
    return requestWithRetry(requestOptions, saveResponseAlias, 3);
  };
};

Cypress.Commands.add('assertHaveText', (parentSelector: string, ...selectorsAndText: string[]) => {
  const expectedText = popLastArgument(
    selectorsAndText,
    'At least one selector and expected text are required for assertHaveText command',
  );
  withElement(parentSelector, selectorsAndText, (el) => {
    el.should('have.text', expectedText);
  });
});

Cypress.Commands.add('enterText', (parentSelector: string, ...selectorsAndText: string[]) => {
  const textValue = popLastArgument(
    selectorsAndText,
    'At least one selector and text value are required for enterText command',
  );
  withElement(parentSelector, selectorsAndText, (el) => {
    el.clear().type(textValue);
  });
});

Cypress.Commands.add(
  'getTextFromElement',
  (parentSelector: string, ...childSelectors: string[]) => {
    let result: any;
    withElement(parentSelector, childSelectors, (el) => {
      result = el.invoke('text');
    });
    return result;
  },
);

Cypress.Commands.add(
  'assertElementExists',
  (parentSelector: string, ...childSelectors: string[]) => {
    let result: any;
    withElement(parentSelector, childSelectors, (el) => {
      result = el.should('exist');
    });
    return result;
  },
);

Cypress.Commands.add(
  'assertContainText',
  (parentSelector: string, ...selectorsAndText: string[]) => {
    const expectedText = popLastArgument(
      selectorsAndText,
      'At least one selector and expected text are required for shouldContainText command',
    );
    withElement(parentSelector, selectorsAndText, (el) => {
      el.should('contain.text', expectedText);
    });
  },
);

Cypress.Commands.add('assertCurrentUrlContains', (expectedUrlPart: string) => {
  cy.url().should('include', expectedUrlPart);
});

Cypress.Commands.add('assertCurrentAndPreviousUrlContains', (current: string, previous: string) => {
  cy.url().should('include', current);
  cy.go('back');
  cy.url().should('include', previous);
});

Cypress.Commands.add(
  'assertChildrenCount',
  (parentSelector: string, ...selectorsAndCount: (string | number)[]) => {
    const count = popLastArgument(
      selectorsAndCount,
      'At least one child selector and expected count are required for assertChildrenCount command',
    ) as number;
    withElement(parentSelector, selectorsAndCount as string[], (el) => {
      el.children().should('exist').should('have.length', count);
    });
  },
);

Cypress.Commands.add(
  'assertElementIsVisibleAndEnabled',
  (parentSelector: string, ...childSelectors: string[]) => {
    withElement(parentSelector, childSelectors, (el) => {
      el.should('be.visible').and('not.be.disabled');
    });
  },
);

Cypress.Commands.add(
  'assertCheckboxState',
  (parentSelector: string, ...selectorsAndState: (string | boolean)[]) => {
    const expectedState = popLastArgument(
      selectorsAndState,
      'At least one child selector and expected state are required for assertCheckboxState command',
    ) as boolean;
    withElement(parentSelector, selectorsAndState as string[], (el) => {
      el.should('exist').and(expectedState ? 'be.checked' : 'not.be.checked');
    });
  },
);

Cypress.Commands.add('setItem', (name, value) => {
  cy.task('setItem', { name: name, value: value });
});

Cypress.Commands.add('getItem', (key) => {
  cy.task('getItem', key).then((response) => {
    return response;
  });
});

function requestWithRetry(
  requestOptions: any,
  saveResponseAlias: any,
  retries = 1,
  attempt = 0,
): any {
  return cy.api(requestOptions).then((response) => {
    if ((response.status === 502 || response.status === 504) && attempt < retries) {
      cy.log(`Received ${response.status}, retrying... (${attempt + 1}/${retries})`);
      return requestWithRetry(requestOptions, saveResponseAlias, retries, attempt + 1);
    }
    if (saveResponseAlias !== undefined) {
      cy.setItem(saveResponseAlias, response);
      cy.log(`Response saved under: ${saveResponseAlias}`);
    }
    return cy.wrap(response);
  });
}

Cypress.Commands.add('GET', createHttpCommand('GET'));
Cypress.Commands.add('POST', createHttpCommand('POST'));
Cypress.Commands.add('PUT', createHttpCommand('PUT'));
Cypress.Commands.add('DELETE', createHttpCommand('DELETE'));
Cypress.Commands.add('PATCH', createHttpCommand('PATCH'));

Cypress.Commands.add('compareJSONResponseSchema', (expectedSchemaFileName, actualResponse) => {
  cy.fixture(`expectedSchemas/${expectedSchemaFileName}`).then((schema) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(actualResponse);
    if (!valid) {
      throw new Error(`Response does not match schema: ${ajv.errorsText(validate.errors)}`);
    }
  });
});

Cypress.Commands.add(
  'compareJSONResponse',
  (expectedResponseFileName, actualResponse, excludeKeys) => {
    const tempActualResponsePath = `cypress/fixtures/tempActualResponses/actualResponse.json`;
    cy.writeFile(tempActualResponsePath, actualResponse);

    cy.exec(
      `json-diff -x ${excludeKeys.join(',')} cypress/fixtures/expectedResponses/${expectedResponseFileName}.json ${tempActualResponsePath}`,
      { failOnNonZeroExit: false },
    ).then((result) => {
      console.log(result);

      // If stdout is empty, it means no differences were found (files match)
      if (!result.stdout || result.stdout.trim() === '') {
        return; // Success - files are identical
      }

      const parsedOutput = JSON.parse(result.stdout);
      const jsonDiffOutput = parsedOutput.errors[0][1];
      const numberOfDifferences = Object.keys(jsonDiffOutput).length;
      if (numberOfDifferences > 0) {
        throw new Error(
          `actual response does not match expected response. Differences: ${jsonDiffOutput}`,
        );
      }
    });
  },
);

Cypress.Commands.add('validateJSONResponse', (expectedFileName, actualResponse, excludeKeys) => {
  cy.compareJSONResponseSchema(expectedFileName, actualResponse);
  cy.compareJSONResponse(expectedFileName, actualResponse, excludeKeys);
});
