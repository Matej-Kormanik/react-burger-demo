import axios from "../../axios-orders";
import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get('/orders.json').then(response => {
            console.log(response);
            const fetchedOrders = [];
            for(let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({orders: fetchedOrders, loading: false});
            }
        ).catch(reason => {
            console.log(reason);
            this.setState({loading: false});
        });
    }


    render() {

        let orders = <Spinner />;
        if (!this.state.loading) {
            orders = this.state.orders.map(
                order => (<Order
                    key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}/>)
            )
        }


        return(
            <div>
                {orders}
            </div>
        );
    }

}


export default withErrorHandler(Orders, axios);