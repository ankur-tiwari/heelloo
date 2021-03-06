import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { leftStyles, rightStyles } from './styles'
import moment from "moment";

export default function Message({ side, data, targetUser }) {
  const isLeftSide = side === 'left'

  showAvatar = (profileImg) => {
    if (profileImg) {
      return <FastImage source={{ uri: profileImg }} style={styles_.profile} />;
    } else {
      return <Image source={require('../../../images/no-avatar.png')} style={styles_.profile} />;
    }
  }

  let dateToFormat = (new Date(data.created_at._seconds * 1000));
  // let ago = moment(dateToFormat).fromNow();
  let ago;
  if (moment(dateToFormat).isSame(new Date(), 'day'))
    ago = moment(dateToFormat).format('LT');
  else if (moment(dateToFormat).isSame(new Date(), 'month'))
    ago = moment(dateToFormat).fromNow() + ', ' + moment(dateToFormat).format('LT');
  else
    ago = moment(dateToFormat).format('lll');
  if (isLeftSide)
    return (
      <View style={leftStyles.container}>
        {/* <View style={styles_.triangleLeft}></View> */}
        <View style={leftStyles.textContainer}>
          <Text style={styles_.nameleft}>{targetUser.firstName}</Text>
          <Text style={leftStyles.leftText}>
            {data.message}
          </Text>
        </View>
        <Text style={leftStyles.time}>{ago}</Text>
      </View>
    )
  else {
    return (
      <View style={rightStyles.container}>
        <Text style={rightStyles.time}>{ago}</Text>

        <View style={rightStyles.textContainer}>
          <Text style={styles_.name}>Me</Text>
          <Text style={rightStyles.rightText}>
            {data.message}
          </Text>
        </View>
        <View style={styles_.triangleRight}></View>
      </View>
    )
  }
}
const styles_ = StyleSheet.create({
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 20,
    borderTopWidth: 30,
    borderRightColor: 'transparent',
    borderTopColor: '#7DB6F3',
  },
  triangleLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderTopWidth: 30,
    borderLeftColor: 'transparent',
    borderTopColor: '#D3D3D3',
    // borderWidth: 1,
  },
  name: {
    fontSize: 12,
    color: '#B8B8B8',
    color: 'white',
    marginBottom: 10
  },
  nameleft: {
    fontSize: 12,
    color: '#B8B8B8',
    marginBottom: 10
  }
});
