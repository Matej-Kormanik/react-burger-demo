import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";


class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Matko Kormanik',
                address: {
                    street: 'street',
                    zipCode: '03101',
                    country: 'slovakia'
                }
            },
            email: 'bla@gmail.com',
            deliveryMode: 'fast'
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
                console.log(error);
                this.setState({loading: false});
        });
    };


    render() {

        let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name" />
            <input className={classes.Input} type="text" name="email" placeholder="your email" />
            <input className={classes.Input} type="text" name="street" placeholder="street number" />
            <input className={classes.Input} type="text" name="zip" placeholder="zip code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }

}




export default ContactData;