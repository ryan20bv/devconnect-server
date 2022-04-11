import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../redux/actions/authAction.js";
import PropTypes from "prop-types";

const Navbar = ({ auth, logoutAction }) => {
	const { isAuthenticated, loading } = auth;
	const authLinks = (
		<ul>
			<li>
				<a onClick={logoutAction} href='/login'>
					<i className='fas fa-sign-out-alt' />{" "}
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='#!'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>
			{!loading && (
				<React.Fragment>
					{isAuthenticated ? authLinks : guestLinks}
				</React.Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logoutAction: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return { auth: state.authReducer };
};

export default connect(mapStateToProps, { logoutAction })(Navbar);
