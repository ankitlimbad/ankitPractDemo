import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const ANDROID_LOCATION_PERMISSION =
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
export const IOS_LOCATION_PERMISSION = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

export const ANDROID_CALENDAR_PERMISSION = PERMISSIONS.ANDROID.WRITE_CALENDAR;
export const IOS_CALENDAR_PERMISSION = PERMISSIONS.IOS.CALENDARS;

export const checkPermission = async (permission) => {
  try {
    return await check(permission);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const requestPermission = async (permission) => {
  try {
    return await request(permission);
  } catch (err) {
    throw new Error(err.message);
  }
};