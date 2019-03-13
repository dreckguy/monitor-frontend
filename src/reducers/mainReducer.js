const MAX_DATA_POINTS = process.env.REACT_APP_MAX_DATA_POINTS;

export default (state = {}, action) => {
  switch(action.type){
    case 'FETCH_DATA':

    let newData = action.data;
    newData.time = new Date(newData.Timestamp);
    let last = state.last;
    if(!last){
      return {data:[newData],last:newData};
    }

    if(newData.time>last.time){

      //console.log("push new data!");
      let data = state.data;
      data.push(newData);
      last = newData;

      if(data.length > MAX_DATA_POINTS){
        state.data.shift();
      }

      return {data:data,last:last};

    }else{
      //console.log(`got old data`);
    
      return state;
    }
    
    case 'MSG':
    console.log(action.msg)
    return {...state, msg: action.msg};
    default:
      return state;
  }
   }