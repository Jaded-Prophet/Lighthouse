var React = require('react-native');

var {
  View,
  WebView,
  StyleSheet
} = React;

class Map extends React.Component {

  render() {
    return (
      <View style={styles.container} >
        <WebView url='http://www.google.com/maps' />
      </View>
    )
  }
};

// Web.propTypes = {
//   // we need to have the url in order to use this Web component
//   link: React.PropTypes.string.isRequired,
// };


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

module.exports = Map;