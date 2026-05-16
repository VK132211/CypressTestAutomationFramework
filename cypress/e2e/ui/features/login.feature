Feature: Login

    Login Page Scenarios.

    Scenario Outline: "<testCase>" Login successfully with valid credentials
        Given I open the login page
        When I login with email "<email>" and password "<password>"
        Then I should see my account name as "<accountName>"

        Examples:
            | testCase  | email                | password | accountName |
            | TS01_TC01 | dummy6thmay@test.com | 12345    | Ffaga gdgdg |
            | TS01_TC02 | dummy8thmay@test.com | 12345    | Ffaga gdgdg |

    Scenario Outline: "<testCase>" Login successfully with valid credentials
        Given I open the login page
        When I login with account "<accountType>" provided in fixture file "loginDataWithAccountType"
        Then I should see my account name as "<accountName>"

        Examples:
            | testCase  | accountType | accountName |
            | TS02_TC01 | validUser   | Ffaga gdgdg |
            | TS02_TC02 | adminUser   | Ffaga gdgdg |