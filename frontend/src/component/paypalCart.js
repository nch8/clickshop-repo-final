// Custom component to wrap the PayPalButtons and handle currency changes
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { confirmarCompra } from "../services/service";
import {useNavigate} from 'react-router-dom';
import { Noti } from "./Notification";
const style = {"layout":"vertical"};
const ButtonWrapper = ({ currency, showSpinner,preciototal,renderPago }) => {
    const navigate = useNavigate();
    const amount = (preciototal/41.45).toFixed(2);
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    
    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={renderPago}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            console.log("orden",orderId)
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(async(details) => {
                        debugger
                        const name = details.payer.name.given_name;
                        try{
                        const res = await confirmarCompra("PAYPAL");
                        navigate('/productpending')
                        Noti(`Transacción completada por ${name}`);
                        }catch(error){
                            console.log(error)
                        }
                       
                    });
                }}
            />
        </>
    );
}

export default ButtonWrapper;