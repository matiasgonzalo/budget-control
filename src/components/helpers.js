export const revisarPresupuesto = (presupuesto, restante) => {
    let classe;
    if((presupuesto / 4) > restante) {
        classe = 'error';
    }else if((presupuesto / 2) > restante) {
        classe = 'warning';
    }else{
        classe = 'success';
    }

    return classe;
}