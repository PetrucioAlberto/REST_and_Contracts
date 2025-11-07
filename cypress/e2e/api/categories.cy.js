const categorySchema = require('../contracts/category.contract');

describe('Categorias - Adicionar, Editar e Deletar', () => {
  const baseUrl = 'http://lojaebac.ebaconline.art.br';
  let token;
  let categoryId;

  before(() => {
    cy.readFile('cypress/fixtures/token.json').then((data) => {
      token = data.token;
    });
  });

  it('Deve adicionar uma nova categoria', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/addCategory`,
      body: {
        authorization: token,
        name: 'Categoria Teste',
        photo: 'any',
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      const { error } = categorySchema.validate(res.body);
      expect(error).to.be.undefined;

      categoryId = res.body.data?._id; 
    });
  });

  it('Deve editar a categoria', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/api/editCategory/${categoryId}`,
      body: {
        authorization: token,
        name: 'Categoria Editada',
        photo: 'updated-photo',
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      const { error } = categorySchema.validate(res.body);
      expect(error).to.be.undefined;
    });
  });

  it('Deve deletar a categoria', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/api/deleteCategory/${categoryId}`,
      body: {
        authorization: token,
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);

      const { error } = categorySchema.validate(res.body);
      expect(error).to.be.undefined;
    });
  });
});
