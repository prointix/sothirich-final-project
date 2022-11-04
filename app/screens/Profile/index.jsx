import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAuth} from '../../contexts/auth';
import {COLORS} from '../../theme/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation}) => {
  const {signed, logout, user, loading} = useAuth();

  const list = [
    {
      title: 'Address',
      icon: 'location-outline',
      value: 'Address',
    },
    {
      title: 'Change Password',
      icon: 'key-outline',
      value: 'Password',
    },
  ];

  const ListItem = ({items}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(items.value)}>
        <View style={styles.listItem}>
          <Ionicons
            name={items.icon}
            color={'#404040'}
            size={23}
            style={{paddingHorizontal: 10}}
          />
          <Text style={styles.subText}>{items.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {padding: 20}]}>
      <Spinner visible={loading} />
      {signed ? (
        <>
          <Text style={styles.headerTxt}>Profile</Text>
          <View style={styles.profileTab}>
            <View style={{paddingHorizontal: 20}}>
              <Image
                source={{
                  uri: 'https://i.imgur.com/DKiC9TV.png?preset=small',
                }}
                style={styles.img}
              />
            </View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={styles.bigText}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.text}>{user.phoneNumber}</Text>
              <View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditProfile')}>
                  <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.bigText, {paddingVertical: 10}]}>Account</Text>
            <View style={styles.boxShadow}>
              <FlatList
                data={list}
                renderItem={({item}) => <ListItem items={item} />}
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 15,
                  backgroundColor: '#0000',
                  elevation: 2,
                }}
              />
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity style={styles.Button} onPress={logout}>
              <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerTxt: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 23,
  },
  text: {
    color: COLORS.black,
  },
  bigText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  subText: {
    fontSize: 17,
    color: '#404040',
  },
  profileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  editButton: {
    padding: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    borderColor: COLORS.secondary,
    borderWidth: 2,
    marginTop: 15,
    borderRadius: 20,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 150,
    resizeMode: 'contain',
  },
  listItem: {
    borderBottomColor: '#404040',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginBottom: 15,
    flexDirection: 'row',
  },
  Button: {
    padding: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 20,
  },
});

export default Profile;
