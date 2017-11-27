import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './post.scss';

const noop = () => {};

class Post extends Component {
    constructor(props) {
    super(props);
  }

  render() {
    const { userName, post } = this.props;
    const { body, id, title, userId } = post;
    return (
      <div className="box">
        <div className="box-inner">
          <div className="copy">
            <h2 className="header">{title}</h2>
            <h3 className="user-name">{userName}</h3>
            <p>{body}</p>
          </div>
        </div>
      </div>
    );
  }
}

Post.displayName = 'Post';

Post.propTypes = {
  post: PropTypes.object,
  handlePostEdit: PropTypes.func,
  handlePostDelete: PropTypes.func,
  userName: PropTypes.string,

};

Post.defaultProps = {
  post: {},
  handlePostEdit: noop,
  handlePostDelete: noop,
};

export default Post;
