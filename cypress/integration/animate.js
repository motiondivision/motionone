Cypress.config({
  baseUrl: "http://0.0.0.0:8000/demos/",
})

describe("animate", () => {
  const tests = require("../fixtures/tests.json")

  tests.forEach((test) => {
    it(test, () => {
      cy.visit("animate/" + test)
      cy.wait(100).get('[data-passed="false"]').should("not.exist")
    })
  })
})
