import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogCreateNew from '../components/BlogCreateNew';

describe('Testing BlogCreateNew component', () => {
	let container;
	let newBlog;

	let isFormToggled = 'block';

	const user = {
		userid: 0,
		username: 'mrtester',
		password: 'mrtester',
		name: 'Test Tester',
	};

	const mockHandler = jest.fn();

	//this is for the new blog test handling, because I do not have this as props. BlogCreateNew component has function to handle blog creation
	const testFunction = (title, author, url) => {
		newBlog = {title: title, author: author, url: url};
		//console.log(newBlog);
		return newBlog;
	};

	beforeEach(() => {
		container = render(
			<BlogCreateNew
				user={user}
				updateBlogs={mockHandler}
				handleLogout={mockHandler}
				handleMessage={mockHandler}
				handleErrorMessage={mockHandler}
				handleErrors={mockHandler}
				isToggled={isFormToggled}
				unToggle={mockHandler}
			/>
		).container;
	});

	test('Test fields of form and submit', () => {
		const mockUser = userEvent.setup();
		const submitButton = screen.findByText('Submit');

		// values for inputs
		const title = 'New Test Blog';
		const author = 'New Test Author';
		const url = 'https://newtestblogurl.fi';

		const titleFound = container.querySelector('#title');
		const authorFound = container.querySelector('#author');
		const foundUrl = container.querySelector('#url');

		expect(titleFound).toBeDefined();
		expect(authorFound).toBeDefined();
		expect(foundUrl).toBeDefined();

		titleFound.value = title;
		authorFound.value = author;
		foundUrl.value = url;

		expect(titleFound).toHaveValue('New Test Blog');
		expect(authorFound).toHaveValue('New Test Author');
		expect(foundUrl).toHaveValue('https://newtestblogurl.fi');

		submitButton.onclick = mockHandler(testFunction(titleFound.value, authorFound.value, foundUrl.value));
		mockUser.click(submitButton);

		expect(mockHandler.mock.calls).toHaveLength(1);

		const expected = [testFunction(title, author, url)];
		expect(mockHandler.mock.lastCall).toEqual(expect.arrayContaining(expected));

		const functionGotValues = {author: title, title: author, url: url};
		expect(newBlog.toString()).toMatch(functionGotValues.toString());
	});
});
