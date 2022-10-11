import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import {COLORS} from '../theme/Color';
import Notification from '../screens/Notification';
import DrawerComponents from '../components/DrawerComponents';
import Products from '../screens/Home/Category';
import Product from '../screens/Home/Category/Product';
import DrawerIcon from '../components/DrawerIcon';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Cart from '../screens/Cart';
import Address from '../screens/Profile/Address';
import Payment from '../screens/Profile/Payment';
import Shipping from '../screens/Profile/Shipping';
import Password from '../screens/Profile/Password';
import EditProfile from '../screens/Profile/EditProfile';
import AddAddress from '../screens/Profile/Address/AddAddress';
import EditAddress from '../screens/Profile/Address/EditAddress';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{gestureEnabled: true}}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="Shipping" component={Shipping} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
    </Stack.Navigator>
  );
};

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-person-circle'
              : 'ios-person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.black,
        tabBarLabelStyle: {paddingBottom: 5},
        tabBarStyle: {height: 60, padding: 10},
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeDrawer} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponents {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '80%'},
        drawerLabelStyle: {marginLeft: -20},
      }}>
      <Drawer.Screen
        name="All Products"
        component={Home}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor={COLORS.gray}
              iconName="albums"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Camera & Photo"
        component={Products}
        initialParams={{id: 4}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor={COLORS.gray}
              iconName="camera"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Computers"
        component={Products}
        initialParams={{id: 3}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor={COLORS.gray}
              iconName="ios-desktop-sharp"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Equipment"
        component={Products}
        initialParams={{id: 9}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor={COLORS.gray}
              iconName="md-hammer"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Footwear"
        component={Products}
        initialParams={{id: 10}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor={COLORS.gray}
              iconName="help-sharp"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Furniture"
        component={Products}
        initialParams={{id: 6}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor={COLORS.gray}
              iconName="help-sharp"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Plants"
        component={Products}
        initialParams={{id: 7}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor={COLORS.gray}
              iconName="ios-leaf"
              iconColor="black"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Routes;
