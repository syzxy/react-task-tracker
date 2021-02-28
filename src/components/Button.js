import PropTypes from 'prop-types'

const Button = ({ bgColor, text, onClick }) => {
  return (
    <button
      className="btn"
      style={{ background: bgColor }}
      onClick={onClick}
    >
      {text}
    </button>
  )
};

Button.defaultProps = {
  bgColor: 'black',
  text: 'button',
}

Button.defaultProps = {
  bgColor: PropTypes.string,
  text: PropTypes.string,
  clickHandler: PropTypes.func,
}

export default Button;
