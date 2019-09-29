import { PURCHASE_BURGER_FAIL, PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_START, PURCHASE_INIT} from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
  return {
      type: PURCHASE_BURGER_FAIL,
      error: error
  }
};


export const purchaseBurgerStart = () => {
  return {
      type: PURCHASE_BURGER_START
  }
};

export const purchaseInit = () => {
  return {
      type: PURCHASE_INIT
  }
};

//=================================  async ========================================

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(error => {
            console.log(error);
                dispatch(purchaseBurgerFail(error))
        });
    }

};