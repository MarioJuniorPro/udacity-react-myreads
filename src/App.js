import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import BookDetails from './components/BookDetails'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  static propTypes = exact({
    api: PropTypes.shape({
      BooksAPI: PropTypes.object.isRequired
    }).isRequired
  })

  render() {
    return (
      <Router>
        <div className="app">
          <ToastContainer autoClose={3000} />
          <Switch>
            <Route
              path="/"
              exact
              render={() =>
                <ListBooks
                  api={this.props.api} toast={toast}
                />
              }
            />
            <Route
              path={'/search'}
              exact
              render={() => (
                <SearchBooks api={this.props.api} toast={toast}
                />
              )}
            />
            <Route
              path={'/book/:bookId'}
              exact
              render={() => (
                <BookDetails api={this.props.api} toast={toast}/>
              )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
