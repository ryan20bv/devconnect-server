import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlertAction } from "../../redux/actions/alertAction";
import { registerUserAction } from "../../redux/actions/authAction";
import PropTypes from "prop-types";
import Alert from "../layout/alert";

const Register = ({ setAlertAction, registerUserAction, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const { name, email, password, password2 } = formData;
	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlertAction("Password does not match!", "danger");
		} else {
			const msg = await registerUserAction(name, email, password);
			if (msg === "registered") {
				setFormData({
					name: "",
					email: "",
					password: "",
					password2: "",
				});
			}
		}
	};

	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<section className='container'>
			<Alert />
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form
				className='form'
				action='/'
				onSubmit={(e) => submitHandler(e)}
				autoComplete='off'
			>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={(e) => changeHandler(e)}
						// required
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => changeHandler(e)}
						// required
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
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
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						// minLength='6'
						value={password2}
						onChange={(e) => changeHandler(e)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to={"/login"}>Sign In</Link>
			</p>
		</section>
	);
};

Register.propTypes = {
	setAlertAction: PropTypes.func.isRequired,
	registerUserAction: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.isAuthenticated,
	};
};

export default connect(mapStateToProps, { setAlertAction, registerUserAction })(
	Register
);
// export default Register;
