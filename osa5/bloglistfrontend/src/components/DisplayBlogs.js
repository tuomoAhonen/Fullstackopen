import Blog from "./Blog";
import PropTypes from 'prop-types';

const DisplayBlogs = ({user, blogs, handleLike, handleDelete}) => {

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  const ownBlogs = [];
  const othersBlogs = [];

  sortedBlogs.forEach(blog => {
    if (blog.createdbyuserid === user.userid) {
      return ownBlogs.push(blog);
    } else {
      return othersBlogs.push(blog);
    }
  });

  return (
    <div style={{/*width: '100%', display: 'flex', flexDirection: 'column'*/}}>
      {/*<div style={{display: 'block', position: 'relative'}}>*/}
      {ownBlogs.length > 0 &&
        <h2 style={{marginBottom: '5px', marginTop: '10px'}}>{user.name}&#39;s blogs</h2>
      }
      {ownBlogs.length > 0 &&
        <div /*className="grid-container"*/ style={{display: 'grid', gridAutoFlow: 'row dense', gridTemplateColumns: 'auto auto auto', columnGap: '5px', rowGap: '5px'/*display: 'grid', gridTemplateColumns: '32.99% 32.99% 32.99%'*/}}>
          {ownBlogs.map(blog =>
            <Blog key={blog.blogid} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>
          )}
        </div>
      }
      {/*</div>*/}
      {/*<div style={{display: 'block', position: 'relative'}}>*/}
      {othersBlogs.length > 0 &&
        <h2 style={{marginBottom: '5px', marginTop: '10px'}}>Blogs from other users</h2>
      }
      {othersBlogs.length > 0 &&
        <div /*className="grid-container"*/ style={{display: 'grid', gridAutoFlow: 'row dense', gridTemplateColumns: 'auto auto auto', columnGap: '5px', rowGap: '5px'/*display: 'grid', gridTemplateColumns: '32.99% 32.99% 32.99%', columnGap: '0.515%', rowGap: '1.3%'*/}}>
          {othersBlogs.map(blog =>
            <Blog key={blog.blogid} blog={blog} handleLike={handleLike} user={user}  />
          )}
        </div>
      }
      {/*</div>*/}
      {/*<div className="grid-container" style={{display: 'grid', gridTemplateColumns: '32.99% 32.99% 32.99%', columnGap: '0.515%', rowGap: '1.3%'}}>
        {sortedBlogs.map(blog =>
          <Blog key={blog.blogid} blog={blog} handleLike={handleLike} user={user}/>
        )}
        </div>*/}
    </div>
  );
};

DisplayBlogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default DisplayBlogs;