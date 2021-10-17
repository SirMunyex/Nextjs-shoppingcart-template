import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    items: [],
  },
  reducers: {

    decrement: (state, action) => {
      // Check if the product is already addded in the cart
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
        
      // Check if the cart is empty
      if(state.items.length > 0){
        // Check if the product has not been added to the cart
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
        state.items.push({_id: action.payload._id, 
                         name: action.payload.name,
                         count:1,
                         price:action.payload.price, 
                         imgURL:action.payload.imgURL}); 
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const {decrement, deleteItem, deleteAll, addToCart} = counterSlice.actions;

export default counterSlice.reducer;