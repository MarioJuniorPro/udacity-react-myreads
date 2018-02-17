import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import BookCover from './BookCover'
import BookAuthors from './BookAuthors'
import BookShelfChanger from './BookShelfChanger'
import Loader from './Loader'

class BookDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      book: {},
      isLoading: true
    }
  }

  static propTypes = {
    api: PropTypes.object.isRequired,
    toast: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    syncBookShelf: PropTypes.func
  }

  static defaultProps = {
    syncBookShelf: () => {}
  }

  async componentDidMount() {
    const { match: { params: { bookId } }} = this.props
    const { history, toast, api } = this.props
    try {
      const book = await api.BooksAPI.get(bookId)
      this.setState({ book, isLoading: false })
    } catch (error) {
      toast.error('Oops! Something went wrong.', {
        position: toast.POSITION.TOP_CENTER
      })
      history.push('/')
    } 
  }

  moveBook = async book => {
    const {toast , api, syncBookShelf} = this.props
    try {
      await api.BooksAPI.update(book, book.shelf)
      this.setState({ book })
      syncBookShelf(book, book.shelf)
      toast.info('Book moved :)', {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      toast.error('Oops! Something went wrong.', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  _descriptionShortner(description = '') {
    return description
      .split(' ')
      .slice(0, 100)
      .join(' ')
      .concat('...')
  }

  render() {
    const { book } = this.state
    const coverImage = (book.imageLinks && book.imageLinks.smallThumbnail) || ''
    const shorterDescription = this._descriptionShortner(book.description)
    return (
      <div>
        <Loader show={this.state.isLoading} />
        <div className="book-detail-title">
          <Link className="back-link" to="/">
            Close
          </Link>
          <h1>MyReads - Book Detail</h1>
        </div>
        {book &&
          book.id && (
            <div className="book-container">
              <div className="book-aside">
                <div className="book-cover">
                  <BookCover image_uri={coverImage} />
                </div>
                <BookShelfChanger book={book} onMove={this.moveBook} />
                <div className="book-shop">
                  <a className="button" href={book.infoLink} title="Buy now!">
                    Buy
                  </a>
                </div>
              </div>
              <div className="book-main">
                <div className="book-title">
                  <h1>{book.title}</h1>
                </div>
                <div className="book-authors">
                  <h2>
                    <BookAuthors authors={book.authors} />
                  </h2>
                </div>
                <div className="book-identifiers" />
                <div className="book-description">{shorterDescription}</div>
                <div className="book-info">
                  <p>
                    {book.publisher &&
                      `Published at: ${book.publishedDate} by ${
                        book.publisher
                      }`}
                  </p>
                  <p>{`Pages: ${book.pageCount} pages`}</p>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default withRouter(BookDetails)
