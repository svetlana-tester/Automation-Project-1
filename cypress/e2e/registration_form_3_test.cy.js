beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content S:1
    * dropdown and dependencies between 2 dropdowns S:2
    * checkboxes, their content and links S:3
    * email format
 */

// S: Check radio buttons and its content S:1
// S: There are 4 radio buttons in total
describe('Section 1: visual tests', () => {
    it('Check radio buttons and its content', () => {
        // S: Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // S: Radio button names are correct
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never').and('not.be.checked')

        // S: Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    });
});

describe('Section 1: visual tests', () => {
    it('This is my first test', () => {
        // This is empty template
    });


    // S: dropdown and dependencies between 2 dropdowns S:2
    it('Country dropdown has 4 options', () => {
        // country dropdown has 4 options : no choice, Spain, Estonia, Austria
        cy.get('#country').children().should('have.length', 4)
    })

    // S: if you have not yet chosen any country you can't see cities

    it('Cities list should not appear when country is not chosen', () => {

        // Cities list is initially disabled
        cy.get('#city').should('be.disabled')

        // Choose a country (e.g Spain)
        cy.get('#country').select('Spain');

        // Check that the citites list becomes enabled
        cy.get('#city').should('not.be.disabled')

        // Clear the counry selection
        cy.get('#country').select('');

        //Check that the cities list becomes disabled again
        cy.get('#city').should('be.disabled');
    })

    // S: city dropdown adjusts to the chosen country

    it('City list adjusts to selected country (Spain) and contains only Spanish cities', () => {

        // S: Check that when you choose country (Spain), you can choose only spanish cities
        cy.get('#country').select('Spain')

        // Assert that the city list is enabled
        cy.get('#city').should('not.be.disabled');

        // S: Check that the cities in the list match the expected cities for the chosen country
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Malaga', 'string:Madrid', 'string:Valencia', 'string:Corralejo']);
        })
    })

    it('City list adjusts to selected country (Estonia) and contains only Estonian cities', () => {

        // S: Check that when you choose country (Estonia), you can choose only estonian cities
        cy.get('#country').select('Estonia')

        // Assert that the city list is enabled
        cy.get('#city').should('not.be.disabled');

        // S: Check that the cities in the list match the expected cities for the chosen country
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Tallinn', 'string:Haapsalu', 'string:Tartu']);
        })
    })

    it('City list adjusts to selected country (Austria) and contains only Austrian cities', () => {

        // S:  Check that when you choose country (Austria), you can choose only austrian cities
        cy.get('#country').select('Austria')

        // Assert that the city list is enabled
        cy.get('#city').should('not.be.disabled');

        // S: Check that the cities in the list match the expected cities for the chosen country
        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['', 'string:Vienna', 'string:Salzburg', 'string:Innsbruck']);
        })
    })



    // S: checkboxes, their content and links S:3
    it('S: Check that list of checkboxes is correct', () => { // RENAME THE TEST

        // S: a.There are 2 checkbox buttons present and unchecked.
        cy.get('input[type="checkbox"]').should('have.length', 2).should('not.be.checked');

        // S: Verify the labels of each checkbox are correct ??????

        // S: Verify that checkbox link is correct ???
        // S:3 checkboxes and their content
        // S:3 links

    })

    // S: verify  that cookie policy link navigates to correct place and back
    it('Check cookie policy button navigation', () => {
        cy.get('button').contains('Accept our cookie policy').should('have.attr', 'href', 'cookiePolicy.html')
            .click();

        // Check that currently opened URL is correct
        cy.url().should('contain', '/cookiePolicy.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 3')
    });

    // S: Not mandatory date of birth NB! replace to Functional tests??
    it('Can insert date of birth', () => {
        cy.get('input[type="date"]').first().type('1990-06-20')

    });


    // S:3 cerebrum logo
    it('S:Check that cerebrum hub logo is correct and has correct size', () => {
        cy.log('Will check cypress logo source and size')
        cy.get('img[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo.png');

        // S: Get element and check its parameter height, to be equal 166
        cy.get('img[data-testid="picture"]').invoke('height').should('be.lessThan', 175).and('be.greaterThan', 165) // S:can't unrestand these numbers

        // S: get element and check its parameter width, to be equal 178
        cy.get('img[data-testid="picture"]').invoke('width').should('be.lessThan', 180).and('be.greaterThan', 177);

    })


    //cy.get('input[type="checkbox"]').eq(0).check();
    //cy.get('input[type="checkbox"]').eq(1).check();

    describe('This is my new section for live demo', () => {
        it('This is my new test which fills all the data on reg form 3 ', () => {
            cy.get('#name').clear().type('Nadezda')
            cy.get('[name="email"]').type('myemail@mail.xz')
            cy.get('#country').select('Spain')
            cy.get('#city').select('Valencia')
            cy.contains('Date of birth').next().type('2000-02-11')
            cy.get('[value="Weekly"]').check()
            cy.get('#birthday').type('2000-02-11')
            cy.get('[type="checkbox"]').first().check()
            cy.get('[type="checkbox"]').last().check()
            cy.get('[type="submit"]').should('be.enabled')
            cy.get('[type="submit"]').last().click()
            cy.contains('Submission received').should('be.visible')



        });
    });

    // S: email format
    // S: cerebrum logo
    // S: calendar - 2 options and one of them is mandatory
    // S: file
    //BONUS TASK: add functional tests for registration form 3

    /*
    Task list:
    * Create second test suite for functional tests
    * Create tests to verify logic of the page:
        * all fields are filled in + validation
        * only mandatory fields are filled in + validations
        * mandatory fields are absent + validations (try using function)
        * If city is already chosen and country is updated, then city choice should be removed
        * add file (google yourself for solution) 
        */

    // all fields are filled in + validation
    describe('Second test suit: functional tests', () => {
        it('Verify that all the fields can be filled in + validation', () => {
            inputValidData()
        });

        // only mandatory fields are filled in + validations
        it('Only mandatory fields are filled+validation', () => {
            cy.get('#name').clear().type('Svetlana')
            cy.get('[name="email"]').type('emailtask7@mail.com')
            cy.get('#country').select('Estonia')
            cy.get('#city').select('Haapsalu')
            cy.get('#birthday').type('1990-01-10')
            cy.get('[type="checkbox"]').first().check()
            cy.get('[type="checkbox"]').last().check()
            cy.get('[type="submit"]').should('be.enabled')
            cy.get('[type="submit"]').last().click()
            cy.contains('Submission received').should('be.visible')
        });
        
        // mandatory fields are absent + validations
        it('mandatory fields are absent + validations ', () => {
            inputValidData1()
            cy.get('[name="email"]').clear()
            cy.get('[type="submit"]').last().should('not.be.enabled')
            cy.contains('Submission received').should('not.exist') });
           
                
            

            // If city is already chosen and country is updated, then city choice should be removed
            // In visual tests I have already checked, that the city list ajusts to countries

            // add file
            it('Add file', () => {
                cy.get('input[type=file]').selectFile('load_this_file_reg_form_3.txt')
            
                  
            
        });
        

    });


    function inputValidData() {
        cy.get('#name').clear().type('Svetlana')
        cy.get('[name="email"]').type('emailtask7@mail.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Haapsalu')
        cy.contains('Date of birth').next().type('1990-01-10')
        cy.get('[value="Daily"]').check()
        cy.get('#birthday').type('1990-01-10')
        cy.get('[type="checkbox"]').first().check()
        cy.get('[type="checkbox"]').last().check()
        cy.get('[type="submit"]').should('be.enabled')
        cy.get('[type="submit"]').last().click()
        cy.contains('Submission received').should('be.visible')
    }

    function inputValidData1() {
        cy.get('#name').clear().type('Svetlana')
        cy.get('[name="email"]').type('emailtask7@mail.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Haapsalu')
        cy.contains('Date of birth').next().type('1990-01-10')
        cy.get('[value="Daily"]').check()
        cy.get('#birthday').type('1990-01-10')
        cy.get('[type="checkbox"]').first().check()
        cy.get('[type="checkbox"]').last().check()
    }
})