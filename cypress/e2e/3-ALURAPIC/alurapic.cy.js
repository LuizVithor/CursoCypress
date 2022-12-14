function geraStringAleatoria(tamanho){
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}

function geraStringAleatoriamaiuscula(tamanho){
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}


describe('login e registro de usuários alura pic' , ()=>{
    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com')
    })

    it('verificação mensagens validacao', () => {
        cy.contains('a' , 'Register now').click();
        cy.contains('button' , 'Register').click();
        cy.contains('ap-vmessage' , 'Email is required!').should('be.visible');
        cy.contains('button' , 'Register').click();
        cy.contains('ap-vmessage' , 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage' , 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage' , 'Password is required!').should('be.visible');
    })

    it('verificação de mensagens email invalido', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type(geraStringAleatoria(8));
        cy.contains('ap-vmessage' , 'Invalid e-mail').should('be.visible');
    })

    it('verificação de mensagens de senha com menos de 8 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type(geraStringAleatoria(3));
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage' , 'Mininum length is 8').should('be.visible');
    })

    it('verificação de mensagem de nome sem letra maiuscula' , () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type(geraStringAleatoriamaiuscula(3));
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage' , 'Must be lower case').should('be.visible');
    })

    it ('Teste login invalido' , () => {
        cy.login('Luiz' , '123');
        cy.on('window:alert' , (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
    })

    it('Teste login valido' , () => {
        cy.login('luizmonodarius' , 'Melhornasusbr');
        cy.contains('a' , '(Logout)').should('be.visible')
    })
})