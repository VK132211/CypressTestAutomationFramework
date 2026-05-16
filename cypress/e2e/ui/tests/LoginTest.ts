// import LoginPage from "../pages/LoginPage";
// import { LoginData } from "../../../support/utils/interfaces/login-data.interface";

// describe('Login Test', () => {
//     beforeEach(() => {
//         cy.visit('/')
//         cy.contains('Sign').click()
//     })
//     it('should login successfully with valid credentials', () => {
//         cy.fixture<LoginData[]>('loginData').then((testData: LoginData[]) => {
//             const user = testData[0];
//             LoginPage.login(user.emailAddress, user.password)
//             cy.assertHaveText("a[title='View my customer account']", "span", 'Ffaga gdgdg');
//         })
//     })
// });
