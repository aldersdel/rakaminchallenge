describe('Authenticated User Checkout Program', () =>{
    it('User Already Log In and Directed to VIX Program Detail Page', () => {
        cy.viewport(1280,720)

        cy.visit('https://web-staging.rakamin.com/login')

        cy.get('[data-cy=login-email-text-field]').click()
            .wait(1500)
        cy.get('[data-cy=login-email-text-field]').type("rasputindel@gmail.com")
            .wait(1500)
        cy.get('[data-cy=login-password-text-field]').click()
            .wait(1000)
        cy.get('[data-cy=login-password-text-field]').type('rakamin123')

        // Expect should redirect to dashboard or any page after login
        cy.get('[data-cy=login-submit-button]').click()
        cy.url().should('include', '/dashboard')
            .wait(2000)
        
        // Test For checking Dashboard Menu Button in VIX Program Detail Page should go to VIX List Page
        cy.visit('https://web-staging.rakamin.com/virtual-internship-experience/digital-marketing-muamalat')
            .wait(2000)
            .then(() =>{
                cy.contains('Dashboard').click()
                    cy.url().should('include', '/virtual-internship-experience')
                    .wait(2000)
            })
        
        cy.visit('https://web-staging.rakamin.com/virtual-internship-experience/digital-marketing-muamalat').wait(2000)

        // Test For Check Daftar Sekarang Form
        cy.contains('Daftar sekarang').click().wait(2000).then(() =>{

            // command to clear autofill field because already have data saved and to start filling form manually
            cy.get('[data-cy=phone-number-text-field]').click().clear()
            cy.get('[data-cy=linkedin-url-text-field]').click().clear()

            // To Check if Phone number field was fill with less then 10 number it should show warning message
                cy.get('[data-cy=phone-number-text-field]').click()
                    .wait(2000)
                cy.get('[data-cy=phone-number-text-field]').type('1125123')
                    .wait(2000)
                cy.get('[data-cy=linkedin-url-text-field]').click()
                    .wait(2000)
                cy.get('[data-cy=linkedin-url-text-field]').type('123321')
                    .wait(2000)
                cy.get('[data-cy=vix-info-source-option-1]').click()
                    .wait(1000)
                cy.get('[data-cy=agreement-checkbox]').click()
                    .wait(1000)
                cy.get('[data-cy=vix-form-submit-button]').click()
                    .wait(2000)

                // Expected Result if whatsup field filled less than 10 number
                cy.contains('Nomor Whatsapp minimal 10 digit').should('exist')
            
            // To Check if Phone number field was empty it should show warning message
                cy.get('[data-cy=phone-number-text-field]').clear().wait(2000)
                cy.get('[data-cy=full-name-text-field]').click().wait(2000)

                // Expected to show warning box if field whatsup left empty
                cy.contains('Nomor Whatsapp tidak boleh kosong').should('exist')
        })

        // Test for checking after full fill from correctly and click submit button it should redirect to Checkout Page
            cy.get('[data-cy=phone-number-text-field]').click()
                .wait(2000)
                .clear()
            cy.get('[data-cy=phone-number-text-field]').type('1234567890')

            // Expected Result after click button Submit, pop up Confirmation should appear
            cy.contains('Submit').click()
            cy.contains('Lanjutkan untuk mendaftar Program').should('exist')
                .wait(2000)

            // Expected Result after all finish and click button Lanjutkan should redirect to Checkout Page
            cy.get('[data-cy=button-confirm]').click()
            cy.url().should('include', '/checkout').wait(2000)

    })
})