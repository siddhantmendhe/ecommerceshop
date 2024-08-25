import { createSlice } from "@reduxjs/toolkit";

const initialState=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')) :{cartItems:[],shippingAddress:{},paymentMethod:'PayPal'}

const addDecimals=(num)=>{
    return (Math.round(num*100/100)).toFixed(2);
}
const updateCartState=(state)=>{
        //Calculate items price
        state.itemsPrice=addDecimals(state.cartItems.reduce((acc, item)=> acc+item.price*item.qty, 0));

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
export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;

            if(state.cartItems.find(x=>x._id===item._id )){
                return state;

            }
            else{
                state.cartItems=[...state.cartItems, item];
            }

           updateCartState(state);


        },
        decreaseQty:(state,action)=>{
            const {item,value}=action.payload;

             state.cartItems=state.cartItems.map(temp=>{
                if(item._id===temp._id){
                    

                return {...item, qty:value}}
            else{
                return temp;
            }           })
          
            console.log(state);
            state.itemsPrice=addDecimals(state.cartItems.reduce((acc, item)=> acc+item.price*item.qty, 0));

           updateCartState(state);



        },
        increaseQty:(state,action)=>{
            const {item,value}=action.payload;

            state.cartItems=state.cartItems.map(temp=>{
                if(item._id===temp._id){
                    

                return {...item, qty:value}}
            else{
                return temp;
            }           })
            
           
            

         updateCartState(state);



        },
        removeCartItem:(state,action)=>{
            const item=action.payload;
            state.cartItems=state.cartItems.filter(temp=> temp._id!==item._id);
           
            updateCartState(state);

        },
        saveShipppingAddress:(state,action)=>{
            state.shippingAddress=action.payload;
            updateCartState(state);

        }
    },
   

});
export const {addToCart,decreaseQty, increaseQty, removeCartItem}= cartSlice.actions;
