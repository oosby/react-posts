import React, { Component } from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

class UserFilter extends Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange({ target: { value }}) {
    if (value === "*") {
      this.props.resetFilter();
    } else {
      this.props.handleFilterChange(value);
    }
  }

  render() {
    const { onFilterChange, users, value, showDefault } = this.props;
    return (
      <select onChange={this.onFilterChange} value={value}>
        {showDefault && <option value="*">Filter by user</option>}
        {Object.keys(users).map((u, i) => {
          const user = users[u];
          return <option key={`user-${i}`} value={u}>{user.name}</option>;
        })}
      </select>
    );
  }
}

UserFilter.displayName = 'UserFilter';

UserFilter.propTypes = {
  handleFilterChange: PropTypes.func,
  resetFilter: PropTypes.func,
  users: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showDefault: PropTypes.bool,
};

UserFilter.defaultProps = {
  handleFilterChange: noop,
  resetFilter: noop,
  users: {},
  showDefault: true,
};

export default UserFilter;
