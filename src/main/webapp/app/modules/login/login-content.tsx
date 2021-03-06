import React, { Component } from 'react';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { Label } from 'reactstrap';
import { translate, Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';

export interface ILoginProps {
  handleLogin: Function;
  loginError: boolean;
}

class LoginContent extends Component<ILoginProps> {
  login = (event, errors, { username, password, rememberMe }) => {
    this.props.handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError } = this.props;
    return (
      <div className="row">
        <div className="col-lg-6 d-none d-lg-block bg-login-image" />
        <div className="col-lg-6">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">
                Witamy w PriceAdmin<sup>2</sup>
              </h1>
            </div>
            <Col md="12">
              {loginError ? (
                <Alert color="danger">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Błąd logowania</strong> Sprawdź wpisane dane
                  </Translate>
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <AvForm onSubmit={this.login} className={'user'}>
                <AvField
                  name="username"
                  className="form-control-user"
                  label={translate('global.form.username.label')}
                  placeholder={translate('global.form.username.placeholder')}
                  required
                  errorMessage="Username cannot be empty!"
                  autoFocus
                />
                <AvField
                  name="password"
                  type="password"
                  className="form-control-user"
                  label={translate('login.form.password')}
                  placeholder={translate('login.form.password.placeholder')}
                  required
                  errorMessage="Password cannot be empty!"
                />
                <AvGroup check inline>
                  <Label className="form-check-label custom-control custom-checkbox small">
                    <AvInput type="checkbox" name="rememberMe" id="customCheck" className={'custom-control-input'} />
                    <label className="custom-control-label" htmlFor="customCheck">
                      Zapamiętaj
                    </label>
                  </Label>
                </AvGroup>
                <Button color="primary" type="submit" className={'btn-user btn-block'}>
                  Zaloguj
                </Button>
              </AvForm>
            </Col>
            <hr />
            <div className="text-center">
              <Link to="/reset/request">Zapomniałeś hasła?</Link>
            </div>
            <div className="text-center">
              <Translate contentKey="global.messages.info.register.noaccount">Nie masz konta?</Translate>{' '}
              <Link to="/register">Zarejestruj nowe konto</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContent;
