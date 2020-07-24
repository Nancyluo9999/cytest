export function getCurrentTime() {
    return Cypress.moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
}