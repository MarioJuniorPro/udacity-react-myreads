import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  async componentDidMount() {
    const books = await this.props.api.BooksAPI.getAll()
    this.setState({ books })
    console.log(books)
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route path="/" exact render={() => <ListBooks books={this.state.books} />} />
          <Route path={'/search'} exact render={() => <SearchBooks />} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
