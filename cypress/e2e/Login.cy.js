describe('Test Case for Login Page', () => {
    beforeEach(() => {
        cy.visit('https://web-staging.rakamin.com/login')
          .wait(1500)
      })
      
      it('Able to click Daftar and redirect to Register Page', () => {
        cy.get("#root > div.sc-bcsbzB.dNvuab > div > div.sc-bFMFLa.jlPjrP > div.sc-bCUJIE.bfLczc > a").click()
          .wait(1500)
        cy.url().should('eq','https://web-staging.rakamin.com/register')
          .wait(2000)
       })
      
      it('Login with Empty Email and Empty Password', () => {
        cy.get('[data-cy=login-submit-button]').click()
          .wait(1500)

        cy.contains('Alamat email tidak boleh kosong').should('exist')
        cy.contains('Kata sandi tidak boleh kosong').should('exist')
        
        cy.wait(2000)
       })

      it('Login with Valid Email and Empty Password', () => {
        cy.get('[data-cy=login-email-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-email-text-field]').type("rasputindel@gmail.com")
          .wait(1500)

        cy.get('[data-cy=login-submit-button]').click()
          .wait(1500)
        cy.contains('Kata sandi tidak boleh kosong').should('exist')
       })

      it('Login with Wrong Format Email and Empty Password', () => {
        cy.get('[data-cy=login-email-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-email-text-field]').type("azsp")
          .wait(1500)
       
        cy.get('[data-cy=login-submit-button]').click()
          .wait(1500)
        cy.contains('Alamat email tidak valid').should('exist')
        cy.contains('Kata sandi tidak boleh kosong').should('exist')
        cy.wait(1500)
      })

      it('Login with Valid Email and Wrong Password', () => {
        cy.get('[data-cy=login-email-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-email-text-field]').type("rasputindel@gmail.com")
          .wait(1500)
        cy.get('[data-cy=login-password-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-password-text-field]').type('rakamin666')
          .wait(1500)

        cy.get('[data-cy=login-submit-button]').click()
          .wait(1500)
        cy.contains('Kata sandi anda salah').should('exist')
        cy.wait(1500)
       })

      it('Login with Not Registered Email and Password', () => {
        cy.get('[data-cy=login-email-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-email-text-field]').type("12312313@gmail.com")
          .wait(1500)

        cy.get('[data-cy=login-password-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-password-text-field]').type('rakamin666')
          .wait(1500)

        cy.get('[data-cy=login-submit-button]').click()
          .wait(1500)
        cy.contains('Email ini belum terdaftar sebagai akun di Rakamin Academy').should('exist')
        cy.wait(1500)
      })

      it('Able To Redirect To Reset Password Page', () => {
        cy.get("#root > div.sc-bcsbzB.dNvuab > div > div.sc-bFMFLa.jlPjrP > form > div.sc-ixwpfd.iTUiFO > div").click()
          .wait(1500)
        cy.url().should('eq', 'https://web-staging.rakamin.com/forgot-password')
        cy.wait(1500)
      })

      it('Login with Correct Credential', () => {
        cy.get('[data-cy=login-email-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-email-text-field]').type("rasputindel@gmail.com")
          .wait(1500)
        cy.get('[data-cy=login-password-text-field]').click()
          .wait(1500)
        cy.get('[data-cy=login-password-text-field]').type('rakamin123')
          .wait(1500)

        cy.get('[data-cy=login-submit-button]').click()
          .wait(1500)
        cy.url().should('include', '/dashboard') // dont know the business process, but for general after login it will redirect to dashboard page
        cy.wait(1500)
      })
})