import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	userId: String,
	type: String,
	title: String,
	user: {},
	body: String,
	pictures: [String]
});

PostSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id;
		delete returnedObj._id;
		delete returnedObj.__v;
	}
});

const Post = model('Post', PostSchema);

export default Post;
