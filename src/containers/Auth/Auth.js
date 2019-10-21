import React, {Component} from 'react';
import {connect} from 'react-redux'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
        }

        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
      const updatedControls = {
          ...this.state.controls,
          [controlName]: {
              ...this.state.controls[controlName],
              value: event.target.value,
              valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
              touched: true
          }
      };
      this.setState({controls: updatedControls})
    };

    switchAuthModeHandler = () => {
      this.setState(prevState => {
          return {
              isSignUp: !prevState.isSignUp
          }
      })
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    render() {
        let formElementArray = [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}/>
        ));

        if (this.props.loading) {
            form = <Spinner/>
        }



        return (
            <div className={classes.Auth}>
                <h2>{this.state.isSignUp ? 'REGISTER' : ' LOG IN'}</h2>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN OUT'}
                </Button>
            </div>
        );
    }
}

// ====================================  REDUX =================================================================

const mapStateToProps = (state) => {
  return {
      loading: state.auth.loading,
      error: state.auth.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      onAuth: (email, pass, isSignUp) => dispatch(actions.auth(email, pass, isSignUp))
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(Auth);