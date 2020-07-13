
const BASE_ADDRESS = 'http://3.7.155.186:8092/vpark/api';


//SignUp 

async function Signup(mobileNo) {

  try {
    const url = BASE_ADDRESS + '/users/v1/userMobileReg/' + mobileNo;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    let responce_Values = await responce.text();

    console.log("#### Signup url:" + url);
    console.log("#### Signup :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - Signup : ' + error);
    throw error;
  }
}

//Verifiy OTP
async function VerifyOTP(mobileNo, otp) {

  try {
    const url = BASE_ADDRESS + '/users/v1/verifyOTP/' + mobileNo + "/" + otp;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    let responce_Values = await responce.text();

    console.log("#### Signup url:" + url);
    console.log("#### Signup :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - Signup : ' + error);
    throw error;
  }
}

//Create Profile
async function CreateProfile(mobileNo, password, email, firstName, lastName, userType) {

  const data = {
    mobileNo: mobileNo,
    password: password,
    userProfile: {
      email: email,
      firstName: firstName,
      lastName: lastName
    },
    userType: userType
  }

  try {
    const url = BASE_ADDRESS + '/users/v1';
    let responce = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### CreateProfile url:" + url);
    console.log("#### CreateProfile :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - CreateProfile : ' + error);
    throw error;
  }
}

//Login
async function Login(userName, password) {

  const data = {
    userName: userName,
    password: password
  }

  try {
    const url = BASE_ADDRESS + '/sessions/v1/authenticate';
    let responce = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### Login url:" + url);
    console.log("#### Login :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - Login : ' + error);
    throw error;
  }
}

//Forget Password
async function ForgetPassword(mobileNo, password, resetpasssword) {
  try {
    const url = BASE_ADDRESS + '/users/v1/resetpassword/' + password + '/' + resetpasssword + '/' + mobileNo;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    let responce_Values = await responce.text();

    console.log("#### ForgetPassword url:" + url);
    console.log("#### ForgetPassword :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - ForgetPassword : ' + error);
    throw error;
  }
}

//View Profile
async function ViewProfile(Token) {

  try {
    const url = BASE_ADDRESS + '/users/v1/profile';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### Signup url:" + url);
    console.log("#### Signup :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - Signup : ' + error);
    throw error;
  }
}

//Update Profile
async function UpdateProfile(Token, firstName, lastName, email) {
  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  }

  try {
    const url = BASE_ADDRESS + '/users/v1/updateprofile';
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

    console.log("#### UpdateProfile url:" + url);
    console.log("#### UpdateProfile data:" + JSON.stringify(data));
    console.log("#### UpdateProfile :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - UpdateProfile : ' + error);
    throw error;
  }
}

//GetVehicleTypeList
async function getVehicleTypeList(Token) {

  try {
    const url = BASE_ADDRESS + '/vehicles/v1/type';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      // body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### getVehicleTypeList url:" + url);
    console.log("#### getVehicleTypeList :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - getVehicleTypeList : ' + error);
    throw error;
  }
}

//Create New Vehicle
async function createNewVehicle_New(Token, vehicleNo, vehicleTypeId, isDefault) {

  const data = {
    vehicleNo: vehicleNo,
    vehicleTypeId: vehicleTypeId,
    isDefault: (isDefault == true) ? 'TRUE' : 'FALSE'
  }

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

    console.log("#### createNewVehicle_New url:" + url);
    console.log("#### createNewVehicle_New data:" + JSON.stringify(data));
    console.log("#### createNewVehicle_New :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - createNewVehicle_New : ' + error);
    throw error;
  }
}

//Update Vehicle
async function updateVehicle(Token, id, vehicleNo, vehicleTypeId, vehicleType, isDefault) {

  const data = {
    id: id,
    vehicleNo: vehicleNo,
    vehicleTypeId: vehicleTypeId,
    vehicleType: vehicleType,
    isDefault: (isDefault == true) ? 'TRUE' : 'FALSE'
  }

  try {
    const url = BASE_ADDRESS + '/vehicles/v1/update';
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

    console.log("#### updateVehicle url:" + url);
    console.log("#### updateVehicle date:" + JSON.stringify(data));
    console.log("#### updateVehicle :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - updateVehicle : ' + error);
    throw error;
  }
}

//Get Vehicle Data
async function getVehicleDetails(Token) {

  try {
    const url = BASE_ADDRESS + '/vehicles/v1';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### updateVehicle url:" + url);
    console.log("#### updateVehicle :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - updateVehicle : ' + error);
    throw error;
  }
}

//Delete Vehicle 
async function deleteVehicle_new(Token, id) {

  try {
    const url = BASE_ADDRESS + '/vehicles/v1/' + id + '/delete';
    let responce = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### deleteVehicle url:" + url);
    console.log("#### deleteVehicle data:" + id + " Token" + Token);
    console.log("#### deleteVehicle :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - deleteVehicle : ' + error);
    throw error;
  }
}

//Search Park Location
async function searchParkLocation(Token, lattitude, longitude, vehicleTypeId) {

  const data = {
    latitude: lattitude,
    longitude: longitude,
    vehicleTypeId: vehicleTypeId,
    token: Token
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1/findLocByCoordinates';
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

    console.log("#### searchParkLocation url:" + url);
    console.log("#### searchParkLocation data:" + JSON.stringify(data));
    console.log("#### searchParkLocation :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - searchParkLocation : ' + error);
    throw error;
  }
}

async function searchParkLocationForm(Token, lattitude, longitude, vehicleTypeId) {

  const url = BASE_ADDRESS + '/parking-locations/v1/findLocByCoordinates';

  // let formData = new FormData();
  // formData.append("latitude",6.850209);
  // formData.append("longitude",79.907306);
  // formData.append("vehicleTypeId",1);
  // let fetchOptions = {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'multipart/form-data',
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': "Bearer " + Token
  //   },
  //   body: formData
  // };

  //     console.log("#### searchParkLocation url:" + url);
  //   console.log("#### searchParkLocation data:" + JSON.stringify(formData));


  // fetch(url, fetchOptions)
  //   .then((response) => {
  //     console.log("#### searchParkLocation responce:" + JSON.stringify(response));
  //   })
  //   .then((responseText) => {
  //     console.warn("#### searchParkLocation responseText:"+ JSON.stringify(responseText));
  //   })
  //   .catch((err) => {
  //     console.warn(err);
  //   });


  const formData = new FormData()
  formData.append('latitude', 28.4917759999);
  formData.append('longitude', 79.907306);
  formData.append('vehicleTypeId', 1);

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      'Authorization': "Bearer " + Token
    },
    body: formData
  })
    .then((response) => {
      alert(JSON.stringify(response.json())
      )
    });
}

//Show parking details
async function showParkingDetails(Token, parkingId, vehicleId) {

  try {
    const url = BASE_ADDRESS + '/booking/v1/parkingInfo/' + parkingId + "/" + vehicleId;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### searchParkLocation url:" + url);
    console.log("#### searchParkLocation :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - searchParkLocation : ' + error);
    throw error;
  }
}

//Booking
async function Booking(Token, BookingTime, totalHrs, bookingFees) {

  const data = {
    BookingTime: BookingTime,
    totalHrs: totalHrs,
    bookingFees: bookingFees
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1/findLocByCoordinates';
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

    console.log("#### searchParkLocation url:" + url);
    console.log("#### searchParkLocation :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - searchParkLocation : ' + error);
    throw error;
  }
}



//Add Parking Location in System API
async function AddParkingLocation(Token, images,) {

  const data = {
    images: images,
    parkingLoc: {
      parkName: 'DDA Park 2',
      parkAddress: 'south Delhi',
      latitude: '67.492775999999998',
      longitude: '89.67608642578126',
      parkRegion: 'New Delhi',
      openTime: '10:00 AM',
      closeTime: '11:00 PM',
      description: 'Description Text',
      parkingTypeId: 2,
      parkingDetailsDtos: [
        {
          "vehicleTypeId": 3,
          "hourlyRate": 15,
          "monthlyRate": 200,
          "capacity": 20
        },
        {
          "vehicleTypeId": 4,
          "hourlyRate": 35,
          "monthlyRate": 500,
          "capacity": 45
        }]
    },
  }

  try {
    const url = BASE_ADDRESS + '/agent/v1/create';
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

    console.log("#### AddParkingLocation url:" + url);
    console.log("#### AddParkingLocation :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - AddParkingLocation : ' + error);
    throw error;
  }
}

//Get All Parkings Location of Agent API




// - Agent APIS - //

//Get All Parkings Location of Agent 

async function getAllParkingsLocationofAgent(Token) {

  try {
    const url = BASE_ADDRESS + '/agent/v1';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      // body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### getAllParkingsLocationofAgent url:" + url);
    console.log("#### getAllParkingsLocationofAgent :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - getAllParkingsLocationofAgent : ' + error);
    throw error;
  }
}

//Add Parking Location in System

// async function addparkingLocationInSystem(Token, image, parkdata) {

//   const formData = new FormData();

//   //formData.append({ images }, image); //text data in key value pair form
//   formData.append('parkingLoc',
//     JSON.stringify({
//       "parkName": "qqqq",
//       "parkAddress": "dsfsfs",
//       "latitude": "33.4927755554533",
//       "longitude": "67.676085434566",
//       "parkRegion": "qqqq",
//       "openTime": "11:30",
//       "closeTime": "23:00",
//       "description": "Description Text",
//       "parkingTypeId": 2,
//       "parkingDetailsDtos": [
//         {
//           "vehicleTypeId": 3,
//           "capacity": 20,
//           "monthlyRate": 200,
//           "nightCharges": 30,
//           "chargesType": "PERHOUR",
//           "parkingChargesDtos": [
//             {
//               "hours": 1,
//               "charges": 20
//             }
//           ]
//         },
//         {
//           "vehicleTypeId": 4,
//           "capacity": 45,
//           "monthlyRate": 500,
//           "nightCharges": 40,
//           "chargesType": "SLOTS",
//           "parkingChargesDtos": [
//             {
//               "hours": 1,
//               "charges": 50
//             }
//           ]
//         }
//       ]
//     })
//   ); //text data in key value pair form

//   const serviceResponse = fetch(
//     BASE_ADDRESS + '/agent/v1/create',
//     {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'multipart/form-data',
//         'Authorization': "Bearer " + Token
//       },
//       body: JSON.stringify(formData),
//     })
//     .then((serviceResponse) => { return serviceResponse.json() })
//     .catch((error) => console.warn(" addparkingLocationInSystem fetch error:", error))
//     .then((serviceResponse) => {
//       console.log(JSON.stringify(serviceResponse));
//     });

// }

async function addparkingLocationInSystem(Token, image, parkdata) {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + Token);
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("Accept", "application/json");

  var formdata = new FormData();
  formdata.append("parkingLoc", JSON.stringify(parkdata));

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://3.7.155.186:8092/vpark/api/agent/v1/create", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

// Update Parking Location 
async function updateParkingLocation(Token, image, parkdata) {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + Token);
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("Accept", "application/json");

  var formdata = new FormData();
  formdata.append("parkingLoc", JSON.stringify(parkdata));

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch("http://3.7.155.186:8092/vpark/api/agent/v1/update", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//Get All Parkings by Parking Location Id
async function getParkingDetailsbyParkingLocationId(Token,location_id) {

  try {
    const url = BASE_ADDRESS + '/agent/v1/'+details+'/'+location_id;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
      // body: JSON.stringify(data),
    });
    let responce_Values = await responce.text();

    console.log("#### getParkingDetailsbyParkingLocationId url:" + url);
    console.log("#### getParkingDetailsbyParkingLocationId :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - getParkingDetailsbyParkingLocationId : ' + error);
    throw error;
  }
}

//Delete Parking  By Parking Location Id  
async function deleteParkingByParkingLocationId(Token,location_id) {

  try {
    const url = BASE_ADDRESS + '/agent/v1/delete/'+location_id;
    let responce = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### deleteParkingByParkingLocationId url:" + url);
    console.log("#### deleteParkingByParkingLocationId :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - deleteParkingByParkingLocationId : ' + error);
    throw error;
  }
}

//Get All Parking Type List
async function getAllParkingTypeList(Token) {

  try {
    const url = BASE_ADDRESS + '/agent/v1/parkType';
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### getAllParkingTypeList url:" + url);
    console.log("#### getAllParkingTypeList :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - getAllParkingTypeList : ' + error);
    throw error;
  }
}

//.................Old APIs....................//

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

async function updateVehicle_new(Token, id, vehicleNo, vehicleType) {
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

// New API
export { Signup };
export { VerifyOTP };
export { CreateProfile };
export { Login };
export { ForgetPassword };
export { ViewProfile };
export { UpdateProfile };
export { getVehicleTypeList };
export { createNewVehicle_New };
export { getVehicleDetails };
export { searchParkLocation };
export { deleteVehicle_new };
export { updateVehicle_new };
export { showParkingDetails };
export { Booking };
export { AddParkingLocation };

export { searchParkLocationForm };

export { getAllParkingsLocationofAgent };
export { addparkingLocationInSystem };
export { updateParkingLocation };
export { getParkingDetailsbyParkingLocationId };
export { getAllParkingTypeList };

