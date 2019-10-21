import { PURCHASE_BURGER_FAIL, PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_START, FETCH_ORDERS_FAIL, FETCH_ORDERS_SUCCESS} from './actionTypes';
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
//=================================  ORDERS ========================================

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    }
};

//=================================  async ========================================

export const fetchOrders = (token) => {
  return (dispatch) => {
      dispatch(fetchOrdersStart());
      axios.get('/orders.json?auth=' + token).then(response => {
              const fetchedOrders = [];
              for(let key in response.data) {
                  fetchedOrders.push({
                      ...response.data[key],
                      id: key
                  });
              }
              dispatch(fetchOrdersSuccess(fetchedOrders));
          }
      ).catch(reason => {
          console.log(reason);
          dispatch(fetchOrdersFail(reason));
      });
  }
};

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(error => {
            console.log(error);
                dispatch(purchaseBurgerFail(error))
        });
    }

};