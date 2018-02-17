import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

export default class ListBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      isLoading: true,
      shelfs: [
        { title: 'Currently Reading', type: 'currentlyReading'},
        { title: 'Want to Read', type: 'wantToRead'},
        { title: 'Read', type: 'read'}
      ]
    }
  }

  static propTypes ={
    api: PropTypes.object.isRequired,
    toast: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    books: PropTypes.array,
    syncBookShelf: PropTypes.func
  }

  static defaultProps = {
    books: [],
    syncBookShelf: () => {}
  }

  componentDidMount() {
    this.setState({books: this.props.books})
  }

  componentWillReceiveProps(newProps){
    this.setState({books: newProps.books})
  }

  getBooksByShelf(books, shelf) {
    return books.filter(book => book.shelf === shelf)
  }

  moveBook = async (book, shelf) => {
    const {toast , api, syncBookShelf} = this.props
    try {
      await api.BooksAPI.update(book, shelf)
      syncBookShelf(book, book.shelf)
      const books = this.state.books.map(b => b.id === book.id ? { ...b, shelf } : b )
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

  render() {
    return (
      <Fragment>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              { this.state.shelfs.map(({title, type}) => (
                <BookShelf
                  key={title}
                  title={title}
                  books={this.getBooksByShelf(this.state.books, type)}
                  moveBook={this.moveBook}
              />  
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </Fragment>
    )
  }
}
