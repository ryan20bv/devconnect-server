import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { connect } from "react-redux";
import { setAlertAction } from "../../redux/actions/alertAction";
import { loginUserAction } from "../../redux/actions/authAction";
import PropTypes from "prop-types";
import Alert from "../layout/alert";

const Login = ({ loginUserAction }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(formData);
		const msg = await loginUserAction(email, password);
		if (msg === "success") {
			setFormData({
				email: "",
				password: "",
			});
		}
	};

	return (
		<section className='container'>
			<Alert />
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into Your Account
			</p>
			<form
				className='form'
				action='/'
				onSubmit={(e) => submitHandler(e)}
				autoComplete='off'
			>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => changeHandler(e)}
						// required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						// minLength='6'
						value={password}
						onChange={(e) => changeHandler(e)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to={"/register"}>Register</Link>
			</p>
		</section>
	);
};

Login.propTypes = {
	loginUserAction: PropTypes.func.isRequired,
};

export default connect(null, { loginUserAction })(Login);
