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

import data from './data';

const styles = {
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 600 * 5,
  },
  artboard: {
    height: 540,
    marginBottom: 60,
    marginRight: 60,
    width: 540,
  },
  text: {
    left: 60,
    position: 'absolute',
    top: 60,
    width: 420,
  },
  mark: {
    fillColor: '#081624',
    height: 38,
    width: 38,
  },
  markPos: {
    left: 10,
    position: 'absolute',
    top: 10,
  },
  photo: {
    height: '100%',
    width: '100%',
  }
};

const typeStyles = {
  Headline: {
    color: '#081624',
    fontSize: 60,
    fontFamily: 'Platform',
    fontWeight: 700,
    letterSpacing: -2,
    lineHeight: 60,
  },
};

const Mark = makeSymbol(() => (
  <Svg style={styles.mark} viewBox="0 0 38 38">
    <Svg.G fill="#081624">
      <Svg.Path d="M23.1881549,20 L54.8118451,20 C56.5726144,20 58,21.4273856 58,23.1881549 C58,24.0337061 57.6641061,24.8446258 57.0662111,25.4425208 L25.4425208,57.0662111 C24.1974689,58.311263 22.1788409,58.311263 20.9337889,57.0662111 C20.3358939,56.468316 20,55.6573964 20,54.8118451 L20,23.1881549 C20,21.4273856 21.4273856,20 23.1881549,20 Z"></Svg.Path>
    </Svg.G>
  </Svg>
), 'Mark');

const Document = () => (
  <Page name="Page One" style={styles.page}>
    {data.map((a, i) => (
      <Artboard key={i} name={'Square-'+(i+1)} style={styles.artboard}>
        <Image
          resizeMode="contain"
          source={'https://picsum.photos/540?id='+i}
          style={styles.photo}
        />
        <Mark style={styles.markPos}/>
        <View name="Item" style={styles.text}>
          <Text style={typeStyles.Headline}>{a.main}</Text>
        </View>
      </Artboard>
    ))}
  </Page>
);

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