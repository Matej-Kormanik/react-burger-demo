import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';
class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinued}/>
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
                </div>)
        }
        
        return summary;
    }
}


//==========================================   REDUX   ====================================================

const mapStateToProps = ( state ) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);