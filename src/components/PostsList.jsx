import classes from './PostsList.module.css';
import Post from './Post';
import { useState, useEffect } from 'react';

function PostsList() {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/posts');
      const resData = await response.json();
      setPosts(resData.posts);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {!isLoading && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
  
      {!isLoading && posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>No posts available.</h2>
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Loading posts...</h2>
        </div>
      )}
    </>
  );
}

export default PostsList;