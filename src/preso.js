import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Artboard,
  Image,
  makeSymbol,
  Page,
  render,
  Svg,
  Text,
  TextStyles,
  View
} from 'react-sketchapp';

import slides from './slides';

const getSizes = (width) => {
  const u = width / 16;
  const h = u * 10;
  return {
    height: h, /* 16:10 */
    quarter: u / 4,
    unit: u,
    width: width,
  };
};
const sizes = getSizes(2560);

const styles = {
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: (sizes.width + sizes.width % 100) * 1, /* # columns */
  },
  artboard: {
    height: sizes.height,
    marginBottom: 100 - sizes.height % 100,
    marginRight: 100 - sizes.width % 100,
    padding: sizes.unit,
    width: sizes.width,
  },
  headline: {
    marginBottom: sizes.unit,
  },
  text: {
    width: '100%',
  },
  image: {
    borderColor: '#BBCCDD',
    borderWidth: 1,
    height: sizes.height - sizes.unit * 4,
    flex: 1,
    marginLeft: sizes.unit,
    minWidth: sizes.unit * 4,
    shadowColor: '#081624',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .1,
    shadowRadius: 30,
    width: 'auto',
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#081624',
    bottom: 0,
    flexDirection: 'row',
    height: sizes.unit * 2,
    left: 0,
    paddingLeft: sizes.unit,
    paddingRight: sizes.unit,
    position: 'absolute',
    width: sizes.width,
  },
  footerText: {
    flex: 1,
  },
};

const typeStyles = {
  Headline: {
    color: '#081624',
    fontSize: sizes.quarter * 6,
    fontFamily: 'Circular Std',
    fontWeight: 700,
    letterSpacing: -10,
    lineHeight: sizes.quarter * 6,
  },
  Body: {
    color: '#081624',
    fontSize: sizes.quarter * 3,
    fontFamily: 'Circular Std',
    fontWeight: 700,
    letterSpacing: -5,
    lineHeight: sizes.quarter * 3.5,
  },
  Footer: {
    color: '#FFFFFF',
    fontSize: sizes.quarter * 2,
    fontFamily: 'Circular Std',
    fontWeight: 700,
    letterSpacing: -2,
    lineHeight: sizes.quarter * 3,
  }
};

// if background is too dark, use light text color
const getTextColor = (hex) => {
  /* TODO */
};

let sections = [];

// loop to register all sections
slides.forEach(obj => {
  const s = obj.section;
  if (s && sections.indexOf(s) === -1) {
    sections.push(s);
  }
});

const Footer = ({ current }) => (
  <View style={styles.footer}>
    {sections.map((section, i) => <Text key={i} style={Object.assign({}, typeStyles.Footer, styles.footerText, {
      opacity: (section === current) ? 1 : .3,
    })}>{section}</Text>)}
  </View>
);

// the artboard and content for each slide
const Slide = ({ background, headline, image, name, section, text }) => {
  const headlineSlide = headline ? {paddingRight: sizes.unit * 4} : {};
  const imageSlide = image ? {flexDirection: 'row'} : {};
  return (
    <Artboard
      name={name}
      style={Object.assign({}, styles.artboard, headlineSlide, imageSlide, {backgroundColor: '#'+background})}
    >
      {headline && <Text style={Object.assign(typeStyles.Headline, styles.headline)}>{headline}</Text>}
      <Text style={typeStyles.Body}>{text}</Text>
      {image && <Image
        resizeMode="contain"
        source={image}
        style={styles.image}
      />}
      {section && <Footer current={section} />}
    </Artboard>
  )
};

// this is the last stop before we render to Sketch
const Document = () => (
  <Page name="Slides" style={styles.page}>
    {slides.map((obj, i) => {
      const b = obj.background || '#FFFFFF';
      return (
        <Slide
          background={b}
          headline={obj.headline}
          image={obj.image}
          key={i}
          name={'Slide-'+(i+1)}
          section={obj.section}
          text={obj.text}
        />
      );
    })}
  </Page>
);

// send everything to Sketch!
export default (context) => {
  TextStyles.create(
    {
      context: context,
      clearExistingStyles: true,
    },
    typeStyles,
  );

  render(<Document />, context.document.currentPage());
};