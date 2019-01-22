
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS || 'localhost'
const SOCKET_PORT = process.env.SOCKET_PORT || '8081'



export default function configureStore() {

  let socket = io(`http://${BACKEND_ADDRESS}:${SOCKET_PORT}`);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
function reducer(state = {}, action){
  switch(action.type){
    case 'FETCH_DATA':
      return Object.assign({}, {...state, data:action.data});
    default:
      return state;
  }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
store.subscribe(()=>{
  console.log('new client state', store.getState());
});
store.dispatch({type:'server/hello', data:'Hello!'});

  return store
}