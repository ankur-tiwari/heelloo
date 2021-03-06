import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner,
  Footer,
} from '../../common';
import Icon from 'react-native-vector-icons/Ionicons';

import images from '../../images';
import auth from '@react-native-firebase/auth';
import styles from './styles';

let fields = [
  {
    placeholder: 'E-mail-Address',
    name: 'email',
    password: false,
    error: 'Fill email',
  },
  {
    placeholder: 'Password',
    name: 'password',
    password: true,
    error: 'Fill Password',
  },
];

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      loading: false,
    };
  }

  isValid({ name, error }) {
    if (this.state[name].length === 0) {
      this.setState({ error });
      return false;
    }
    return true;
  }

  forgotPassword = () => {
    this.setState({ error: '', loading: true });
    const { email } = this.state;
    auth().sendPasswordResetEmail(email)
      .then(user =>
        this.setState({ error: 'Please check your email...', loading: false })
      ).catch(err => {
        console.log(JSON.stringify(err));
        this.setState({ error: "Couldn't reset email...", loading: false })
      });
  }

  authFailed() {
    this.setState({
      loading: false,
      error: 'Authentication Failed',
    });
  }

  renderButton() {
    if (this.state.loading) return <Spinner size="small" />;
    return <Button onPress={this.forgotPassword}>Forget Password</Button>;
  }

  renderLogo() {
    return (
      <View style={styles.logo}>
        <Image source={images.nmma} style={styles.logoStyle} />
      </View>
    );
  }

  renderField({ placeholder, name, password }) {
    return (
      <CardSection>
        <Input
          placeholder={placeholder}
          value={this.state[name]}
          autoCapitalize={'none'}
          password={password}
          onChangeText={value => this.setState({ [name]: value })}
        />
      </CardSection>
    );
  }
  header() {
    const { viewStyle, titleNavbar } = styles;
    return (
      <View style={viewStyle}>
        <TouchableOpacity
          style={{ padding: 4 }}
          onPress={() => this.props.change('login')}>
          <Icon
            name="md-arrow-back"
            size={25}
            color="#FFF"
            style={{ marginLeft: 15, alignSelf: 'center' }}
          />
        </TouchableOpacity>
        <Text style={titleNavbar}>FORGET PASSWORD</Text>
        <View style={{ width: 25, height: 25 }} />
      </View>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* {this.header()} */}

        <KeyboardAvoidingView
          behavior={'padding'}
          style={{ flex: 1, justifyContent: 'center' }}>
          <Card>
            {this.renderField({
              placeholder: 'Email-Address',
              name: 'email',
              password: false,
            })}
            <Text style={styles.errorText}>{this.state.error}</Text>
            <View style={styles.btn}>{this.renderButton()}</View>
          </Card>
        </KeyboardAvoidingView>
        <Footer />
      </ScrollView>
    );
  }
}

export default ForgetPassword;
