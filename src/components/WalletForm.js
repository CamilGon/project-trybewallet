import React, { Component } from 'react';
// falta ajustar o select

class WalletForm extends Component {
  render() {
    return (
      <form htmlFor="wallet-form">

        <input
          type="value"
          data-testid="value-input"
        />
        <input
          type="value"
          data-testid="description-input"
        />
        <select data-testid="currency-input">
          <option value="requisição a API">Requisição a API</option>
        </select>
        <select data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </form>

    );
  }
}

export default WalletForm;
