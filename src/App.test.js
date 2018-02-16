import React from 'react'
import App from './App'

import { shallow, mount, render } from 'enzyme'

describe('<App />', () => {
  const books = []
  const mockAPI = {
    BooksAPI: {
      getAll: jest.fn().mockReturnValue(books)
    }
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<App api={mockAPI} />)
    expect(wrapper).toHaveLength(1)
  })

})
