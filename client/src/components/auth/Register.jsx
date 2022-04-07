import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alertAction";
import PropTypes from "prop-types";
import Alert from "../layout/alert";

const Register = ({ setAlert }) => {
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
			setAlert("Password does not match!", "danger");
		} else {
			console.log("success");
			setFormData({
				name: "",
				email: "",
				password: "",
				password2: "",
			});
			// const newUser = {
			// 	name,
			// 	email,
			// 	password,
			// };
			// try {
			// 	const res = await axios.post(
			// 		"http://localhost:5000/api/users/register",
			// 		newUser
			// 	);
			// 	console.log(res.data);
			// 	setFormData({
			// 		name: "",
			// 		email: "",
			// 		password: "",
			// 		password2: "",
			// 	});
			// } catch (error) {
			// 	console.log(error.response.data);
			// }
		}
	};

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
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => changeHandler(e)}
						required
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
						minLength='6'
						value={password}
						onChange={(e) => changeHandler(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='6'
						value={password2}
						onChange={(e) => changeHandler(e)}
						required
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
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return { state };
};

export default connect(mapStateToProps, { setAlert })(Register);
// export default Register;
