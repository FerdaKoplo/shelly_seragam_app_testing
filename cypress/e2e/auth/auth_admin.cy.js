import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

// Scenario: TC-ADM001 
Given ("user_admin berada di halaman login", ()=>{
    cy.visit("/login")
});
When ("admin mengisi username {string} dan password {string}", (username, password)=>{
    cy.get('#usernameInput').type(username)
    cy.get('#passwordInput').type(password)
});
When ("admin klik tombol login", ()=>{
    cy.get('.bg-neutral').click()
});
Then ("admin harus diarahkan ke halaman dashboard", ()=>{
    cy.url().should("include", "/admin/statistik-transaksi");
});

// Scenario: TC-ADM001-A 
Given ("admin berada di halaman statistik transaksi", ()=>{
    cy.loginAdmin();
    cy.visit("/admin/statistik-transaksi")
});
When ("admin klik tombol logout", ()=>{
    cy.get('.bg-neutral').click()
});
Then ("admin harus diarahkan ke halaman login", ()=>{
    cy.url().should("include", "/login");
});


// Scenario: TC-ADM001-NEG
Given ("user berada di halaman login", ()=>{
    cy.visit("/login")
});
When ("user mengisi username {string} dan password {string}", (username, password)=>{
    cy.get('#usernameInput').type(username)
    cy.get('#passwordInput').type(password)
});
When ("user klik tombol login", ()=>{
    cy.get('.bg-neutral').click()
});
Then ("user harus tetap di halaman login", ()=>{
    cy.get('.absolute > .font-inter').should('be.visible')
    cy.get('.absolute > .font-inter').click();
    cy.url().should("include", "/login");
});