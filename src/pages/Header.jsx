import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function Header(props) {
  const { title } = props;
  return (
    <div
      style={{ marginTop: '20px' }}
      className="header"
    >
      {title}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
