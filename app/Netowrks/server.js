
const BASE_ADDRESS = 'http://3.7.155.186:8092/vpark/api';

//Login - Controller

async function authonticate(username, password) {
  // const data = {
  //   userName: username,
  //   password: password,
  // };

  try {
    const url = BASE_ADDRESS + '/sessions/v1/authenticate';
    let responce = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'userName': username,
        'password': password
      },
      // body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();
    console.log("#### authonticate :" + responce_Values);
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - authonticate : ' + error);
    throw error;
  }
}

//user - Controller

async function createNewUser(MobileNo, firstName, lastName, email, city, password, status, userType) {
  const data = {
    mobileNo: MobileNo,
    firstName: firstName,
    lastName: lastName,
    email: email,
    city: city,
    password: password,
    status: status,
    userType: userType,
  };

  try {
    const url = BASE_ADDRESS + '/users/v1';
    let responce = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log("#### createNewUser :" + JSON.stringify(data));
    console.log("#### createNewUser url :" + JSON.stringify(url));
    let responce_Values = await responce.text();
    console.log("#### createNewUser :" + responce_Values);
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - createNewUser : ' + error);
    throw error;
  }
}

async function findUserById(Token, id) {

  try {
    const url = BASE_ADDRESS + '/users/v1/' + id;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### findUserById url:" + url);
    console.log("#### findUserById :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findUserById : ' + error);
    throw error;
  }
}

async function updateUser(Token, id, MobileNo, firstName, lastName, email, city, password, status, userType) {
  const data = {
    id: id,
    MobileNo: MobileNo,
    firstName: firstName,
    lastName: lastName,
    email: email,
    city: city,
    password: password,
    status: status,
    userType: userType,
  };

  try {
    const url = BASE_ADDRESS + '/users/v1/' + id;
    let responce = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();
    if (responce_active) {
      console.log("#### updateUser :" + responce_Values);
    }
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - updateUser : ' + error);
    throw error;
  }
}

async function findUserProfile(Token, id) {

  try {
    const url = BASE_ADDRESS + '/users/v1/' + id + '/profile';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### findUserProfile data:" + url);
    console.log("#### findUserProfile :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findUserProfile : ' + error);
    throw error;
  }
}

async function updateUserProfile(Token, id, firstName, lastName, email, city) {
  const data = {
    id: id,
    MobileNo: MobileNo,
    firstName: firstName,
    lastName: lastName,
    email: email,
    city: city,
  };

  try {
    const url = BASE_ADDRESS + '/users/v1/' + id + '/profile';
    let responce = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();
    if (responce_active) {
      console.log("#### updateUserProfile :" + responce_Values);
    }
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - updateUserProfile : ' + error);
    throw error;
  }
}

//vehicle - Controller

async function findAllVehicles(Token, user, vehicleNo, vehicleType) {
  try {
    const url = BASE_ADDRESS + '/vehicles/v1?user=' + user + '&vehicleType=' + vehicleType + '&vehicleNo=' + vehicleNo;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### findAllVehicles url:" + url);
    console.log("#### findAllVehicles :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllVehicles : ' + error);
    throw error;
  }
}

async function createNewVehicle(Token, id, vehicleNo, vehicleType) {
  const data = {
    id: id,
    vehicleNo: vehicleNo,
    vehicleType: vehicleType,
    Token: Token
  };
  try {
    const url = BASE_ADDRESS + '/vehicles/v1';
    let responce = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();
    console.log("#### createNewVehicle data :" + JSON.stringify(data));
    console.log("#### createNewVehicle :" + responce_Values);
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - createNewVehicle : ' + error);
    throw error;
  }
}

async function findVehicleById(Token, id) {

  try {
    const url = BASE_ADDRESS + '/vehicles/v1/' + id;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();
    if (responce_active) {
      console.log("#### findVehicleById :" + responce_Values);
    }
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findVehicleById : ' + error);
    throw error;
  }
}

async function updateVehicle(Token, id, vehicleNo, vehicleType) {
  const data = {
    id: id,
    vehicleNo: vehicleNo,
    vehicleType: vehicleType,
  };
  try {
    const url = BASE_ADDRESS + '/vehicles/v1/' + id;
    let responce = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();
    if (responce_active) {
      console.log("#### updateVehicle :" + responce_Values);
    }
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - updateVehicle : ' + error);
    throw error;
  }
}

async function deleteVehicle(Token, id) {

  try {
    const url = BASE_ADDRESS + '/vehicles/v1/' + id;
    let responce = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();
    if (responce_active) {
      console.log("#### deleteVehicle :" + responce_Values);
    }
    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - deleteVehicle : ' + error);
    throw error;
  }
}

//parking-location-controller

// GET
async function findAllLocations(Token, parkRegion) {
  try {
    const url = BASE_ADDRESS + '/parking-locations/v1?' + "parkRegion=" + parkRegion;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}
// POST
async function createNewLocation(Token, id, latitude, longitude, parkAddress, parkName, parkRegion) {

  const data = {
    "id": id,
    "latitude": latitude,
    "longitude": longitude,
    "parkAddress": parkAddress,
    "parkName": parkName,
    "parkRegion": parkRegion,
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### createNewLocation :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - createNewLocation : ' + error);
    throw error;
  }
}

async function findLocationById(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

async function updateLocation(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

async function deleteLocation(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

async function findAllReviews(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

async function updateParkReview(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

async function deleteParkReview(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

async function findAllLocationDetails(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

async function patchParkingDetail(Token, id) {

  const data = {
    "createdDate": "2020-06-07T05:55:04.626Z",
    "id": 0,
    "latitude": "string",
    "longitude": "string",
    "modifiedDate": "2020-06-07T05:55:04.626Z",
    "parkAddress": "string",
    "parkName": "string",
    "parkRegion": "string",
    "parkingDetails": [
      {
        "closeTime": "2020-06-07T05:55:04.626Z",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "hourlyRate": 0,
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "monthlyRate": 0,
        "openTime": "2020-06-07T05:55:04.626Z",
        "status": "ACTIVE",
        "vehicleType": "BIKE"
      }
    ],
    "parkingReviews": [
      {
        "comment": "string",
        "createdDate": "2020-06-07T05:55:04.626Z",
        "id": 0,
        "modifiedDate": "2020-06-07T05:55:04.626Z",
        "rating": 0,
        "userId": 0
      }
    ],
    "status": "ACTIVE"
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1';
    let responce = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### findAllLocations :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - findAllLocations : ' + error);
    throw error;
  }
}

export { authonticate };
export { createNewUser };
export { findUserById };
export { updateUser };
export { findUserProfile };
export { updateUserProfile };
export { findAllVehicles };
export { createNewVehicle };
export { findVehicleById };
export { updateVehicle };
export { deleteVehicle };
export { findAllLocations };
export { createNewLocation };
export { findLocationById };
export { updateLocation };
export { deleteLocation };
export { findAllReviews };
export { updateParkReview };
export { deleteParkReview };
export { findAllLocationDetails };
export { patchParkingDetail };

