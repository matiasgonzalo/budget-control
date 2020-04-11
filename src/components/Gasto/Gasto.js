import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import shortid from 'shortid';
import styles from './gasto.module.css';

class Gasto extends Component
{
    state = {
        gasto: {
            nombre: '',
            gasto: '',
        },
        disabled: false,
    };
    
    handlerChange = event => {
        let { name, value } = event.target;
        if(name === 'gasto') {
            if (value >= 1 && !isNaN(value)) {
                this.setState(() => {
                    return {
                        gasto: {
                            ...this.state.gasto,
                            [name]: value
                        }
                    }
                })
            }else {
                this.setState(() => {
                    return {
                        gasto: {
                            ...this.state.gasto,
                            [name]: ''
                        }
                    }
                })
            }
        }else {
            this.setState(() => {
                return {
                    gasto: {
                        ...this.state.gasto,
                        [name]: value
                    }
                }
            })
        }
    }
      
    submitGasto = event => {
        event.preventDefault();
        const { disabled } = this.state;
        
        if(!this.form.isValid || disabled) {
            this.setState(() => {
                return {
                    disabled: true
                }
            });
        }
        const { nombre, gasto } = this.state.gasto;

        //asignar un id
        const newGasto = {
            id: shortid.generate(),
            nombre,
            gasto
        };
        //crear el gasto
        this.props.setGasto(newGasto);
        //reiniciar el form
        this.setState(() => {
            return {
                gasto: {
                    nombre: '',
                    gasto: ''
                }
            }
        });
        this.form.resetValidations();
    }
    
    validatorListener = result => {
        this.setState(() => {
            return {
                disabled: !result
            }
        });
    }

    render() {
        const { error, helperText } = this.props;
        const { isValid } = this.state.gasto;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <MoneyIcon className={styles.icon}/>
                    </Avatar>
                    <Typography component="h1" variant="h6"> Ingresar gasto
                    </Typography>
                    <ValidatorForm onSubmit={this.submitGasto} ref={r => (this.form = r)} className={styles.form} noValidate>
                        <TextValidator
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre del Gasto"
                            name="nombre"
                            autoComplete="nombre"
                            onChange={this.handlerChange}
                            value={this.state.gasto.nombre}
                            autoFocus
                            placeholder="Nombre del Gasto"
                            error={isValid || error}
                            helperText={(!isValid && this.errorMessage) || helperText}
                            validators={['required','minStringLength:2', 'maxStringLength:40', 'isString']}
                            errorMessages={['El nombre del gasto es requerida','El nombre del gasto debe ser mayor que 2', 'El nombre del gasto debe ser menor que 40', 'Debe ser un string']}
                            validatorListener={this.validatorListener}
                        />
                        <TextValidator
                            margin="normal"
                            required
                            fullWidth
                            id="gasto"
                            label="Cantidad de Gasto"
                            name="gasto"
                            autoComplete="gasto"
                            onChange={this.handlerChange}
                            value={this.state.gasto.gasto}
                            autoFocus
                            placeholder="Cantidad de Gasto"
                            error={isValid || error}
                            helperText={(!isValid && this.errorMessage) || helperText}
                            validators={['required','minFloat:1', `maxFloat:${this.props.resto}`, 'isFloat']}
                            errorMessages={['La cantidad de gasto es requerida','El gasto debe ser mayor que 1', `El gasto debe ser menor que ${this.props.resto}`, 'Debe ser un número decimal']}
                            validatorListener={this.validatorListener}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={this.state.disabled}
                            className={styles.submit}
                        > Agregar Gasto
                        </Button>
                    </ValidatorForm>
                </div>
            </Container>
        )
    }
}

export default Gasto;
