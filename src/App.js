import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styles from './app.module.css';
import Presupuesto from './components/Presupuesto/Presupuesto';
import Gasto from './components/Gasto/Gasto';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Listado from './components/Listado/Listado';
import PresupuestoRestante from './components/PresupuestoRestante/PresupuestoRestante';
import { Button } from '@material-ui/core';

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

class App extends React.Component
{
  state = {
    presupuesto: '',
    gastos:[],
    resto: '',
    displayFormInputPresupuesto: true,
  }

  componentDidMount() {
    let presupuestoIncial = JSON.parse(localStorage.getItem('presupuesto'));
    let displayFormInputPresupuesto = JSON.parse(localStorage.getItem('displayFormInputPresupuesto'));
    if(!presupuestoIncial) {
      presupuestoIncial = '';
      this.setState(() => {
        return {
          presupuesto: presupuestoIncial,
          displayFormInputPresupuesto: displayFormInputPresupuesto
        }
      })
    }else{
      this.setState(() => {
        return {
          presupuesto: presupuestoIncial
        }
      })
    }
    let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
    if(!gastosIniciales) {
      gastosIniciales = [];
      this.setState(() => {
        return {
          gastos: gastosIniciales
        }
      })
    }else{
      this.setState(() => {
        return {
          gastos: gastosIniciales
        }
      })
    }
    let restoInicial = JSON.parse(localStorage.getItem('resto'));
    if(!restoInicial) {
      restoInicial = '';
      this.setState(() => {
        return {
          resto: restoInicial
        }
      })
    }else{
      this.setState(() => {
        return {
          resto: restoInicial
        }
      })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('presupuesto', JSON.stringify(this.state.presupuesto));
    localStorage.setItem('gastos', JSON.stringify(this.state.gastos));
    localStorage.setItem('resto', JSON.stringify(this.state.resto));
    localStorage.setItem('displayFormInputPresupuesto', JSON.stringify(this.state.displayFormInputPresupuesto));
  }

  setPresupuesto = (presupuesto) => {
    this.setState(() => {
      return {
        presupuesto: presupuesto,
        resto: presupuesto,
        displayFormInputPresupuesto: false,
      }
    });
  }

  setGasto = (gasto) => {
    const gastos = this.state.gastos;
    gastos.push(gasto);
    this.setState(() => {
      return {
        gastos
      }
    });
    this.setState(() => {
      return {
        resto: this.state.resto - gasto.gasto
      }
    });
  }

  refreshStatus = () => {
    this.setState(() => {
      return {
        presupuesto: '',
        gastos: [],
        resto: '',
        displayFormInputPresupuesto: true,
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...this.props}>
          <AppBar className={styles.appBar}>
            <Toolbar>
              <Typography variant="h6">Gasto semanal</Typography>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
        { this.state.displayFormInputPresupuesto ? (
          <div className={styles.root}>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <Paper className={styles.paper} mt={4} elevation={3}>
                  <Presupuesto setPresupuesto={this.setPresupuesto}/>
                </Paper>
              </Grid>
            </Grid>
          </div>
        ) : ( 
            <div className={styles.root}>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <Paper className={styles.paper} mt={4} elevation={3}>
                    <Gasto setGasto={this.setGasto} resto={this.state.resto}/>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <Paper className={styles.paper} mt={4} elevation={3}>
                    <Listado gastos={this.state.gastos}/>
                    <PresupuestoRestante mt={4} resto={this.state.resto} presupuesto={this.state.presupuesto}/>
                  </Paper>
                  <Button
                    type="button"
                    fullWidth
                    onClick={this.refreshStatus}
                    variant="contained"
                    color="secondary"
                    className={styles.refreshButton}
                  > Reiniciar Presupuesto
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
