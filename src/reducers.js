export default function(state={}, action){
    if(action.type=='UPDATE_WANNABE'){
        return Object.assign({}, state, {wannabies:action.payload});
    }
    if(action.type=='UPDATE_FRIENDS'){
        return Object.assign({}, state, {friends:action.payload});
    }
    return state;
}
