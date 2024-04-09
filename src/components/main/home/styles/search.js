const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  inputSearch: {
    width: '90%',
    height: 30,
    borderRadius: 20,
    padding: 0,
    paddingLeft: 20,
    fontSize: 14,
    backgroundColor: '#ebebeb',
  },
  text_GanDay: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  text_SeenAll: {
    fontSize: 14,
    fontWeight: '500',
    color: '#278a86',
  },
  tabtop: {
    width: '100%',
    height: '100%',
  },
  listContent: {
    width: '100%',
    height: 300,
    position: 'absolute',
    top: 50,
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 0,
    marginTop: 0,
    zIndex: 999,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingBottom: 10,
    paddingTop: 10,
  },
  textContent: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  textFooter: {
    fontSize: 16,
    fontWeight: '500',
    color: '#278a86',
    textAlign: 'center',
    marginTop: 10,
  },
  showListHistorySearch: {
    width: '90%',
    position: 'absolute',
    top: 50,
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 0,
    marginTop: 0,
    zIndex: 999,
  },
  showHistory_Text: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
