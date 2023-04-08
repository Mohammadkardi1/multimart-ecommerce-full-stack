import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0 
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload; 
            const existingItem = state.cartItems.find(item => item.id === newItem.id)
            // console.log(newItem)
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    quantity: 1,
                    price: Number(newItem.price)   
                    // Please update here when you want to add new item to the cart
                })
            } else {
                existingItem.quantity ++
                existingItem.price = Number(newItem.price) + Number(existingItem.price)
            }
            state.totalQuantity ++
            state.totalAmount = state.cartItems.reduce((total, item) => {
                return  total + Number(item.price)
            }, 0)
        },
        deleteItem: (state,action) => {
            const id = action.payload
            // const cartItems = state.cartItems
            const indexOfProduct = state.cartItems.findIndex(item => item.id === id)
            console.log( "deletedItem.price")
            console.log(Number(state.cartItems[indexOfProduct].price))
            state.totalAmount = state.totalAmount - (Number(state.cartItems[indexOfProduct].price ) / state.cartItems[indexOfProduct].quantity)
            state.totalQuantity --
            if (state.cartItems[indexOfProduct].quantity === 1 ) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                // state.cartItems.splice(indexOfProduct,1)
            } else {
                state.cartItems[indexOfProduct].price =  state.cartItems[indexOfProduct].price - (Number(state.cartItems[indexOfProduct].price) / state.cartItems[indexOfProduct].quantity)
                state.cartItems[indexOfProduct].quantity --
            }
        }
    }
});

export const cartActions = CartSlice.actions

export default CartSlice.reducer
