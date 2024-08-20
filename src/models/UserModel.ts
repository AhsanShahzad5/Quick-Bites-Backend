import mongoose, { Schema, model } from 'mongoose';
//const Schema = Schema;

const userSchema = new Schema(
	{

		auth0Id: {
			type: String,
			required: true
		},

		name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		addressLine1: {
			type: String,
		},
		city: {
			type: String
		},
		country: {
			type: String
		}
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);
export default User;