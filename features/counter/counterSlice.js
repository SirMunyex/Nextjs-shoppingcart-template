import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    items: [],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state, action) => {

      const check = state.items.some( obj => obj._id == action.payload._id );

      if(check){

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
      state.items.splice(index,1)     
    },

    deleteAll: (state, action) => {
      state.items = [];
    },

    incrementByAmount: (state, action) => {     

      state.value += action.payload
    },
    addToCart: (state, action) => {
        
      if(state.items.length > 0){

        // Check if the product is already addded to the cart
        const check = state.items.some( obj => obj._id == action.payload._id );

        if(!check){
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
export const { increment, decrement, deleteItem, deleteAll, incrementByAmount, addToCart } = counterSlice.actions;

export default counterSlice.reducer;