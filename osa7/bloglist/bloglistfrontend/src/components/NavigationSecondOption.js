import {useEffect, useState} from 'react';
import {Routes, Route, Link, useMatch} from 'react-router-dom';
import BlogAddNew from './BlogAddNew';
import DisplayBlogs from './DisplayBlogs';
import DisplayBlogsFromOtherUsers from './DisplayBlogsFromOtherUsers';
import {useBlogsValue, useBlogsDispatch} from '../reducers/BlogsReducer';
import {getUsers} from '../services/UserService';
import {useQuery} from '@tanstack/react-query';
import {useUsersValue, useUsersDispatch} from '../reducers/UsersReducer';
import Users from './Users';
import User from './User';
import BlogView from './BlogView';
import {
	Container,
	ContentArea,
	InputButtonRightFloat,
	LoginArea,
	LoginInputs,
	Header,
	NavigationMobileDisplayButton,
	NavigationBarMobile,
	NavigationBar,
	NavigationButton,
	ParagraphStripFloat,
} from '../styles/StyledComponents';
import bars from '../images/bars-solid.svg';

const Navigation = ({userCredentials, blogs, refreshBlogs, setUser, handleLogout, handleMessage, handleErrors}) => {
	const [isDisplayed, setIsDisplayed] = useState('none');

	const blogsDispatch = useBlogsDispatch();

	useEffect(() => {
		window.matchMedia('(max-width: 600px)').addEventListener('change', (e) => {
			//console.log(e);
			if (!e.matches) {
				setIsDisplayed('none');
			}
		});
	}, []);

	useEffect(() => {
		//blogsDispatch({payload: blogs, type: 'setBlogs'});
		blogsDispatch(blogs, 'setBlogs');
	}, []);

	const blogsValue = useBlogsValue();

	const sortedBlogs = blogsValue.sort((a, b) => b.likes - a.likes);
	const ownBlogs = [];
	const othersBlogs = [];

	//console.log(sortedBlogs);

	sortedBlogs.forEach((blog) => {
		if (blog.createdbyuserid === userCredentials.userid) {
			return ownBlogs.push(blog);
		} else {
			return othersBlogs.push(blog);
		}
	});

	const {isError, error, data} = useQuery({queryKey: ['users'], queryFn: getUsers});
	const usersDispatch = useUsersDispatch();

	(async () => {
		try {
			usersDispatch({payload: await data, type: 'setUsers'});
		} catch {
			if (isError) {
				handleErrors(error);
			}
		}
	})();

	const usersValue = useUsersValue();

	const match = useMatch('/users/:id');
	const matchBlogs = match && othersBlogs && othersBlogs.length > 0 && othersBlogs.filter((blog) => blog.createdbyuserid === Number(match.params.id));
	const matchUser = match && usersValue && usersValue.length > 0 && usersValue.find((user) => user.userid === Number(match.params.id));
	const otherUsers = usersValue && usersValue.length > 0 && usersValue.filter((user) => user.userid !== userCredentials.userid);

	const matchBlogId = useMatch('/blogs/:id');
	const matchBlog = matchBlogId && blogsValue && blogsValue.length > 0 && blogsValue.find((blog) => blog.blogid === Number(matchBlogId.params.id));

	const openMobileNavigation = () => {
		if (isDisplayed === 'none') {
			setIsDisplayed('inline-block');
		} else {
			setIsDisplayed('none');
		}
	};

	const linkStyle = {
		fontSize: '20px',
		textDecoration: 'none',
		letterSpacing: '2px',
		color: '#000000',
	};

	return (
		<Container>
			<Header /*style={{minHeight: '20px', width: 'auto', padding: '5px', backgroundColor: '#5F9EA0', borderRadius: '5px'}}*/>
				<NavigationMobileDisplayButton src={bars} onClick={() => openMobileNavigation()} />
				<NavigationBarMobile style={{display: isDisplayed}}>
					<NavigationButton>
						<Link to='/' style={linkStyle} onClick={() => openMobileNavigation()}>
							Home
						</Link>
					</NavigationButton>
					<NavigationButton>
						<Link to='/addnewblog' style={linkStyle} onClick={() => openMobileNavigation()}>
							New Blog
						</Link>
					</NavigationButton>
					<NavigationButton>
						<Link to='/blogs' style={linkStyle} onClick={() => openMobileNavigation()}>
							Blogs
						</Link>
					</NavigationButton>
					<NavigationButton>
						<Link to='/users' style={linkStyle} onClick={() => openMobileNavigation()}>
							Users
						</Link>
					</NavigationButton>
				</NavigationBarMobile>

				<NavigationBar>
					<NavigationButton>
						<Link to='/' style={linkStyle}>
							Home
						</Link>
					</NavigationButton>
					<NavigationButton>
						<Link to='/addnewblog' style={linkStyle}>
							New Blog
						</Link>
					</NavigationButton>
					<NavigationButton>
						<Link to='/blogs' style={linkStyle}>
							Blogs
						</Link>
					</NavigationButton>
					<NavigationButton>
						<Link to='/users' style={linkStyle}>
							Users
						</Link>
					</NavigationButton>
				</NavigationBar>

				<LoginArea
				/*
					style={{
						display: 'block',
						height: '100%',
						float: 'right',
					}}
				*/
				>
					<LoginInputs /*style={{marginTop: '6px'}}*/>
						<InputButtonRightFloat
							id='logoutButton'
							type='button'
							onClick={() => handleLogout()}
							value='Logout' /*style={{float: 'right', marginLeft: '5px'}}*/
						/>
						<ParagraphStripFloat /*style={{float: 'right', margin: 0, padding: 0}}*/>
							Logged as <b style={{fontSize: '20px'}}>{userCredentials.username}</b>
						</ParagraphStripFloat>
					</LoginInputs>
				</LoginArea>
			</Header>
			<ContentArea /*style={{marginTop: '10px'}}*/>
				<Routes>
					<Route
						path='/'
						element={
							<DisplayBlogs
								user={userCredentials}
								blogs={ownBlogs}
								refreshBlogs={refreshBlogs}
								handleErrors={handleErrors}
								handleMessage={handleMessage}
								setUser={setUser}
							/>
						}
					/>
					<Route
						path='/addnewblog'
						element={
							<BlogAddNew
								user={userCredentials}
								refreshBlogs={refreshBlogs}
								handleLogout={handleLogout}
								handleErrors={handleErrors}
								handleMessage={handleMessage}
							/>
						}
					/>
					<Route
						path='/blogs'
						element={
							<DisplayBlogsFromOtherUsers
								user={userCredentials}
								blogs={othersBlogs}
								refreshBlogs={refreshBlogs}
								handleErrors={handleErrors}
								handleMessage={handleMessage}
								setUser={setUser}
							/>
						}
					/>
					<Route path='/users' element={<Users users={otherUsers} othersBlogs={othersBlogs} handleErrors={handleErrors} />} />
					<Route path='/users/:id' element={<User user={matchUser} blogs={matchBlogs} />} />
					<Route
						path='/blogs/:id'
						element={
							<BlogView
								blog={matchBlog}
								user={userCredentials}
								refreshBlogs={refreshBlogs}
								handleErrors={handleErrors}
								handleMessage={handleMessage}
							/>
						}
					/>
				</Routes>
			</ContentArea>
		</Container>
	);
};

export default Navigation;
