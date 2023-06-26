beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})
function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}
/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User cannot submit the form with mismatched passwords', () => {
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible


        // S:Task 4.1 a-c Different confirmation password

        // S: Fill in mandatory fields
        cy.get('#username').type('annabanana')
        cy.get('#email').type('annabanana@mail.com')
        cy.get('[data-cy="name"]').type('Anna');
        cy.get('[data-testid="lastNameTestId"]').type('Banana');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456');
        cy.get('#password').type('strongpassword');
        // S:Different confirm password
        cy.get('#confirm').type('WEAKpassword');
        // S:Assert that submit button is not enabled
        cy.get('#applicationForm').click()
        cy.get('.submit_button').should('be.disabled');
        // S:Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')
        // S:Assert that corresponding error message is visible
        cy.get('#password_error_message').should('be.visible').and('contain', 'Passwords do not match!');

    })

    it('Password and confirmation password are the same', () => {
        // S:Task 4.1 d-e Password and confirmation password are the same

        // S: Fill in mandatory fields
        cy.get('#username').type('annabanana')
        cy.get('#email').type('annabanana@mail.com')
        cy.get('[data-cy="name"]').type('Anna');
        cy.get('[data-testid="lastNameTestId"]').type('Banana');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456');
        cy.get('#password').type('strongpassword');

        // S:Same confirm password
        cy.get('#confirm').type('strongpassword');

        // S:Assert that submit button is enabled
        cy.get('#applicationForm').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // S:Assert that successful message is visible
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration');


    })

    it('User can submit form with all fields added', () => {
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message

        // S:Task 4.2
        // S: Fill in all fields
        cy.get('#username').type('annabanana')
        cy.get('#email').type('annabanana@mail.com')
        cy.get('[data-cy="name"]').type('Anna');
        cy.get('[data-testid="lastNameTestId"]').type('Banana');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456');
        cy.get('#cssFavLanguage').check();
        cy.get('input[value="Boat"]').check();
        cy.get('#cars').select('volvo');
        cy.get('#animal').select('hippo');
        cy.get('#password').type('strongpassword');
        cy.get('#confirm').type('strongpassword');
        cy.get('#applicationForm').click()

        // S: Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // S: Assert that after submitting the form system shows succsesful message 
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration');
    })

    it('User can submit form with valid data and only mandatory fields added', () => {
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // S:Task 4.3
        // S: Fill in only mandatory fields
        cy.get('#username').type('annabanana')
        cy.get('#email').type('annabanana@mail.com')
        cy.get('[data-cy="name"]').type('Anna');
        cy.get('[data-testid="lastNameTestId"]').type('Banana');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456');
        cy.get('#password').type('strongpassword');
        cy.get('#confirm').type('strongpassword');
        cy.get('#applicationForm').click()

        // S: Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration');

    })



    it('Verify that the submit button is disabled, when some mandatory fields are empty-username', () => {

        //S:Task 4.4 Verify that sumbit button is disabled when some mandatory fields are not are not present.

        //S:Enter the correct data and and then clear the mandandatoty username
        cy.get('#username').type('annabanana').clear()
        cy.get('#email').type('annabanana@mail.com')
        cy.get('[data-cy="name"]').type('Anna');
        cy.get('[data-testid="lastNameTestId"]').type('Banana');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456');
        cy.get('#cssFavLanguage').check();
        cy.get('input[value="Boat"]').check();
        cy.get('#cars').select('volvo');
        cy.get('#animal').select('hippo');
        cy.get('#password').type('strongpassword');
        cy.get('#confirm').type('strongpassword');
        cy.get('#applicationForm').click()

        // S: Verify that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // S: Verify that success message is not visible
        cy.get('#success_message').should('not.be.visible')

    })

    it('Verify that the submit button is disabled, when some mandatory fields are empty-First name', () => {

        //S:Enter the correct data and and then clear the mandatory First name 
        cy.get('#username').type('annabanana')
        cy.get('#email').type('annabanana@mail.com')
        cy.get('[data-cy="name"]').type('Anna').clear()
        cy.get('[data-testid="lastNameTestId"]').type('Banana');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456');
        cy.get('#cssFavLanguage').check();
        cy.get('input[value="Boat"]').check();
        cy.get('#cars').select('volvo');
        cy.get('#animal').select('hippo');
        cy.get('#password').type('strongpassword');
        cy.get('#confirm').type('strongpassword');
        cy.get('#applicationForm').click()

        // S: Verify that submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // S: Verify that success message is not visible
        cy.get('#success_message').should('not.be.visible')

    })


    // You can add more similar tests for checking other mandatory field's absence

    it('Input valid data to the page using function and delete mandatory -phone number', () => {
        // S: Using function to enter correct data
        inputValidData();

        // S: Clear the mandatry input field
        cy.get('[data-testid="phoneNumberTestId"]').clear()

        // S: Verify that submit button is disabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')

        // S: Verify that success message is not visible
        cy.get('#success_message').should('not.be.visible')

    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // S:Create similar test for checking second picture
    // S:Task 5.2
    it('Check that the second picture is correct and has correct size', () => {
        cy.log('Will check cypress logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo');

        // S: Get element and check its parameter height, to be equal 88
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89).and('be.greaterThan', 80)

        // S: Get element and check its parameter width, to be equal 116
        cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 117).and('be.greaterThan', 100);

    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    // Check that URL to Cerebrum Hub page is correct and clickable

    // S: Task 5.3 Add a test to check the second link in the navigation bar - the link to the Cerebrum Hub homepage:a.check that the link is correct; b.verify, that the link is clickable
    it('Check second link', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // S:Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .should('have.text', 'Cerebrum Hub homepage')
            .click()

        // S: Check that currently opened URL is the Cerebrum Hub homepage
        cy.url().should('contain', 'https://cerebrumhub.com/');

        // S: Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')

    })



    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one
    // S:Task 5.4

    it('Check that list of checkboxes is correct', () => {

        // S: There are three checkbox buttons present and unchecked
        cy.get('input[type="checkbox"]').should('have.length', 3).should('not.be.checked');

        // S: Verify the label of each checkbox
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        // S: Mark the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')

        // S: Mark the second checkbox as checked  and assert the state of the first and second checkboxes
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        // S: Asserts that the third checkbox remains its unchecked state
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked');


    })
    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page //S: extra task??
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)

        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one
    // S: Task 5.5 Check that the dropdown of favorite animals is correct

    it('Animal dropdown is correct', () => {
        // S: a.Verify that the animal dropdown has six choices.
        cy.get('#animal').children().should('have.length', 6)

        // S: b.Verify all values in the dropdown.
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog').should('have.value', 'dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat').should('have.value', 'cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake').should('have.value', 'snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo').should('have.value', 'hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow').should('have.value', 'spider')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse').should('have.value', 'mouse')

        // Advanced level how to check the content of the animal dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])

    })


})

})