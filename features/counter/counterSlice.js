/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    items: [],
  },
  reducers: {

    decrement: (state, action) => {
      if(state.items.some( obj => obj._id == action.payload._id )){
       const index = state.items.map( e => e._id ).indexOf(action.payload._id);

       if(state.items[index].count == 1){
         state.items.splice(index,1)
       }else{
         state.items[index].count -= 1;
       }
      }
    },

    deleteItem: (state, action) => {
      const index = state.items.map( e => e._id ).indexOf(action.payload._id);
      state.items.splice(index, 1)     
    },

    deleteAll: (state, action) => {
      state.items = [];
    },

    addToCart: (state, action) => {
        
      if(state.items.length > 0){
        if(!state.items.some( obj => obj._id == action.payload._id )){
            state.items.push({
              _id: action.payload._id, 
              name: action.payload.name,
              price:action.payload.price, 
              imgURL:action.payload.imgURL,
              count:1});
        }else{
          const index = state.items.map( e => e._id ).indexOf(action.payload._id);
          state.items[index].count += 1;
        }

      }else{
        state.items.push({_id: action.payload._id, name: action.payload.name,
                         count:1, price:action.payload.price, 
                         imgURL:action.payload.imgURL}); 
      }
    }
  },
})

export const {decrement, deleteItem, deleteAll, addToCart} = counterSlice.actions;

export default counterSlice.reducer;