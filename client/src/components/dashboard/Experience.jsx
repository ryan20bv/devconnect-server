import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperienceAction } from "../../redux/actions/profileAction";

const Experience = ({ experience, deleteExperienceAction }) => {
	const deleteHandler = (id) => {
		deleteExperienceAction(id);
	};

	const mapExperience = experience.map((eachExperience) => {
		const { _id, company, title, from, current, to } = eachExperience;
		return (
			<tr key={_id}>
				<td>{company}</td>
				<td className='hide-sm'>{title}</td>
				<td className='hide-sm'>
					<Moment format='D MMM YYYY'>{from}</Moment>
					{"  "} - {"  "}
					{current ? "current" : <Moment format='D MMM YYYY'>{to}</Moment>}
				</td>
				<td>
					<button className='btn btn-danger' onClick={() => deleteHandler(_id)}>
						Delete
					</button>
				</td>
			</tr>
		);
	});

	return (
		<div className='profile-exp bg-white p-2'>
			<h2 className='my-2'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
					</tr>
				</thead>
				<tbody>{mapExperience}</tbody>
			</table>
		</div>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperienceAction: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperienceAction })(Experience);
