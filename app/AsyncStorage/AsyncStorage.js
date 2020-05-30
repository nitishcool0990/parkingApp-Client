import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(name, values) {
  try {
    await AsyncStorage.setItem(name, values)
  } catch (e) {
    // saving error
  }
}

export async function getData(name, method) {
  try {
    const value = await AsyncStorage.getItem(name)
    if (value !== null) {
      // value previously stored    
      //   console.log(value);
      method(value);
    } else {
      console.log(null);
      method(null);
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export async function removeValue(key, then) {
  await AsyncStorage.removeItem(key).then(then).catch((error) => {
    alert(error);
  });
  console.log('Done.')
}

export async function clearAll() {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    // clear error
  }
  console.log('Done.')
}
