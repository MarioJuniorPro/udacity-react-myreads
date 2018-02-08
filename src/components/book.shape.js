import PropTypes from 'prop-types'

const bookShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
})

export default bookShape
