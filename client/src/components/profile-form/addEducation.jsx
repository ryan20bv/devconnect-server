import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { newEducationAction } from "../../redux/actions/profileAction";
import PropTypes from "prop-types";
import Alert from "../layout/alert";

const AddEducation = ({ isAuthenticated, newEducationAction }) => {
	const [newEducation, setNewEducation] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		current: "",
		to: "",
		description: "",
	});

	const changeHandler = (e) => {
		setNewEducation({
			...newEducation,
			[e.target.name]: e.target.value,
			current: e.target.checked,
		});
	};
	const navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		const msg = await newEducationAction(newEducation);
		if (msg === "success") {
			return navigate("/dashboard");
		}
	};

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	return (
		<section className='container' onSubmit={(e) => submitHandler(e)}>
			<h1 className='large text-primary'>Add Your Education</h1>
			<p className='lead'>
				<i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
				that you have attended
			</p>
			<small>* = required field</small>
			<Alert />
			<form className='form'>
				<div className='form-group'>
					<small className='form-text'>* School</small>
					<input
						type='text'
						placeholder='* School or Bootcamp'
						name='school'
						onChange={(e) => changeHandler(e)}
						value={newEducation.school}
						// required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>* Degree</small>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						onChange={(e) => changeHandler(e)}
						value={newEducation.degree}
						// required
					/>
				</div>
				<div className='form-group'>
					<small className='form-text'>* Field of study</small>
					<input
						type='text'
						placeholder='Field Of Study'
						name='fieldofstudy'
						onChange={(e) => changeHandler(e)}
						value={newEducation.fieldofstudy}
					/>
				</div>
				<div className='form-group'>
					<h4>* From Date</h4>
					<input
						type='date'
						name='from'
						onChange={(e) => changeHandler(e)}
						value={newEducation.from}
						// required
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							onChange={(e) => changeHandler(e)}
							value={newEducation.current}
						/>{" "}
						Current School or Bootcamp
					</p>
				</div>
				{!newEducation.current && (
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							onChange={(e) => changeHandler(e)}
							value={newEducation.to}
						/>
					</div>
				)}
				<div className='form-group'>
					<small className='form-text'>Description</small>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Program Description'
						onChange={(e) => changeHandler(e)}
						value={newEducation.description}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='dashboard'>
					Go Back
				</Link>
			</form>
		</section>
	);
};

AddEducation.propTypes = {
	newEducationAction: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authReducer.isAuthenticated,
	};
};

export default connect(mapStateToProps, { newEducationAction })(AddEducation);
