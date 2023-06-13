describe('service is available', () => {
  it ('should be available at port 3000', () => {
    cy.visit('http://localhost:3000')
  })
})