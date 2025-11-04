describe('Automation Webpage project', () => {
  
  beforeEach("Website", () =>{
    cy.visit('/')
    //Como siempre visitaremos la misma pagina, añadimos el metodo visit en un beforeEach

  })

  it("Smoketest 001", ()=> {
    
    cy.get('#header img').should('be.visible');
    cy.get('#slider-carousel div.active span').should('be.visible');
    cy.get('#slider-carousel div.active h2').should('be.visible');
    cy.get('#slider-carousel div.active p').should('be.visible');
    cy.get('div:nth-child(3) div.product-overlay').should('be.visible');
    cy.get('div:nth-child(4) div.overlay-content').should('be.visible');
    cy.get('div:nth-child(5) div.product-overlay').should('be.visible');
    cy.get('div.left-sidebar > h2:nth-child(1)').should('be.visible');
    cy.get('#header a[href="/products"]').should('be.visible');
    cy.get('#header a[href="/view_cart"]').should('be.visible');
    cy.get('#header a[href="/login"]').should('be.visible');
    cy.get('#header a[href="/test_cases"]').should('be.visible');
    cy.get('#header a[href="/api_list"]').should('be.visible');
    cy.get('#header a[href="https://www.youtube.com/c/AutomationExercise"]').should('be.visible');
    cy.get('#header a[href="/contact_us"]').should('be.visible');
  
  })
  
  it("Register user", ()=> {
    cy.get('#header a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(Cypress.env("name"), {force: true, delay: 100});
    cy.get('[data-qa="signup-email"]').type(Cypress.env("email"), {force:true, delay:100});
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[data-qa="password"]').type(Cypress.env("password"), {force:true, delay:100});
    cy.get('[data-qa="days"]').select('31');
    cy.get('[data-qa="months"]').select('1');
    cy.get('[data-qa="years"]').select('1999');
    cy.get('[name="newsletter"]').check();
    cy.get('[name="optin"]').check();
    cy.get('[data-qa="first_name"]').type(Cypress.env("name"), {force:true, delay:100});
    cy.get('[data-qa="last_name"]').type(Cypress.env("surname"), {force:true, delay:100});
    cy.get('[data-qa="company"]').type('dasit');
    cy.get('[data-qa="address"]').type('avenida longar', {force:true, delay:100});
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('texas');
    cy.get('[data-qa="city"]').type('dallas');
    cy.get('[data-qa="zipcode"]').type('64654654', {force:true, delay:100});
    cy.get('[data-qa="mobile_number"]').type('56589441022', {force:true, delay:100});
    cy.get('[data-qa="create-account"]').click();
  })

    // con estos dos metodos, comprobamos que no se registra el mismo usuario otra vez con el mismo correo electronico.


  it("Register existing user and log in then", ()=> {
    cy.get('#header a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').click();
    cy.get('[data-qa="signup-name"]').type(Cypress.env("name"),{force:true, delay:100});
    cy.get('[data-qa="signup-email"]').type(Cypress.env("email"), {force:true, delay:100});
    cy.get('[data-qa="signup-button"]').click();
    // In the next if method, if the form p contains Email Address already exist! the if will not be executed and passes to the else, then continues with the register
    if (cy.get('#form p').contains("Email Address already exist!").wait(2000)) {
        cy.get('[data-qa="login-email"]').type(Cypress.env("email"), {force:true, delay:100});
        cy.get('[data-qa="login-password"]').type(Cypress.env("password"), {force:true, delay:100});
        cy.get('[data-qa="login-button"]').click();

        //Aqui finaliza el registro, lo hace bien jeje
      } else {
        cy.get('[data-qa="password"]').type('abc12345!');
        cy.get('[data-qa="days"]').select('31');
        cy.get('[data-qa="months"]').select('1');
        cy.get('[data-qa="years"]').select('1999');
        cy.get('[name="newsletter"]').check();
        cy.get('[name="optin"]').check();
        cy.get('[data-qa="first_name"]').type('sergio');
        cy.get('[data-qa="last_name"]').type('campos');
        cy.get('[data-qa="company"]').type('dasit');
        cy.get('[data-qa="address"]').type('avenida longar');
        cy.get('[data-qa="country"]').select('United States');
        cy.get('[data-qa="state"]').type('texas');
        cy.get('[data-qa="city"]').type('dallas');
        cy.get('[data-qa="zipcode"]').type('64654654');
        cy.get('[data-qa="mobile_number"]').type('56589441022');
        cy.get('[data-qa="create-account"]').click();
      }
    

  })

  it('Add to cart', function() {
    cy.login() //creamos un metodo en el archivo de commands y lo llamamos dentro de nuestro test. al ser un metodo repetitivo, lo llamamos en todos los test siguientes
    //para que tenga una ruta el test que se pueda ejecutar todo de golpe sin problemas
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()
    cy.get('#quantity').type("2")
    cy.get(':nth-child(5) > .btn').click()
    cy.get('.modal-footer > .btn').click()
    cy.get('.shop-menu > .nav > :nth-child(1) > a').click()
    cy.get(':nth-child(8) > .product-image-wrapper > .choose > .nav > li > a').click()
    cy.wait(1000)
    cy.get(':nth-child(5) > .btn').click()
    cy.wait(1000)
    cy.get('.modal-footer > .btn').click()
    cy.wait(1000)
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
    cy.get('.col-sm-6 > .btn').click()
    cy.get('#address_delivery').should('be.visible')
    cy.get('#address_invoice').should('be.visible')
    cy.get(':nth-child(7) > .btn').click()
    cy.cardInfo() //Al ser un metodo que repetiremos en multiples ocasiones, lo creamos en el apartado commands y lo llamamos dentro de cada test
  });

  it('Add to cart from recommended products', function() {
    cy.login()
    cy.visit("https://www.automationexercise.com/")
    cy.get('#recommended-item-carousel').invoke('stop')
    cy.get('#recommended-item-carousel a[data-product-id="1"]').click({force:true})
    cy.get('#cartModal button.close-modal').click();
    cy.get('#recommended-item-carousel a[data-product-id="2"]').click({force:true})
    cy.get('#cartModal button.close-modal').click();
    cy.get('#recommended-item-carousel a[data-product-id="3"]').click({force:true})
    cy.get('#cartModal button.close-modal').click();
    cy.get('#header a[href="/view_cart"]').click();
    cy.get('#do_action a.btn').click();
    cy.get('#address_delivery').should("be.visible")
    cy.get('#cart_items a.btn').click();
    cy.cardInfo()
    cy.get('[data-qa="continue-button"]').click()

  });

  it('Delete product from cart', function() {
    cy.login()
    cy.get('a[href="/product_details/1"]').click();
    cy.get('[name="quantity"]').clear();
    cy.get('[name="quantity"]').type('4');
    cy.get('button.cart').click();
    cy.get('#cartModal button.close-modal').click();
    cy.get('#header a[href="/view_cart"]').click();
    cy.get('#product-1 button.disabled').should('have.text', '4');
    cy.get('#product-1 i.fa').click();
    cy.get('#empty_cart b').should('have.text', 'Cart is empty!');
    cy.get('#empty_cart u').click();
    cy.get('h2.title').should('have.text', 'All Products');
  });

  it('Add review from product', function() {
    cy.login()
    cy.get('a[href="/product_details/1"]').click();
    cy.get('#name').click();
    cy.get('#name').type('Sergio');
    cy.get('#email').type('s.camposlacueva@gmail.com');
    cy.get('[name="review"]').click();
    cy.get('[name="review"]').type('This is a test review automated');
    cy.get('#button-review').click();
    cy.get('#review-section span').should('have.text', 'Thank you for your review.');

  });

  it('Contact Us form', function() {
    cy.login()
    cy.get('#header ul.nav').click();
    cy.get('#header a[href="/contact_us"]').click();
    cy.get('[data-qa="name"]').click();
    cy.get('[data-qa="name"]').type('Sergio');
    cy.get('[data-qa="email"]').type('s.camposlacueva@gmail.com');
    cy.get('[data-qa="subject"]').type('TEstForm');
    cy.get('[data-qa="message"]').type('This is a test form performed by the qa member Sergio Campos');
    cy.get('[data-qa="submit-button"]').click();
    cy.get('#contact-page div.alert').should('have.text', 'Success! Your details have been submitted successfully.');
    cy.get('#form-section a.btn').click();

    //En la pagina web, tenemos dentro del formulario de prueba una opcion para subir un archivo de forma local. Necesitariamos descargar el plug in Cypress-file-upload
    //Este caso de prueba lo consideraremos hacerlo de forma manual el paso de subir un articulo

  });

  it('Search product', function() {
    cy.login()
    cy.get('#header a[href="/products"]').click();
    cy.get('[name="search"]').type('jean');
    cy.get('#submit_search i.fa').click();
    cy.get('div:nth-child(3) div.productinfo p').should('contain.text', 'Jeans');
    cy.get('div:nth-child(4) div.productinfo p').should('contain.text', 'Jeans');
    cy.get('div:nth-child(5) div.productinfo p').should('contain.text', 'Jeans');

  });

  it.only('Scroll Up with arrows', function() {
    cy.get('#header div.row').click();
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
    cy.press(Cypress.Keyboard.Keys.DOWN)
  });



  



  //Probando las APIs que esten todas activas

  it('API 2: POST To All Products List', () => {
    //Response code: 405 - ok
    //Response Message: This request method is not supported - ok 
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/productsList',
    }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
      })
  })

  it('API 1: Get All Products List', () => {
    //Response code: 200 - ok
    //Response: All product list
    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/productsList',
    }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
      })
  })

  it('API 3: Get All Brands List', () => {
    cy.request('GET', 'https://automationexercise.com/api/brandsList')
      .then((response) =>{
      cy.log(JSON.stringify(response.body))
    })
    })



  it('API 4: PUT To All Brands List', () => {
    cy.request('PUT', 'https://automationexercise.com/api/brandsList')
    .then((response) =>{
    cy.log(JSON.stringify(response.body))

    })
  })

  it('API 5: POST to search product', () => {
    //Response code: 200 - ok
    //Response JSON: products with "Jean" key
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/searchProduct',
      form: true,
      body:{
        search_product: 'jean'
      }
    }).then((response) =>{
      expect(response.status).to.eq(200)
      cy.log(JSON.stringify(response.body))
    })
    })

  it('API 6: POST To Search Product without search_product parameter', () => {
    //Response code: 400 - ok
    //Response JSON: Bad request: search_product parameter is missing in POST request. - ok
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/searchProduct',
    }).then((response) =>{
      expect(response.status).to.eq(200)
      cy.log(JSON.stringify(response.body))
    })
    })

  it("API 7: POST To Verify Login with valid details", () =>{
    // Response Message: User exists!
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true, //convierte el body a x-www-form-urlencoded
      body:{
        email: 's.camposlacueva@gmail.com',
        password: 'abc12345!',
      },
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
      })
  })

  it("API 8: POST To Verify Login without email parameter", () =>{
    //Response code: 400 - ok
    //Bad request, email or password parameter is missing in POST request. - ok
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
      })
  })

  it("API 9: DELETE To Verify Login", () =>{
    //Response code: 405 - ok
    //Response Message: This request method is not supported. - ok
    cy.request({
      method: 'DELETE',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body:{
        email: 's.camposlacueva@gmail.com',
        password: 'abc12345!'
      }
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
      })
  })

  it("API 10: POST To Verify Login with invalid details", () =>{
    // Response Message: User not found!
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true, //convierte el body a x-www-form-urlencoded
      body:{
        email: 's.camposlacueva@gmail.com',
        password: 'abc12345!a', //Añadimos una letra para dar error
      },
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
    })
  })

  it("API 11: POST To Create/Register User Account", () =>{
    // Response Message: User created!
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true, //convierte el body a x-www-form-urlencoded
      body:{
        name: "Marianico",
        email:"emailtest1@gmail.com",
        password: "1234567890",
        title: "Mr",
        birth_date: "31",
        birth_month: "01",
        birth_year: "2001",
        firstname: "Sergio",
        lastname:"marianico",
        company: "dasit",
        address1: "avenida avenida",
        address2: "aasd",
        country: "spain",
        zipcode: "50004",
        state:"zaragoza",
        city:"zaragoza",
        mobile_number:"656253258"
      },
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
    })
  })

  it("API 12: DELETE METHOD To Delete User Account", () =>{
    // Response Message: Account Deleted!
    cy.request({
      method: 'DELETE',
      url: 'https://automationexercise.com/api/deleteAccount',
      form: true, //convierte el body a x-www-form-urlencoded
      body:{
        email: 'emailtest1@gmail.com',
        password: '1234567890',
      },
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
    })
  })

  it("API 13: PUT METHOD To Update User Account", () =>{
    // Response Message: User Updated!
    cy.request({
      method: 'PUT',
      url: 'https://automationexercise.com/api/updateAccount',
      form: true, //convierte el body a x-www-form-urlencoded
      body:{
        name: "Marianico",
        email:"s.camposlacueva@gmail.com",
        password: "abc12345!",
        title: "Mr",
        birth_date: "31",
        birth_month: "01",
        birth_year: "2001",
        firstname: "Sergio",
        lastname:"marianico",
        company: "dasit",
        address1: "avenida avenida",
        address2: "aasd",
        country: "spain",
        zipcode: "50004",
        state:"zaragoza",
        city:"zaragoza",
        mobile_number:"656253258"
      },
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
    })
  })

  it("API 14: GET user account detail by email", () =>{
    // Response Message: Details of the user
    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/getUserDetailByEmail',
      qs:{
        email: 's.camposlacueva@gmail.com'      
      },
    })     
    .then((response) => {
        cy.log(JSON.stringify(response.body))
    })
  })
});

it('recommended', function() {
  cy.visit('https://www.automationexercise.com/')
  
});

it('carrousel stop', function() {
  cy.visit('https://www.automationexercise.com/')
  
});

it('a', function() {
  cy.visit('https://www.automationexercise.com/')
  
});

it('a', function() {
  cy.visit('https://www.automationexercise.com/')
  
});



