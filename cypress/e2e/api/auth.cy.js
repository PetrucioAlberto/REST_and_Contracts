describe('Adicionar e Autenticar', () => {
  const random = Math.floor(Math.random() * 1000);
  const baseUrl = 'http://lojaebac.ebaconline.art.br';
  const uniqueEmail = `petrucio${Date.now()}@hotmail.com`;
  const firstName = `${random}petrucio`;
  const lastName = 'alberto';
  const phone = '11969432965';
  const password = 'petrucio1234';

  it('Deve adicionar um novo usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/public/addUser`,
      body: {
        email: uniqueEmail,
        phone,
        password,
        firstName,
        lastName
      }
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);
      expect(res.body).to.have.property('success', true);
    });
  });

  it('Deve autenticar usuário e salvar token', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/public/authUser`,
      body: {
        email: uniqueEmail,
        password
      }
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);
      expect(res.body).to.have.property('success', true);

      const token = res.body.data.token;

      cy.writeFile('cypress/fixtures/token.json', { token });
    });
  });
});
