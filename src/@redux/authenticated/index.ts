// eslint-disable-next-line
export default (state: any, action: any) => {
    let nextState = false;
    switch (action.type) {
        case 'SET_AUTHENTICATED':
            nextState = action?.payload;
            break;
    }
    return nextState;
};
