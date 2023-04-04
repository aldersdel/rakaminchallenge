/// <reference types="cypress">

describe('Unauthenticated user checkout program', () => {

  it('Already in VIX Program Detail Page', () => {
    cy.viewport(1280, 720) //command used to set the size and orientation of the viewport for the test

    cy.visit('https://web-staging.rakamin.com/virtual-internship-experience/digital-marketing-muamalat')
      .wait(1500)
    cy.contains('Daftar sekarang').click() // if there is similiar search key like "Daftar sekarang" can use this code cy.get("[data-cy=register-vix-button]").click();

    cy.contains('Login terlebih dahulu').should('exist')

    cy.get('[data-cy=login-first-button]').wait(2000).then(($button) => {
      if ($button.length > 0) {
        $button.click()
        cy.location().should((location) => {
          expect(location.href).to.equal('https://web-staging.rakamin.com/login')
        })
      } else {
        cy.log('Not as Expected')
      }
    })

    cy.get('[data-cy=login-email-text-field]').click().wait(1500)
    cy.get('[data-cy=login-email-text-field]').type("rasputindel@gmail.com")
    cy.get('[data-cy=login-password-text-field]').click().wait(1500)
    cy.get('[data-cy=login-password-text-field]').type("rakamin123").wait(1500)

    // to check after click Masuk Button should redirect to any page (Home or any)
      cy.get('[data-cy=login-submit-button]').click()
        .then(() => {
          cy.url().should('include', '/virtual-internship-experience')
          .wait(2500)
        })

    cy.contains('Daftar sekarang').click().wait(2000).then(() => {
        
      // command to clear autofill field because already have data saved and to start filling form manually
      cy.get('[data-cy=full-name-text-field]').click().clear()
      cy.get('[data-cy=phone-number-text-field]').click().clear()
      cy.get('[data-cy=linkedin-url-text-field]').click().clear()
            
      
        cy.get('[data-cy=full-name-text-field]').click()
          .wait(1000)
        cy.get('[data-cy=full-name-text-field]').type('rasputin')
          .wait(1000)
        cy.get('[data-cy=phone-number-text-field]').click()
          .wait(1000)
        cy.get('[data-cy=phone-number-text-field]').type('1125123')
          .wait(2000)
        cy.get('[data-cy=linkedin-url-text-field]').click()
          .wait(1000)
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
            cy.url().should('include', '/checkout').wait(2000)  })

})