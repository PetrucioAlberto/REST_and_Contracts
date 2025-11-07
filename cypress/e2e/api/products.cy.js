const productSchema = require('../contracts/product.contract');

describe('Produtos - Adicionar, Editar e Deletar', () => {
  const baseUrl = 'http://lojaebac.ebaconline.art.br';
  let token;
  let productId;

  before(() => {
    cy.readFile('cypress/fixtures/token.json').then((data) => {
      token = data.token;
    });
  });

  it('Deve adicionar um novo produto e validar contrato', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/addProduct`,
      body: {
        authorization: token,
        name: 'Produto Teste',
        price: 120.5,
        quantity: 15
      }
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      const { error } = productSchema.validate(res.body);
      expect(error).to.be.undefined;

      productId = res.body.data._id; 
    });
  });

  it('Deve editar o produto', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/api/editProduct/${productId}`,
      body: {
        authorization: token,
        name: 'Produto Editado',
        price: 150.75,
        quantity: 20
      }
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      const { error } = productSchema.validate(res.body);
      expect(error).to.be.undefined;
    });
  });

  it('Deve deletar o produto', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/api/deleteProduct/${productId}`,
      body: { authorization: token }
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);
      
      expect(res.body.success).to.be.true;
    });
  });
});
