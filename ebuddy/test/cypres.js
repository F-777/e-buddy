describe("Chat Application", () => {
    it("Should allow user to send and receive messages", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='email']").type("user1@example.com");
      cy.get("input[name='password']").type("password123");
      cy.get("button[type='submit']").click();
  
      cy.get("input[name='message']").type("Hello, World!");
      cy.get("button[type='send']").click();
  
      cy.contains("Hello, World!");
    });
  });
  