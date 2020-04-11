import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import styles from './presupuesto.module.css';

class Presupuesto extends React.Component 
{
  state = {
    presupuesto: '',
    disabled: false
  };

  handlerChange = event => {
    const value = event.target.value;
    if (value >= 1 && !isNaN(value)) {
      this.setState(() => {
        return {
          presupuesto: value
        }
      })
    }else {
      this.setState(() => {
        return {
          presupuesto: ''
        }
      })
    }
  }
  
  submitPresupuesto = event => {
    event.preventDefault();
    const { disabled } = this.state;
    //validar
    if(!this.form.isValid || disabled) {
      this.setState(() => {
        return {
          disabled: true
        }
      });
    }
    //crear presupuesto
    this.props.setPresupuesto(this.state.presupuesto);
  }

  validatorListener = result => {
    this.setState(() => {
      return {
        disabled: !result
      }
    });
  }

  componentWillUnmount() {
    //reiniciar el estado
    this.setState(() => {
      return {
        presupuesto: ''
      }
    });
    //reiniciar el form
    this.form.resetValidations();
  }

  render() {
    const { error, helperText } = this.props;
    const { isValid } = this.state.presupuesto;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <MoneyIcon className={styles.icon}/>
          </Avatar>
          <Typography component="h1" variant="h6"> Ingresar presupuesto
          </Typography>
          <ValidatorForm onSubmit={this.submitPresupuesto} ref={r => (this.form = r)} className={styles.form} noValidate>
            <TextValidator
              margin="normal"
              required
              fullWidth
              id="presupuesto"
              label="Presupuesto"
              name="presupuesto"
              autoComplete="presupuesto"
              onChange={this.handlerChange}
              value={this.state.presupuesto}
              autoFocus
              placeholder="Cantidad de presupuesto"
              error={isValid || error}
              helperText={(!isValid && this.errorMessage) || helperText}
              validators={['required','minFloat:10.00', 'maxFloat:100000000', 'isFloat']}
              errorMessages={['La cantidad de presupuesto es requerida','El presupuesto debe ser mayor que 10', 'El presupuesto debe ser menor que 100000000', 'Debe ser número decimal']}
              validatorListener={this.validatorListener}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={this.state.disabled}
              className={styles.submit}
            > Agregar Presupuesto
            </Button>
          </ValidatorForm>
        </div>
      </Container>
    )
  }
}

export default Presupuesto;
