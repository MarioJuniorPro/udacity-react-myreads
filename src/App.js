import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import Loader from './components/Loader'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      isLoading: true
    }
  }

  static propTypes = exact({
    api: PropTypes.shape({
      BooksAPI: PropTypes.object.isRequired
    }).isRequired
  })

  async componentDidMount() {
    try {
      const books = await this.props.api.BooksAPI.getAll()
      this.setState({ books, isLoading: false })
      console.log('books', books)
    } catch (error) {
      throw new Error(error)
      console.error(error)
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route
              path="/"
              exact
              render={() =>  this.state.isLoading ? <Loader /> : <ListBooks books={this.state.books} />}
            />
            <Route path={'/search'} exact render={() => <SearchBooks />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
