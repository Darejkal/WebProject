import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { db } from "../model";
import { customEncrypt, customEncryptCompare, generateUUID } from "../../utils";
import { StringExpressionOperator } from "mongoose";

const User = db.User;

export const userController = {
	authenticate,
	getNext,
	getByUUID,
	getByUUIDs,
	getCurrent,
	getByEmail,
	create,
	update,
	delete: _delete,
};

async function authenticate({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const user = await User.findOne({ email: email });
	if (!(user && (await customEncryptCompare(password, user.password)))) {
		throw "Email or password is incorrect";
	}
	const token = jwt.sign(
		{
			sub: user.uuid,
			position: user.position,
		},
		process.env.JWT_SECRET!,
		{ expiresIn: "7d" }
	);
	return {
		user: {
			name: user.name,
			email: user.email,
			createdat: user.createdat,
			uuid: user.uuid,
			position: user.position,
			// id:user.id
		},
		token,
	};
}

async function getNext({limit,next,query}:{limit: number, next?: string,query?: string}) {
	let searchprops={}
	if(next){
		searchprops={...searchprops,
			_id: { $lt: next } 
		}
	}
	if(query){
		searchprops={...searchprops,
			$text:{
				$search:query,
				$diacriticSensitive:false
			},
			
		}
	} 
	console.log(searchprops)
	let results;
	if(query){
		let nextVal=Number(next);
		if(!nextVal){
			nextVal=0;
		}
		results=await User.find(searchprops)
		.skip(nextVal)
		.limit(limit);
		return {
			results,
			next: results.length == 0 ? undefined : `${nextVal+results.length}`,
		};
	} else{
		results=await User.find(searchprops)
		.sort({
			_id: -1,
		})
		.limit(limit);
		return {
			results,
			next: results.length == 0 ? undefined : results[results.length - 1]._id,
		};
	}

}

async function getByUUID(uuid: string) {
	let user = await User.findOne({ uuid });
	if (!user) {
		throw "user not found";
	}
	return user;
}
async function getByEmail(email: string) {
	let user = await User.findOne({ email });
	if (!user) {
		throw "user not found";
	}
	return user;
}
async function getByUUIDs(uuids: string[]) {
	let users = await User.find({ uuid:{"$in": uuids} });
	if (!users) {
		throw "users not found";
	}
	return users;
}

async function getCurrent() {
	const uuid = headers().get("userId");
	if (!uuid) {
		throw "user not found";
	}
	return await getByUUID(uuid);
}

async function create(
{email,password,name,position}:{
	email: string,
	password: string,
	name: StringExpressionOperator,
	position: "user" | "admin"
}
) {
	if (await User.findOne({ email: email })) {
		throw 'Email "' + email + '" is already taken';
	}

	const user = new User({
		email,
		password,
		position,
		name,
	});
	user.uuid = await generateUUID();
	user.createdat = new Date();

	// hash password
	if (password) {
		user.password = await  customEncrypt(password);
	}

	// save user
	await user.save();
}

async function update(uuid: string, params: any) {
	const user = await getByUUID(uuid);

	// validate
	if (!user) throw "User not found";
	if (
		user.email !== params.email &&
		(await User.findOne({ email: params.email }))
	) {
		throw 'Email "' + params.email + '" is already taken';
	}

	// hash password if it was entered
	if (params.password) {
		params.hash = await  customEncrypt(params.password);
	}

	// copy params properties to user
	Object.assign(user, params);

	await user.save();
}

async function _delete(uuid: string) {
	await User.findOneAndDelete({ uuid });
}
