import { createContext, useState, useEffect } from 'react'
import { pruduct_list as fallback_product_list, our_team } from '../assets/assets'
import { getJSON } from '../utils/api'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [product_list, setProductList] = useState([])
    const [cartItems, setCartItems] = useState({})

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getJSON('/api/menu');
                if (data && data.length > 0) {
                    setProductList(data);
                } else {
                    setProductList(fallback_product_list);
                }
            } catch (err) {
                console.error("Failed to load products from live database. Falling back to local assets.");
                setProductList(fallback_product_list);
            }
        };
        loadProducts();
    }, []);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = product_list.find((product) => product._id == item || String(product.id) == String(item))
                if (itemInfo) {
                    totalAmount = totalAmount + itemInfo.price * cartItems[item]
                }
            }
        }
        return totalAmount
    }
    const contextValue = {
        product_list,
        our_team,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
