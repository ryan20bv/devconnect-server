import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { newExperienceAction } from "../../redux/actions/profileAction";
import PropTypes from "prop-types";
import Alert from "../layout/alert";

const AddExperience = ({ isAuthenticated, newExperienceAction }) => {
	const [newExperience, setNewExperience] = useState({
		title: "",
		company: "",
		location: "",
		from: "",
		current: "",
		to: "",
		description: "",
	});

	const changeHandler = (e) => {
		setNewExperience({
			...newExperience,
			[e.target.name]: e.target.value,
			current: e.target.checked,
		});
	};
	const navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		const msg = await newExperienceAction(newExperience);
		if (msg === "success") {
			return navigate("/dashboard");
		}
	};

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	return (
		<section className='container'>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<small>* = required field</small>
			<Alert />
			<form className='form' onSubmit={(e) => submitHandler(e)}>
				<div className='form-group'>
					<small className='form-text'>* Title</small>
					<input
						type='text'
						placeholder='* Job Title'
						name='title'
						onChange={(e) => changeHandler(e)}
						value={newExperience.title}
						required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>* Company</small>
					<input
						type='text'
						placeholder='* Company'
						name='company'
						onChange={(e) => changeHandler(e)}
						value={newExperience.company}
						// required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>Location</small>
					<input
						type='text'
						placeholder='Location'
						name='location'
						onChange={(e) => changeHandler(e)}
						value={newExperience.location}
					/>
				</div>
				<div className='form-group'>
					<h4>* From Date</h4>
					<input
						type='date'
						name='from'
						onChange={(e) => changeHandler(e)}
						value={newExperience.from}
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							onChange={(e) => changeHandler(e)}
							value={newExperience.current}
						/>{" "}
						Current Job
					</p>
				</div>
				{!newExperience.current && (
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							onChange={(e) => changeHandler(e)}
							value={newExperience.to}
						/>
					</div>
				)}
				<div className='form-group'>
					<small className='form-text'>Description</small>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						onChange={(e) => changeHandler(e)}
						value={newExperience.description}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</section>
	);
};

AddExperience.propTypes = {
	newExperienceAction: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.isAuthenticated,
	};
};

export default connect(mapStateToProps, { newExperienceAction })(AddExperience);
