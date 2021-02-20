describe("Data App", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');
    const submitButton = () => cy.get('.submit');
    const termsInput = () => cy.get('input[name="terms"]');

    it('sanity test to make sure tests work', () => {
        expect(1 + 2).to.equal(3);
    })
    // Get the `Name` input and type a name in it.
    // Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
    it('NAME input types name on screen', () => {
        nameInput()
        .should('have.value', '')
        .type("Blanket")
        .should("have.value", 'Blanket')
    })
    // Get the `Email` input and type an email address in it
    it('Email address typed', () => {
        emailInput()
        .should('have.value', '')
        .type('quilts@gmail.com')
        .should("have.value", 'quilts@gmail.com')
    })
    //Get the `password` input and type a password in it
    it('can type in PASSWORD', () => {
        passwordInput()
        .should('have.value', '')
        .type('ilovequilts')
        .should("have.value", 'ilovequilts')
    })
// Set up a test that will check to see if a user can check the terms of service box
    it('terms box checked', () => {
        termsInput().check();
        termsInput().uncheck();
    })
// Check to see if a user can submit the form data
    it('can submit form data', () => {
        //step 1: prelim test
        submitButton().should('exist');
        //step 2: submit disabled
        submitButton().should("be.disabled");
        // //step 3: test into nam
        nameInput().type("NAME");
        // //step 4: submit still disabled
        submitButton().should("be.disabled");
        // //step 5: text in email
        nameInput().clear();
        emailInput().type("EMAIL@gmail.com");
        // //step 6: submit still disabled
        submitButton().should("be.disabled");
        // //step 7: password text
        emailInput().clear();
        passwordInput().type('PASSWORD');
        // //Step 8: submit still disabled
        submitButton().should("be.disabled");
        // //step 9: terms checked
        passwordInput().clear();
        termsInput().check();
        //step 10: submit be enabled
        submitButton().should("be.disabled");
        //step 11: all filled out
        nameInput().type('NAME');
        emailInput().type('EMail@gmail.com');
        passwordInput().type('PASSWORD');
        submitButton().should('not.be.disabled')
        submitButton().click();
    })
    //Check for form validation if an input is left empty
    it('determine if an input is missing', () => {
        nameInput().should('have.value', '');
        emailInput().should('have.value', '');
        passwordInput().should('have.value', '');
        termsInput().uncheck();
        // emailInput().type('EMail@gmail.com');
        // emailInput().should('not.be.empty');
        // passwordInput().type('PASSWORD');
        // passwordInput().should('not.be.empty');
        // termsInput().check();
        // termsInput().should('be.selected');

    })
})


