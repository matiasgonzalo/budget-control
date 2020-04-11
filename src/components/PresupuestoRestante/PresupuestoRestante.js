import React from 'react';
import styles from './presupuestoRestante.module.css';
import Alert from '@material-ui/lab/Alert';
import { revisarPresupuesto } from '../helpers';

class PresupuestoRestante extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className={styles.root}>
                <Alert icon={false} severity="info">
                    Presupuesto: ${this.props.presupuesto}
                </Alert>
                <Alert icon={false} severity={revisarPresupuesto(this.props.presupuesto, this.props.resto)}>
                    Restante: ${this.props.resto}
                </Alert>
            </div>
         );
    }
}
 
export default PresupuestoRestante;
