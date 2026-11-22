import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';
function NewPost({ onCancel, onAddPost}) {
  const [enteredAuthor, setEnteredAuthor] = useState('');
  const [enteredBody, setEnteredBody] = useState('');

  function textChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  function nameChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    const postData = {
      author: enteredAuthor,
      body: enteredBody
    };
    onAddPost(postData);
    onCancel();
  }

  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} value={enteredBody} onChange={nameChangeHandler} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required value={enteredAuthor} onChange={textChangeHandler} />
        </p>
        <p className={classes.actions}>
          <Link to=".." className={classes.button} type="button">Cancel</Link>
          <button type="submit">Submit</button>
        </p>
      </form>

    </Modal>
  );
}

export default NewPost;