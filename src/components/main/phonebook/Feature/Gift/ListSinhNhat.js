import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TabBar1, { Tab1Content } from './ListHistoryNhan';
import TabBar2 from './ListHistoryGui';
import { Tab2Content } from './ListHistoryGui';
const ListSinhNhat = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabBar1
          active={activeTab === 1}
          onPress={() => setActiveTab(1)}
        />
        <TabBar2
          active={activeTab === 2}
          onPress={() => setActiveTab(2)}
        />
      </View>

      {activeTab === 1 && (
        <View style={styles.tabContent}>
          <Tab1Content />
        </View>
      )}
      {activeTab === 2 && (
        <View style={styles.tabContent}>
          <Tab2Content />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#fff',
   
    marginTop: 10,
    borderRadius: 10,
  },
});

export default ListSinhNhat;
