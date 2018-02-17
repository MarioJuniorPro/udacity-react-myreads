import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import URLSearchParams from 'url-search-params'
import _ from 'lodash'
import { DebounceInput } from 'react-debounce-input'

import BookGrid from './BookGrid'
import Loader from './Loader'

class SearchBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      books: [],
      isLoading: false
    }
  }

  static propTypes = {
    api: PropTypes.object.isRequired,
    toast: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    findBookShelf: PropTypes.func,
    syncBookShelf: PropTypes.func
  }

  static defaultProps = {
    findBookShelf: () => 'none',
    syncBookShelf: () => {}
  }

  componentDidMount() {
    this.search && this.search.focus()
    const query = this.getQueryParam()
    query && this.setSearchTerm(query)
  }

  setSearchTerm = async term => {
    this.setState({ query: term })
    this.updateQueryParam(term)
    this.searchBooks(term)
  }

  searchBooks = async term => {
    if(!term){
      this.setState({ books: [] })
      return
    }

    const {toast , api, findBookShelf} = this.props
    this.setState({ isLoading: true })
    try {
      const results = await api.BooksAPI.search(term)
      const books = _.isArray(results) ? results : []
      const booksWithShelf = books.map(b => ({...b, shelf: findBookShelf(b.id)}))
      this.setState({ books: booksWithShelf })
    } catch (error) {
      toast.error('Oops! Something went wrong.', {
        position: toast.POSITION.TOP_CENTER
      })
      this.setState({ books: [] })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  updateQueryParam(term) {
    const { history } = this.props
    const queryParam = new URLSearchParams(history.location.search)
    queryParam.set('q', term)
    history.replace({ ...history.location, search: queryParam.toString() })
  }

  moveBook = async (book, shelf) => {
    const {toast , api, syncBookShelf} = this.props
    try {
      await api.BooksAPI.update(book, shelf)
      const books = this.state.books.map(
        b => (b.id === book.id ? { ...b, shelf } : b)
      )
      syncBookShelf(book, shelf)
      this.setState({ books })
      toast.info('Book moved :)', {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error('Oops! Something went wrong.', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  getQueryParam() {
    const { history } = this.props
    const queryParam = new URLSearchParams(history.location.search)
    return queryParam.get('q')
  }

  render() {
    const books = this.state.books
    const hasBooks = books && books.length > 0
    return (
      <Fragment>
        <Loader show={this.state.isLoading} />
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <DebounceInput
                placeholder="Search by title or author"
                value={this.state.query}
                minLength={2}
                debounceTimeout={400}
                onChange={e => {
                  this.setSearchTerm(e.target.value)
                }}
                inputRef={ref => {
                  this.search = ref
                }}
              />
            </div>
          </div>
          <div
            className={`search-books-results ${
              !hasBooks ? 'search-books-results-empty' : ''
            }`}
          >
            <BookGrid books={books} moveBook={this.moveBook} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(SearchBooks)
