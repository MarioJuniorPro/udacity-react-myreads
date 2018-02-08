import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/** 
 This course is not designed to teach Test Driven Development. 
 Feel free to use this file to test your application, but it 
 is not required.
**/
describe('<App />', () => {

  const mockAPI = {
    BooksAPI: {
      getAll: jest.fn()
    }
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App api={mockAPI}/>, div)
  })
  
})

