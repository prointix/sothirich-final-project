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
import Product from '../screens/Home/Category';
import DrawerIcon from '../components/DrawerIcon';

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
          } else if (route.name === 'Settings') {
            iconName = focused ? 'list-sharp' : 'list-outline';
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
      <Tab.Screen name="Settings" component={Profile} />
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
        name="All Product"
        component={Home}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="albums"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Camera & Photo"
        component={Product}
        initialParams={{id: 4}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="camera"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Computers"
        component={Product}
        initialParams={{id: 3}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="ios-desktop-sharp"
              iconColor="black"
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Electronics"
        component={Product}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="git-merge-outline"
              iconColor="black"
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Equipment"
        component={Product}
        initialParams={{id: 9}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="md-hammer"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Footwear"
        component={Product}
        initialParams={{id: 10}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="help-sharp"
              iconColor="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Furniture"
        component={Product}
        initialParams={{id: 6}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="help-sharp"
              iconColor="black"
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Home & Garden"
        component={Product}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="nutrition-outline"
              iconColor="black"
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Plants"
        component={Product}
        initialParams={{id: 7}}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="ios-leaf"
              iconColor="black"
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Sports & Outdoor"
        component={Product}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              backgroundColor="#DCDCDC"
              iconName="ios-basketball"
              iconColor="black"
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default Routes;
