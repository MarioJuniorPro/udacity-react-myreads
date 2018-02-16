import React from 'react'
import BookShelfChanger from './BookShelfChanger'

import { shallow, mount, render } from 'enzyme'

describe('<BookShelfChanger />', () => {
  const book = {
    id: 'nggnmAEACAAJ',
    title: 'Learn React',
    subtitle: 'The essencial guide',
    authors: ['Tolken', 'Dan'],
    shelf: 'read'
  }

  const mockBookMove = jest.fn()

  it('renders without crashing', () => {
    const wrapper = shallow(<BookShelfChanger book={book} onMove={mockBookMove} />)
    expect(wrapper).toHaveLength(1)
  })

  it('set state on mount', () => {
    const wrapper = mount(<BookShelfChanger book={book} onMove={mockBookMove} />)
    expect(wrapper.state().shelf).toBe(book.shelf)
  })

  it('render a select', () => {
    const wrapper = mount(<BookShelfChanger book={book} onMove={mockBookMove} />)
    expect(wrapper).toHaveLength(1)
    expect(wrapper.find('option')).toHaveLength(5);
    expect(wrapper.containsAllMatchingElements([
      <option value="none" disabled>
        Move to...
      </option>,
      <option value="currentlyReading">Currently Reading</option>,
      <option value="wantToRead">Want to Read</option>,
      <option value="read">Read</option>,
      <option value="none">None</option>
    ])).toBeTruthy()
  })

  it('call onMove on select change', async (done) => {
    jest.useFakeTimers()
    const wrapper = mount(<BookShelfChanger book={book} onMove={mockBookMove} />)
    wrapper.find('select').simulate('change', {target :{ value : 'wantToRead'}});
    
    // console.log(wrapper.debug())
    setTimeout(() => {
      expect(mockBookMove.mock.calls).toHaveLength(1)
      expect(mockBookMove.mock.calls[0][0]).toMatchObject({...book, shelf: 'wantToRead'})
      expect(mockBookMove.mock.calls[0][1]).toBe('wantToRead')
      done()
    }, 500)
    jest.runOnlyPendingTimers()
  }, 4000)

});