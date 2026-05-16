export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * LOGIN util which fetches data from an isolated test data file based on accountType key
       *
       * @param {string} accountType
       * @returns {Chainable<void>}
       */
      loginWithAccountType(path: string, accountType: string): Chainable<void>;

      /**
       * Click on an element specified by a series of selectors, with optional click options as the last argument
       *
       * @param {...any[]} args
       * @returns {Chainable<void>}
       */
      clickOn(...args: any[]): Chainable<void>;

      /**
       * assert that an element specified by a series of selectors has the expected text, with the expected text as the last argument
       *
       * @param {string} parentSelector
       * @param {...string[]} selectorsAndText
       * @returns {Chainable<void>}
       */
      assertHaveText(parentSelector: string, ...selectorsAndText: string[]): Chainable<void>;

      /**
       * enter text into an element specified by a series of selectors, with the text as the last argument
       *
       * @param {string} parentSelector
       * @param {...string[]} selectorsAndText
       * @returns {Chainable<void>}
       */
      enterText(parentSelector: string, ...selectorsAndText: string[]): Chainable<void>;

      /**
       * Get text from an element specified by a series of selectors
       *
       * @param {string} parentSelector
       * @param {...string[]} childSelectors
       * @returns {Chainable<string>}
       */
      getTextFromElement(parentSelector: string, ...childSelectors: string[]): Chainable<string>;

      /**
       * assert that an element specified by a series of selectors exists
       *
       * @param {string} parentSelector
       * @param {...string[]} childSelectors
       * @returns {Chainable<JQuery<HTMLElement>>}
       */
      assertElementExists(
        parentSelector: string,
        ...childSelectors: string[]
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * assert that an element specified by a series of selectors contains the expected text
       *
       * @param {string} parentSelector
       * @param {...string[]} selectorsAndText
       * @returns {Chainable<void>}
       */
      assertContainText(parentSelector: string, ...selectorsAndText: string[]): Chainable<void>;

      /**
       * assert that the current URL contains the expected part
       *
       * @param {string} expectedUrlPart
       * @returns {Chainable<void>}
       */
      assertCurrentUrlContains(expectedUrlPart: string): Chainable<void>;

      /**
       * assert that the current URL and previous URL contain the expected parts
       *
       * @param {string} current
       * @param {string} previous
       * @returns {Chainable<void>}
       */
      assertCurrentAndPreviousUrlContains(current: string, previous: string): Chainable<void>;

      /**
       * assert that an element specified by a series of selectors has the expected number of child nodes
       *
       * @param {string} parentSelector
       * @param {...(string | number)[]} selectorsAndCount
       * @returns {Chainable<void>}
       */
      assertChildrenCount(
        parentSelector: string,
        ...selectorsAndCount: (string | number)[]
      ): Chainable<void>;

      /**
       * assert that an element specified by a series of selectors is visible and enabled
       *
       * @param {string} parentSelector
       * @param {...string[]} childSelectors
       * @returns {Chainable<void>}
       */
      assertElementIsVisibleAndEnabled(
        parentSelector: string,
        ...childSelectors: string[]
      ): Chainable<void>;

      /**
       * assert that a checkbox element specified by a series of selectors has the expected state
       *
       * @param {string} parentSelector
       * @param {...(string | boolean)[]} selectorsAndState
       * @returns {Chainable<void>}
       */
      assertCheckboxState(
        parentSelector: string,
        ...selectorsAndState: (string | boolean)[]
      ): Chainable<void>;

      /**
       * Store a value in the Cypress test context under a specified key
       *
       * @param {string} name - The key under which to store the value
       * @param {any} value - The value to store
       * @returns {Chainable<void>} A Cypress chainable that resolves when the value has been stored
       */
      setItem(name: string, value: any): Chainable<void>;

      /**
       * Retrieve a value from the Cypress test context by its key
       *  * @param {string} key - The key of the value to retrieve
       * @returns {Chainable<any>} A Cypress chainable that resolves with the retrieved value
       */
      getItem(key: string): Chainable<any>;

      /**
       * Make an HTTP GET request to a specified endpoint with given headers, and optionally save the response under an alias
       *
       * @param {*} headers
       * @param {string} endpoint
       * @param {?string} [saveResponseAlias]
       * @returns {Chainable<any>}
       */
      GET(headers: any, endpoint: string, saveResponseAlias?: string): Chainable<any>;

      /**
       * Make an HTTP POST request to a specified endpoint with given headers and payload, and optionally save the response under an alias
       *
       * @param {*} headers
       * @param {string} endpoint
       * @param {*} payload
       * @param {boolean} [isForm=false]
       * @param {?string} [saveResponseAlias]
       * @returns {Chainable<any>}
       */
      POST(
        headers: any,
        endpoint: string,
        payload: any,
        isForm?: boolean,
        saveResponseAlias?: string,
      ): Chainable<any>;

      /**
       * Make an HTTP PUT request to a specified endpoint with given headers and payload, and optionally save the response under an alias
       *
       * @param {*} headers
       * @param {string} endpoint
       * @param {*} payload
       * @param {?string} [saveResponseAlias]
       * @returns {Chainable<any>}
       */
      PUT(headers: any, endpoint: string, payload: any, saveResponseAlias?: string): Chainable<any>;

      /**
       * Make an HTTP DELETE request to a specified endpoint with given headers and payload, and optionally save the response under an alias
       *
       * @param {*} headers
       * @param {string} endpoint
       * @param {*} payload
       * @param {?string} [saveResponseAlias]
       * @returns {Chainable<any>}
       */
      DELETE(
        headers: any,
        endpoint: string,
        payload: any,
        saveResponseAlias?: string,
      ): Chainable<any>;

      /**
       * Make an HTTP PATCH request to a specified endpoint with given headers and payload, and optionally save the response under an alias
       *
       * @param {*} headers
       * @param {string} endpoint
       * @param {*} payload
       * @param {?string} [saveResponseAlias]
       * @returns {Chainable<any>}
       */
      PATCH(
        headers: any,
        endpoint: string,
        payload: any,
        saveResponseAlias?: string,
      ): Chainable<any>;
    }
  }
}
