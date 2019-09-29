import { PURCHASE_BURGER_FAIL, PURCHASE_BURGER_SUCCESS} from './actionTypes';
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

//=================================  async ========================================

export const purchaseBurgerStart = (orderData) => {
    return (dispatch) => {
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            }).catch(error => {
            console.log(error);
                dispatch(purchaseBurgerFail(error))
        });
    }

};