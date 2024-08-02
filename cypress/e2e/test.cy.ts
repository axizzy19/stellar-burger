Cypress.on('uncaught:exception', () => {
  return false;
});

describe('проверяем доступность приложения', function() {
  it('сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit('http://localhost:4000/');
  });
})

beforeEach(() => {
  cy.visit('http://localhost:4000/');

  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');
  
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: `api/ingredients`
      },
      ingredients
    ).as('getIngredients');
  });

  // авторизация
  cy.fixture('user.json').then((user) => {
    cy.intercept(
      {
        method: 'GET',
        url: `api/auth/user`
      },
      user
    ).as('getUser');
  });
})

afterEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
})

describe('проверка работоспособности приложения', function() {

  it('Конструктор перед открытием пуст', () => {
    const noBunTop = cy.get(`[data-cy=no_bun_top]`);
    const noBunBottom = cy.get(`[data-cy=no_bun_bottom]`);
    const noIngredients = cy.get(`[data-cy=no_ingredients]`);

    noBunTop.contains('Выберите булки');
    noBunBottom.contains('Выберите булки');
    noIngredients.contains('Выберите начинку');
  })

  it('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    const bun = cy.get(`[data-cy=bun_0]`+` button`);
    const ingredient = cy.get(`[data-cy=ingredient_0]`+` button`);
    const constructor = cy.get(`[data-cy=constructor_section]`);

    bun.click();
    ingredient.click({multiple: true});
    constructor.contains('булка');
  })

  it('Открытие и закрытие модального окна с описанием ингредиента', () => {
    const bun = cy.get(`[data-cy=bun_0]`);
    bun.click();

    cy.get(`[data-cy=ingredient_modal]`);
    cy.get(`[data-cy=close_modal_button]`).click();
  })

  it('Процесс создания нового заказа', () => {
    const bun = cy.get(`[data-cy=bun_0]`+` button`);
    const ingredient = cy.get(`[data-cy=ingredient_0]`+` button`);
    bun.click();
    ingredient.click({multiple: true});

    const getButton = cy.get(`[data-cy=new_order_total] button`);
    getButton.click();

    cy.fixture('newOrder.json').then((newOrder) => {
      cy.intercept(
        {
          method: 'POST',
          url: `api/orders`
        },
        newOrder
      ).as('newOrder');
      
      cy.get(`[data-cy=new_order_number]`).contains(newOrder.order.number);

    })

    cy.get(`[data-cy=close_modal_button]`).click();
    cy.get(`[data-cy=no_bun_top]`).contains('Выберите булки');
    cy.get(`[data-cy=no_bun_bottom]`).contains('Выберите булки');
    cy.get(`[data-cy=no_ingredients]`).contains('Выберите начинку');
   
  })
})

// sdfsedf
