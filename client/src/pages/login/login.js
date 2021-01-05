import React from "react";
import Wrapper from "../../components/wrapper/wrapper";
import Logo from "../../components/loginPage/logo/logo.js";
import LoginForm from "../../components/loginPage/login-form/login-form.js";
import Footer from '../../components/footer/footer.js';
import './login.css';

function Login() {
    return (
        <>
            <Wrapper>
                <div className="center login-center">
                    <Logo />
                    <LoginForm />
                </div>
            </Wrapper>
            <Footer />
        </>
    );
}

export default Login;
