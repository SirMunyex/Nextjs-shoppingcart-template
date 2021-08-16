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
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {     

      state.value += action.payload
    },
    addToCart: (state, action) => {
        
      if(state.items.length > 0){

        // Check if the product is already addded to the cart
        const check = state.items.some( obj => obj.id == action.payload._id );

        if(!check){
            state.items.push({id: action.payload._id, count:1});
        }else{
            const index = state.items.map( e => e.id ).indexOf(action.payload._id);
            state.items[index].count += 1;
        }

      }else{
        state.items.push({id: action.payload._id, count:1}); 
      }

    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, addToCart } = counterSlice.actions

export default counterSlice.reducer