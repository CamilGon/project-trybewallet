import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserLogin } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    enablebutton: true,
  };

  validFields = () => {
    const {
      email,
      password,
    } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const numbersix = 6;
    if (emailRegex.test(email) && password.length >= numbersix) {
      this.setState({
        enablebutton: false,
      });
    } else {
      this.setState({
        enablebutton: true,
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validFields);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(saveUserLogin(this.state));
    history.push('/carteira');
  };

  render() {
    const {
      email,
      password,
      enablebutton,
    } = this.state;

    return (
      <div>
        <form htmlFor="form-login" onSubmit={ (e) => e.preventDefault() }>
          <input
            htmlFor="input-email"
            type="email"
            name="email"
            value={ email }
            data-testid="email-input"
            placeholder="exemplo@exemplo.com"
            onChange={ this.handleChange }
          />
          <input
            htmlFor="input-password"
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            htmlFor="button-login"
            type="submit"
            disabled={ enablebutton }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
