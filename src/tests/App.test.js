import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import App from '../App';
import wallet from '../redux/reducers/wallet';
import user from '../redux/reducers/user';

describe('Testa se a aplicação esta funcionando como deveria', () => {
  const renderWithRedux = (component) => {
    const history = createMemoryHistory();
    const store = createStore(combineReducers({ wallet, user }), applyMiddleware(thunk));
    return {
      ...render(
        <Provider store={ store }>
          <Router history={ history }>
            {component}
          </Router>
        </Provider>,
      ),
      store,
      history,
    };
  };

  it('Teste se existe label com o texto "email" e "password"', () => {
    const { getByText } = renderWithRedux(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const email = getByText('Email:');
    const password = getByText('Password:');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Testa o formulário funciona corretamente', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <MemoryRouter initialEntries={ ['/'] }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MemoryRouter>,
    );

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByText('Entrar');
    fireEvent.change(email, { target: { value: 'teste@teste.com' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);
    const valor = getByText('Valor:');
    const description = getByText('Descrição:');
    const moeda = getByText('Moeda:');
    const metodo = getByText('Método de pagamento:');
    const tag = getByText('Tag:');
    expect(valor).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(metodo).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });

  it('Testa se o botão "Adicionar despesa" funciona corretamente', async () => {
    const { getByTestId, getByText, debug } = renderWithRedux(
      <MemoryRouter initialEntries={ ['/'] }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MemoryRouter>,
    );
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const button = getByText('Entrar');
    fireEvent.change(email, { target: { value: 'teste@teste.com' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(button);
    const valor = getByTestId('value-input');
    const description = getByTestId('description-input');
    const moeda = getByTestId('currency-input');
    const metodo = getByTestId('method-input');
    const tag = getByTestId('tag-input');
    const buttonAdicionar = getByText('Adicionar despesa');
    fireEvent.change(valor, { target: { value: '1' } });
    fireEvent.change(description, { target: { value: 'teste' } });
    fireEvent.change(moeda, { target: { value: 'USD' } });
    fireEvent.change(metodo, { target: { value: 'Dinheiro' } });
    fireEvent.change(tag, { target: { value: 'Alimentação' } });
    await waitFor(() => {
      fireEvent.click(buttonAdicionar);
    });
    await waitFor(() => {
      debug();
      const totalField = getByTestId('total-field');
      expect(totalField).toHaveTextContent('5.20');
    });
  });
});
