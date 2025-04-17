import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../app/slices/userSlice';
import type { RootState, AppDispatch } from '../app/store';
import { logout } from '../app/slices/authSlice';
import { useNavigation } from '@react-navigation/native'; 

const menuItems = [
  { id: 1, title: 'Orders', icon: 'cart-outline' },
  { id: 2, title: 'My Details', icon: 'person-outline' },
  { id: 3, title: 'Delivery Address', icon: 'location-outline' },
  { id: 4, title: 'Payment Methods', icon: 'card-outline' },
  { id: 5, title: 'Promo Code', icon: 'pricetag-outline' },
  { id: 6, title: 'Notifications', icon: 'notifications-outline' },
  { id: 7, title: 'Help', icon: 'help-circle-outline' },
  { id: 8, title: 'About', icon: 'information-circle-outline' },
];

export const AccountScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<any>(); 

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],  
    });
  };

  const renderMenuItem = ({ item }: any) => (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuLeft}>
        <Icon name={item.icon} size={20} color="#000" style={{ marginRight: 8 }} />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#000" />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading user info...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {user && (
          <>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil-outline" size={20} color="#000" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
        style={{ marginTop: 16 }}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={20} color="#32CD32" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
    marginTop: 4,
  },
  editIcon: {
    marginLeft: 8,
    padding: 4,
  },

  menuItemContainer: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'center',
    width: '60%',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#32CD32',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
