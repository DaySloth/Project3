import React from 'react';
import Footer from '../../components/footer/footer';
import { MainHeader } from '../../components/header/header';
import Wrapper from '../../components/wrapper/wrapper';
import OrderSearch from '../../components/ordersPage/order-search/order-search.js';
import OrderDisplay from '../../components/ordersPage/order-display/order-display.js';

function Orders(){
    return (
        <>
        <MainHeader />

        <Wrapper>
            <OrderSearch />
            <OrderDisplay />
        </Wrapper>

        <Footer />
        </>
    )
};

export default Orders;