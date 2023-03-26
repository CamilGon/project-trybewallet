import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalCoins = () => {
    const { expenses } = this.props;
    const coins = expenses.reduce((acc, crr) => {
      const coin = crr.currency;
      const { ask } = crr.exchangeRates[coin];
      const { value } = crr;
      const sum = acc + (Number(value) * Number(ask));
      return sum;
    }, 0);

    return coins.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div htmlFor="header_area">
        <h5 data-testid="email-field">
          Usuario :
          {email}
        </h5>
        <h5 data-testid="total-field">
          {this.totalCoins()}
        </h5>
        <h5 data-testid="header-currency-field">Moeda: BRL</h5>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
export default connect(mapStateToProps)(Header);
