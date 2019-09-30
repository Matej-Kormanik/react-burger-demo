import axios from "../../axios-orders";
import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {fetchOrders} from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(
                order => (<Order
                    key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}/>))
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}
// ============================ REDUX ==============================================

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
      onFetchOrders: () => dispatch(fetchOrders())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));