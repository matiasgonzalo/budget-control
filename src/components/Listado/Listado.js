import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import Avatar from '@material-ui/core/Avatar';
import styles from './listado.module.css';

class Listado extends React.Component {
    state = { 
        index: 1
    }

    handleListItemClick = (event, index) => {
        this.setState(() => (
            index
        ))
    };

    render() { 
        return ( 
            <div className={styles.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {this.props.gastos.map(gasto => (
                        <ListItem key={gasto.id}>
                            <ListItemAvatar>
                                <Avatar className={styles.avatar}>
                                    <MonetizationOnTwoToneIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={'$'+ gasto.gasto} secondary={gasto.nombre} />
                        </ListItem>
                    ))}
                </List>
            </div>
         );
    }
}
 
export default Listado;