import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEducationAction } from "../../../redux/actions/profileAction";

const Education = ({
	education,
	deleteEducationAction,
	authId,
	userProfileId,
}) => {
	const deleteHandler = (id) => {
		deleteEducationAction(id);
	};

	const mapEducation = education.map((eachEducation) => {
		const { current, degree, from, school, to, _id } = eachEducation;
		return (
			<tr key={_id}>
				<td>{school}</td>
				<td className='hide-sm'>{degree}</td>
				<td className='hide-sm'>
					<Moment format='D MMM YYYY'>{from}</Moment>
					{"  "} - {"  "}
					{current ? "current" : <Moment format='D MMM YYYY'>{to}</Moment>}
				</td>
				{authId === userProfileId && (
					<td>
						<button
							className='btn btn-danger'
							onClick={() => deleteHandler(_id)}
						>
							Delete
						</button>
					</td>
				)}
			</tr>
		);
	});

	return (
		// <!-- Education -->
		<div className='profile-edu bg-white p-2'>
			<h2 className='my-2'>Education Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th className='hide-sm'>Degree</th>
						<th className='hide-sm'>Years</th>
					</tr>
				</thead>
				<tbody>{mapEducation}</tbody>
			</table>
		</div>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducationAction: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducationAction })(Education);
