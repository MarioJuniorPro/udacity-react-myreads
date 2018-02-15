import React, { Component } from 'react'
import PropTypes from 'prop-types'

import bookShape from './book.shape'

export default class BookShelfChanger extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       shelf: ''
    }
  }
  
  static propTypes = {
    book: bookShape.isRequired,
    onMove: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.setState({shelf: this.props.book.shelf})
  }

  componentWillReceiveProps(nextProps){
    this.setState({shelf: nextProps.book.shelf})
  }

  handleChange = (e) => {
    e.preventDefault()
    const shelf = e.target.value
    this.props.onMove(this.props.book, shelf)
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleChange} value={this.state.shelf}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}
