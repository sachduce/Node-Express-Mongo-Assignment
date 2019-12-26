import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validEmail from '../helpers/validate/email';


const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		required : true,
		trim: true,
		validate: validEmail ,
		unique : true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: String,
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next){
	this.password = this.encryptPassword(this.password);
	next();
})

UserSchema.methods = {
	encryptPassword: function(plainTextPassWord) {
		if (!plainTextPassWord) { return '' }
		else {
			var salt = bcrypt.genSaltSync(10);
			return bcrypt.hashSync(plainTextPassWord, salt);
		}
	},
	authenticate: function(plainTextPword) {
		return bcrypt.compareSync(plainTextPword, this.password);
	},
	toJson: function(){
		let userObj = this.toObject()
		delete userObj.password;
		return userObj;
	}
}



module.exports = mongoose.model('user', UserSchema);