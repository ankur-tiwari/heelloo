import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Icon as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';

import { Contact, Anniversary, Conversation, Bravo } from '../tabs';
import { NewContact, EditContact, Profile } from '../contact';
import { NewStructure, EditStructure, Structure } from '../structure';
import Chat from '../conversations/chat';
import { Login, ForgetPassword } from '../unauth';
import { AddBravo } from '../bravo';

import { routerStyles, iphoneX } from '../../styles';


const width = Dimensions.get('window').width;

const TabIcon = ({ focused, title, Iconname }) => {
  return (
    <View
      style={[
        routerStyles.tabItemStyle,
        {
          backgroundColor: focused ? '#2a8aed' : '#FFF',
          width: width * 0.25,
        },
      ]}>
      <Icon
        name={Iconname}
        size={40}
        style={[
          routerStyles.tabIconStyle,
          { tintColor: focused ? '#FFF' : '#000' },
          { color: focused ? '#FFF' : '#000' },

        ]}
      />
      <Text
        style={[routerStyles.tabTitle, { color: focused ? '#FFF' : '#C9C9C9' }]}>
        {title}
      </Text>
    </View>
  );
};

class MainRouter extends Component {
  constructor(props) {
    super(props);
  }

  backBtn() {
    return (
      <TouchableOpacity
        onPress={() => Actions.pop()}
        style={routerStyles.headBtn}>
        <Icon
          name="md-arrow-back"
          size={25}
          color="#FFF"
          style={routerStyles.iconLeft}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Router
        navigationBarStyle={routerStyles.navbarStyle}
        titleStyle={routerStyles.titleStyle}
      >
        <Scene key="root" hideNavBar>

          <Scene
            key="tabbar"
            tabBarPosition="bottom"
            swipeEnabled={false}
            tabs={true}
            showLabel={false}
            wrap={false}
            tabBarStyle={routerStyles.tabBarStyle}>
            <Scene
              key="tabContact"
              Iconname="ios-contacts"
              icon={TabIcon}
              {...this.props}
              component={Contact}
              initial={true} />
            <Scene
              key="tabAnniversary"
              Iconname={'ios-happy'}
              icon={TabIcon}
              component={Anniversary}
              {...this.props} />

            <Scene
              key="tabBravo"
              Iconname={'ios-medal'}
              icon={TabIcon}
              component={Bravo}
              {...this.props} />
            <Scene
              key="tabChat"
              type={ActionConst.RESET}
              Iconname={'ios-chatboxes'}
              icon={TabIcon}
              component={Conversation}
              {...this.props} />
          </Scene>

          <Scene
            key="newContact"
            component={NewContact}
            hideNavBar
          />
          <Scene
            key="login"
            component={Login}
            hideNavBar
          />
          <Scene
            key="editContact"
            component={EditContact}
            renderBackButton={this.backBtn}
            hideNavBar
          />

          <Scene
            key="profile"
            component={Profile}
          // renderBackButton={this.backBtn}
          // hideNavBar
          />

          <Scene
            key="newStructure"
            component={NewStructure}
            hideNavBar
          />

          <Scene
            key="editStructure"
            component={EditStructure}
            hideNavBar
          />

          <Scene
            key="structure"
            component={Structure}
            hideNavBar
          />
          <Scene
            key="chat"
            component={Chat}
            hideNavBar
          />
          <Scene
            key="forgetPassword"
            component={ForgetPassword}
            hideNavBar
          />
          <Scene
            key="bravo"
            component={AddBravo}
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}

export default MainRouter;
