import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserFilter from '../userFilter/userFilter';
import './edit.scss';

const noop = () => {};

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleFilterReset = this.handleFilterReset.bind(this);
    this.state = {
      body: '',
      id: '',
      title: '',
      userId: '',
    };
  }

  handleFilterReset() {
    this.setState({ userId: null });
  }

  handleCancel() {
    this.setState({}, function() {
      this.props.handleCancel();
    });
  }

  handleUserChange(value) {
    this.setState({ userId: +value });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSave(this.state);
    this.setState({});
  }

  render() {
    const { body, id, title, userId } = this.state;
    const { users } = this.props;
    const canSave = body && title && userId;

    return (
      <div className="edit">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>Post Title</label>
            <input
              name="title"
              onChange={this.handleChange}
              placeholder="Enter Title"
              type="text"
              value={title}
            />
          </fieldset>
          <fieldset>
            <label>Post Author</label>
            <UserFilter
              handleFilterChange={this.handleUserChange}
              resetFilter={this.handleFilterReset}
              users={users}
              value={userId}
            />
          </fieldset>
          <fieldset>
            <label>Post Body</label>
            <textarea
              cols="60"
              name="body"
              onChange={this.handleChange}
              placeholder="Post Body"
              value={body}
            />
          </fieldset>
          <button type="submit" disabled={!canSave}>Save</button>
          <button onClick={this.handleCancel} type="text">Cancel</button>
        </form>
      </div>
    );
  }
}

Edit.displayName = 'Edit';

Edit.propTypes = {
  body: PropTypes.object,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
  userId: PropTypes.string,
  userName: PropTypes.string,
  users: PropTypes.object,
};

Edit.defaultProps = {
  users: {},
  handleCancel: noop,
  handleSave: noop,
};

export default Edit;
