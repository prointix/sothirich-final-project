import React, {useEffect, useState} from 'react';
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
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Cart from '../screens/Cart';
import Address from '../screens/Profile/Address';
import Password from '../screens/Profile/Password';
import EditProfile from '../screens/Profile/EditProfile';
import AddAddress from '../screens/Profile/Address/AddAddress';
import EditAddress from '../screens/Profile/Address/EditAddress';
import Payment from '../screens/Payment';
import {useGetAllCategories} from '../services/auth';

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
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="Payment" component={Payment} />
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
  const {data} = useGetAllCategories();
  const [categoryList, setCategoryList] = useState({});

  useEffect(() => {
    data && setCategoryList(data.collections);
  }, [data]);

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponents {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '80%'},
        drawerItemStyle: {borderBottomWidth: 0.3},
      }}>
      <Drawer.Screen name="All Products" component={Home} />
      {categoryList.items?.map(item => (
        <Drawer.Screen
          name={item.name}
          component={Products}
          initialParams={{id: item.id}}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default Routes;
