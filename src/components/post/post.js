import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './post.scss';

const noop = () => {};

class Post extends Component {
    constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box"></div>
    );
  }
}

Post.displayName = 'Post';

Post.propTypes = {
};

Post.defaultProps = {
};

export default Post;
