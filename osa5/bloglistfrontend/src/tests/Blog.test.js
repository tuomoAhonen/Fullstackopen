import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('Testing Blog component', () => {
  let container;

  const blog = {
    blogid: 0,
    title: 'Blog testing title',
    author: 'Blog testing author',
    url: 'https://blogtestingurl.com',
    likes: 0,
    whohasliked: null,
    createdbyuserid: 0,
    createdbyuser: {
      userid: 0,
      username: 'mrtester',
      name: 'Test Tester'
    }
  };

  const user = {
    userid: 0,
    username: 'mrtester',
    password: 'mrtester',
    name: 'Test Tester'
  };

  /*
  const handleLike = () => {
    console.log('Just test handleLike-function. Nothing happens');
  };

  const handleDelete = () => {
    console.log('Just test handleDelete-function. Nothing happens');
  };
  */

  const mockHandler = jest.fn();
  
  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler} user={user} />
    ).container;
  });
  
  test('Blog is rendered', () => {
    const blogarea = container.querySelector('.Blog-area');
    expect(blogarea).toBeDefined();
  });

  test('Title & author rendered', () => {
    const titleFound = screen.getByText('Blog testing title');
    const authorFound = screen.getByText('Blog testing author');

    expect(titleFound).toBeDefined();
    expect(authorFound).toBeDefined();
  });

  test(`Click view button and check for blog's other fields. After, hide the full view`, async () => {
    const mockUser = userEvent.setup();

    const viewButton = screen.getByText('View');
    viewButton.onclick = mockHandler;
    await mockUser.click(viewButton);

    expect(mockHandler.mock.calls).toHaveLength(1);

    const urlFound = screen.getByText('https://blogtestingurl.com');
    const likesFound = screen.getByText('0', {exact: false});
    const userFound = screen.getByText('Added by Test Tester', {exact: false});

    const hideButton = screen.getByText('Hide');
    hideButton.onclick = mockHandler;
    await mockUser.click(hideButton);

    expect(urlFound).toBeDefined();
    expect(likesFound).toBeDefined();
    expect(userFound).toBeDefined();
    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test ('Testing likes button', async () => {
    const mockUser = userEvent.setup();

    const viewButton = screen.getByText('View');
    await mockUser.click(viewButton);

    const likesButton = screen.getByText('Like +1');
    await mockUser.click(likesButton);
    await mockUser.click(likesButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

});