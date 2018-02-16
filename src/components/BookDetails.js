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
      bookId: undefined,
      book: {},
      isLoading: true
    }
  }

  static propTypes = {
    moveBook: PropTypes.func.isRequired
  }

  async componentDidMount() {
    const { match: { params: { bookId } } } = this.props
    const book = await this.props.api.BooksAPI.get(bookId)
    this.setState({ bookId, book, isLoading: false })
  }

  _descriptionShortner(description = ''){
    return description
      .split(' ')
      .slice(0, 100)
      .join(' ')
      .concat('...')
  }

  render() {
    if(this.state.isLoading){
      return <Loader />
    }
    
    const { book } = this.state
    const coverImage = (book.imageLinks && book.imageLinks.smallThumbnail) || ''
    const shorterDescription = this._descriptionShortner(book.description)
    return (
      <div>
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
                <BookShelfChanger book={book} onMove={this.props.moveBook} />
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
                  <p>{book.publisher && `Published at: ${book.publishedDate} by ${book.publisher}`}</p>
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
