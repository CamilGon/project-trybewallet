import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, wallet } = this.props;
    return (
      <div htmlFor="header_area">
        <h2 data-testid="email-field">{email}</h2>
        <h2 data-testid="total-field">{wallet}</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  wallet: globalState.wallet.wallet,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  wallet: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);
