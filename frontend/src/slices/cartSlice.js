import { createSlice } from "@reduxjs/toolkit";

const initialState=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')) :{cartItem:[]}

const addDecimals=(num)=>{
    return (Math.round(num*100/100)).toFixed(2);
}
export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;

            if(state.cartItem.find(x=>x._id===item._id )){
                return state;

            }
            else{
                state.cartItem=[...state.cartItem, item];
            }

            //Calculate items price
            state.itemsPrice=addDecimals(state.cartItem.reduce((acc, item)=> acc+item.price*item.qty, 0));

            //Calculate shipping charge
            state.shippingCharge=addDecimals(state.itemsPrice>100?0:10);
            //Calculate Items Tax
            state.taxPrice=addDecimals((Number(0.15*(state.itemsPrice))));
            //Calculate Total price
            state.totalPrice=(
                Number(state.itemsPrice)+
                Number(state.shippingCharge)+
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart',JSON.stringify(state))

        }
    },
   

});
export const {addToCart}= cartSlice.actions;
