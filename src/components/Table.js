import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesRemove, modeONEdit } from '../redux/actions';

class Table extends Component {
  removeButton = (id) => {
    const { dispatch } = this.props;
    dispatch(expensesRemove(id));
  };

  buttonEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(modeONEdit(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <caption>Gastos:</caption>
          <tbody>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tbody>
          <tbody>
            {expenses.map((ele) => (
              <tr key={ ele.id }>
                <td>{ele.description}</td>
                <td>{ele.tag}</td>
                <td>{ele.method}</td>
                <td>{Number(ele.value).toFixed(2)}</td>
                <td>{ele.exchangeRates[ele.currency].name}</td>
                <td>{Number(ele.exchangeRates[ele.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(ele.exchangeRates[ele.currency]
                    .ask) * ele.value).toFixed(2)}

                </td>
                <td>BRL</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => { this.buttonEdit(ele.id); } }
                    data-testid="edit-btn"
                  >
                    Editar

                  </button>
                  <button
                    type="button"
                    onClick={ () => { this.removeButton(ele.id); } }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
