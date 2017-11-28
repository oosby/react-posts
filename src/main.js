import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import async from './utils/async';
import Post from './components/post/post';
import Edit from './components/edit/edit';
import UserFilter from './components/userFilter/userFilter';
import Modal from './components/modal/modal';
import './main.scss';

const API_URL_BASE = 'http://localhost:3005/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePostAdd = this.handlePostAdd.bind(this);
    this.handlePostCancel = this.handlePostCancel.bind(this);
    this.handlePostUpdates = this.handlePostUpdates.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      posts: [],
      users: {},
      filteredPosts: [],
      modalVisible: false,
    };
  }

  componentWillMount() {
    // fetch data
    this.getPosts();
    this.getUsers();
  }

  getFilteredPosts(posts = this.state.posts, userFilter = this.state.userFilter) {
    let result = [...posts];
    if (userFilter) {
      result = posts.filter(p => +p.userId === +userFilter);
    }

    return result;
  }

  getPosts() {
    async.get(`${API_URL_BASE}/posts`, (err, resp) => {
      if( !err ) {
        this.setState({ posts: resp, filteredPosts: resp });
      }
    });
  }

  getUsers() {
    async.get(`${API_URL_BASE}/users`, (err, resp) => {
      if( !err ) {
        const users = {};
        resp.forEach(u => users[u.id] = u);
        this.setState({ users });
      }
    });
  }

  handlePostAdd() {
    this.setState({ modalType: 'post' }, function() {
      this.toggleModal(true);
    });
  }

  handlePostCancel() {
    this.setState({ modalType: null }, function() {
      this.toggleModal(false);
    });
  }

  handleFilterChange(userId) {
    const filteredPosts = this.getFilteredPosts(this.state.posts, userId);
    this.setState({ filteredPosts, userFilter: userId });
  }

  handlePostUpdates(post) {
    async.post(`${API_URL_BASE}/posts`, { post }, (err, resp) => {
      const newPosts = [...this.state.posts];
      newPosts.push(resp);
      const filteredPosts = this.getFilteredPosts(newPosts);
      this.setState({ posts: newPosts, filteredPosts }, function() {
        this.toggleModal(false);
      });
    });
  }

  resetFilter() {
    const filteredPosts = [...this.state.posts];
    this.setState({ filteredPosts, userFilter: null });
  }

  toggleModal(isVisible) {
    const modalVisible = (isVisible !== undefined) ? isVisible : !this.state.modalVisible;
    this.setState({ modalVisible });
  }

  render() {
    const { filteredPosts, users, modalVisible, modalType } = this.state;
    const handleModalClose = modalType === 'user' ?
      this.handleUserCancel : this.handlePostCancel;
    return (
      <div className="container">
        <header>
          <h1>Posts</h1>
          {!modalVisible && <button onClick={this.handlePostAdd}>Add New Post</button>}          
          <UserFilter
            handleFilterChange={this.handleFilterChange}
            resetFilter={this.resetFilter}
            users={users}
          />
        </header>
        {(!!filteredPosts.length && !!Object.keys(users).length) &&
          <main className="posts"> 
            {filteredPosts.map( (post, i) => {
              return (<Post
                key={`post-${i}`}
                post={post}
                userName={users[post.userId].name}
              />);
            })}
          </main>
        }
        <Modal isVisible={modalVisible} handleModalClose={handleModalClose}>
          {modalType === 'post' &&
            <Edit 
              handleCancel={this.handlePostCancel}
              handleSave={this.handlePostUpdates}
              users={users}
            />
          }
        </Modal>
      </div>
    );
  }
}

App.displayName = 'App';

App.propTypes = {};

App.defaultProps = {};


ReactDOM.render(<App />, document.getElementById('app-root'));


