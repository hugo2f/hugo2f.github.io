import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from '../Header';
import endpoints from '../../constants/endpoints';
import FallbackSpinner from '../FallbackSpinner';
import './About.css';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  masonryContainer: {
    columnCount: 4,
    columnGap: '15px',
    marginTop: 20,
  },
  masonryItem: {
    breakInside: 'avoid',
    marginBottom: '10px',
    overflow: 'visible',
  },
  image: {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease-in-out',
  },
  imageHover: {
    transform: 'scale(2)',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  const imageDirectory = 'images/about/';

  const renderImages = (images) => (
    <div style={styles.masonryContainer}>
      {images.map((image) => (
        <div key={image} style={styles.masonryItem}>
          <img
            src={imageDirectory + image}
            alt={image}
            className="image"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <div style={styles.introTextContainer}>{parseIntro(data.about)}</div>
                <div style={styles.introTextContainer}>{parseIntro(data.about2)}</div>
                {data.images && renderImages(data.images)}
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
