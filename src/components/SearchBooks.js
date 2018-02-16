import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import URLSearchParams from 'url-search-params'

import { DebounceInput } from 'react-debounce-input'
import BookGrid from './BookGrid'

class SearchBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
    }
  }
  
  // static contextTypes = {
  //   router: PropTypes.object
  // }

  static propTypes = {
    updateBook: PropTypes.func,
    searchBooks: PropTypes.func.isRequired,
    query: PropTypes.string
  }

  componentDidMount(){
    const { query, history } = this.props
    this.search && this.search.focus()
    const queryParam = new URLSearchParams(history.location.search)
    queryParam.get('q')
    this.setSearchTerm(queryParam.get('q') || query)
  }

  setSearchTerm = async term => {
    this.setState({query: term})
    this.updateQueryParam(term)
    this.props.searchBooks(term)
  }

  updateQueryParam(term){
    const { history } = this.props
    const queryParam = new URLSearchParams(history.location.search)
    queryParam.set('q', term)
    history.replace({...history.location, search: queryParam.toString()})

  }

  moveBook = async (book, shelf) => {
    //mutate a single property and preserve current info
    try {
      const bookToUpdate = _.head(this.props.books.filter(b => b.id === book.id))
      await this.props.updateBook({ ...bookToUpdate, shelf })
    } catch (error) {
      //TODO: Notify user of failed action
    }
  }

  render() {
    const books = this.props.books
    const hasBooks = books && books.length > 0
    return (
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
              debounceTimeout={300}
              onChange={e => {
                this.setSearchTerm(e.target.value)
              }}
              inputRef={ref => {
                this.search = ref;
              }}
            />
          </div>
        </div>
        <div className={`search-books-results ${!hasBooks ? 'search-books-results-empty':''}`}>
          <BookGrid books={books} moveBook={this.moveBook} />
        </div>
      </div>
    )
  }
}

export default withRouter(SearchBooks)
