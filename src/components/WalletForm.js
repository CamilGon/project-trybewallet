import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { coinSearch, saveExpenses,
  editExpenses, editOff } from '../redux/actions';
import fetchCoins from '../services/WalletAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    tag: 'Alimentação',
    method: 'Dinheiro',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(coinSearch());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  saveExpense = async () => {
    const { dispatch } = this.props;
    const {
      value,
      description,
      currency,
      tag,
      method,
      id,
    } = this.state;
    const exchangeRates = await fetchCoins();
    const objectWallet = {
      id,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates,
    };
    dispatch(saveExpenses(objectWallet));
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      currency: 'USD',
      tag: 'Alimentação',
      method: 'Dinheiro',
      description: '',
    }));
  };

  editExpenses = () => {
    const {
      dispatch,
      idToEdit,
      despesas,
    } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const despesa = despesas.find((el) => (el.id === idToEdit));
    const objExpense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: despesa.exchangeRates,
    };
    dispatch(editExpenses(objExpense));
    dispatch(editOff());
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
    });
  };

  render() {
    const {
      currencies,
      editor,
    } = this.props;
    const {
      value,
      description,
      currency,
      tag,
      method,
    } = this.state;
    return (
      <div>
        <form htmlFor="wallet-form">
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              name="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((item) => (
                <option value={ item } key={ item }>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method-input">
            Método:
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Tipo:
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          {!editor && (
            <button
              type="button"
              onClick={ this.saveExpense }
            >
              Adicionar despesa
            </button>
          )}

          {editor && (
            <button
              type="button"
              onClick={ this.editExpenses }
            >
              Editar despesa
            </button>
          )}

        </form>
      </div>
    );
  }
}
const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
  despesas: globalState.wallet.expenses,
  idToEdit: globalState.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  despesas: PropTypes.arrayOf.isRequired,
  idToEdit: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(WalletForm);
