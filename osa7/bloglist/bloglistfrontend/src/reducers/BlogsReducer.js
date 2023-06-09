import {useReducer, createContext, useContext} from 'react';

//voisikohan reducerin laittaa kommunikoimaan react-queryn/servicen kanssa silleen, että ei tarvisi kuin käyttää kuin reduceria?
//voisiko react-queryn tuoda tänne ja käyttää sitä reducerin kautta ja sen kautta taas serviceä?
//tällöin pitäisi myös siirtää errorhandler omaan tiedostoon, jotta sitä voisi importtaa kaikkialle, missä sitä tarvitaan

//yksi vaihtoehto olisi hakea tähän initializeriin kaikkiblogit suoraan servicestä/react-querystä
//onkohan tämä jopa normaali käytäntö sen sijaan, että ne jossain vaiheessa ohjelmaa haettaisiin tänne?
const initializer = [];

const blogsReducer = (state, action) => {
	switch (action.type) {
		case 'addBlog':
			//const help = [...state, action.payload];
			//console.log('addblog: ', help);
			//return [...state, action.payload];
			return state.concat(action.payload);
		case 'deleteBlog':
			//console.log(state);
			//const blogs = state.filter(blog => blog.blogid !== action.payload);
			return state.filter((blog) => blog.blogid !== action.payload);
		case 'likeBlog':
			let likedBlog = state.find((blog) => blog.blogid === action.payload.blogid);
			likedBlog = {
				...likedBlog,
				likes: likedBlog.likes + 1,
				whohasliked: likedBlog.whohasliked !== null ? [...likedBlog.whohasliked, action.payload.userid] : [action.payload.userid],
			};
			const unTouchedBlogs = state.filter((blog) => blog.blogid !== action.payload.blogid);
			unTouchedBlogs.push(likedBlog);
			return unTouchedBlogs;
		case 'editBlog':
			let blogEdited = state.find((blog) => blog.blogid === action.payload.blogid);
			blogEdited = {...blogEdited, ...action.payload};
			//console.log(blogEdited);
			const unEditedBlogs = state.filter((blog) => blog.blogid !== action.payload.blogid);
			//console.log(unEditedBlogs);
			unEditedBlogs.push(blogEdited);
			//console.log(unEditedBlogs);
			return unEditedBlogs;
		case 'setBlogs':
			return action.payload;
		default:
			return state;
	}
};

const BlogsContext = createContext();

export const BlogsContextProvider = (props) => {
	const [blogsValue, blogsDispatch] = useReducer(blogsReducer, initializer);
	return <BlogsContext.Provider value={[blogsValue, blogsDispatch]}>{props.children}</BlogsContext.Provider>;
};

export const useBlogsValue = () => {
	const blogsAndDispatch = useContext(BlogsContext);
	return blogsAndDispatch[0];
};

export const useBlogsDispatch = () => {
	const blogsAndDispatch = useContext(BlogsContext);
	const dispatch = blogsAndDispatch[1];
	return (payload, type) =>
		dispatch({
			payload: payload,
			type: type,
		});
};

/*
export const useBlogsDispatch = () => {
	const blogsAndDispatch = useContext(BlogsContext);
	return blogsAndDispatch[1];
};
*/

export default BlogsContext;

/*
const initializer = [];

const blogsReducer = (state, action) => {
	switch (action.type) {
		case 'addBlog':
			//const help = [...state, action.payload];
			//console.log('addblog: ', help);
			//return [...state, action.payload];
			return state.concat(action.payload);
		case 'deleteBlog':
			//console.log(state);
			//const blogs = state.filter(blog => blog.blogid !== action.payload);
			return state.filter((blog) => blog.blogid !== action.payload && blog);
		case 'likeBlog':
			//console.log(state);
			//console.log(action.payload.userid);
			let likedBlog = state.find((blog) => blog.blogid === action.payload.blogid);
			likedBlog = {
				...likedBlog,
				likes: likedBlog.likes + 1,
				whohasliked: likedBlog.whohasliked !== null ? [...likedBlog.whohasliked, action.payload.userid] : [action.payload.userid],
			};
			const unTouchedBlogs = state.filter((blog) => blog.blogid !== action.payload.blogid && blog);
			unTouchedBlogs.push(likedBlog);
			return unTouchedBlogs;
    case 'editBlog':
			let blogEdited = state.find(
				(blog) => blog.blogid === action.payload.blogid
			);
      blogEdited = {...blogEdited, ...action.payload};
      const unEditedBlogs = state.map((blog) => blog.blogid !== action.payload);
      unEditedBlogs.push(blogEdited);
			return unEditedBlogs;
		case 'setBlogs':
			return action.payload;
		default:
			return state;
	}
};
*/
