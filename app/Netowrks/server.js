
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
async function searchParkLocation2(Token, lattitude, longitude, vehicleTypeId) {

  const data = {
    latitude: lattitude,
    longitude: longitude,
    vehicleTypeId: vehicleTypeId,
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

//2
async function searchParkLocation(Token, lattitude, longitude, vehicleTypeId, then, error) {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + Token);
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("Accept", "application/json");

  var formdata = new FormData();
  formdata.append("latitude",lattitude);
  formdata.append("longitude",longitude);
  formdata.append("vehicleTypeId",vehicleTypeId);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

 console.warn(JSON.stringify(formdata));
  const url = BASE_ADDRESS + '/parking-locations/v1/findLocByCoordinates';

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(then)
    .catch(error);
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

async function addparkingLocationInSystem(Token, image, parkdata, then, error) {

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
  alert(JSON.stringify(parkdata));
  console.warn(JSON.stringify(parkdata));
  fetch(BASE_ADDRESS + "/agent/v1/create", requestOptions)
    .then(response => response.text())
    .then(then)
    .catch(error);
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
async function getParkingDetailsbyParkingLocationId(Token, location_id) {

  try {
    const url = BASE_ADDRESS + '/agent/v1/details/' + location_id;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
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
async function deleteParkingByParkingLocationId(Token, location_id) {

  try {
    const url = BASE_ADDRESS + '/agent/v1/delete/' + location_id;
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

//Get Parking Reviews By Location Id
async function getparkingReviewsByLocationId(Token, location_id) {

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1/park-reviews/' + location_id;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### getparkingReviewsByLocationId url:" + url);
    console.log("#### getparkingReviewsByLocationId :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - getparkingReviewsByLocationId : ' + error);
    throw error;
  }
}

//Show All the Arrived Vehicle List 
async function getAlltheArrivedVehicleList(Token, location_id) {

  try {
    const url = BASE_ADDRESS + '/agent/v1/ParkedVehicles/'+location_id;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### getAlltheArrivedVehicleList url:" + url);
    console.log("#### getAlltheArrivedVehicleList :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - getAlltheArrivedVehicleList : ' + error);
    throw error;
  }
}

//All the Upcoming Vehicle List
async function getAlltheUpcomingVehicleList(Token,location_id) {

  try {
    const url = BASE_ADDRESS + '/agent/v1/upcomingVehicles/' + location_id;
    let responce = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token
      },
    });
    let responce_Values = await responce.text();

    console.log("#### getAlltheUpcomingVehicleList url:" + url);
    console.log("#### getAlltheUpcomingVehicleList :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - getAlltheUpcomingVehicleList : ' + error);
    throw error;
  }
}

//Check In
async function CheckIn(Token,bookingId, locationId, vehicleTypeId) {
  const data = {
    bookingId: bookingId,
    locationId: locationId,
    vehicleTypeId: vehicleTypeId
  }

  try {
    const url = BASE_ADDRESS + '/agent/v1/checkIn';
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

    console.log("#### CheckIn url:" + url);
    console.log("#### CheckIn :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - CheckIn : ' + error);
    throw error;
  }
}

//CheckOut
async function CheckOut(Token,bookingId, locationId, vehicleTypeId) {
  const data = {
    bookingId: bookingId,
    locationId: locationId,
    vehicleTypeId: vehicleTypeId
  }

  try {
    const url = BASE_ADDRESS + '/agent/v1/checkOut';
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

    console.log("#### CheckOut url:" + url);
    console.log("#### CheckOut :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - CheckOut : ' + error);
    throw error;
  }
}

//Update Parking reviews By Review
async function updateParkingreviewsByReview(Token,reviewId,rating,comment,parkingLocId,reply) {
  const data = {
    reviewId: reviewId,
    rating: rating,
    comment: comment,
    parkingLocId:parkingLocId,
    reply:reply
  }

  try {
    const url = BASE_ADDRESS + '/parking-locations/v1/park-reviews/update';
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

    console.log("#### updateParkingreviewsByReview url:" + url);
    console.log("#### updateParkingreviewsByReview data:" + JSON.stringify(data));
    console.log("#### updateParkingreviewsByReview :" + responce_Values);

    return JSON.parse(responce_Values); // this .data is array name of jason pass from the server side
  } catch (error) {
    //  alert('###: server error - getLogin : ' + JSONerror);
    console.log('### :Network call error - updateParkingreviewsByReview : ' + error);
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

// - Parking Booking APIS - //

//Get All Parkings Location of Agent 

async function ParkingBookingInitiate(Token, image, parkdata, then, error) {

  //sameple data
  //  {
  //   "parkLocId" : 5 ,
  //    "amt" : 200 ,
  //     "fromTime" : "18:00"  ,
  //      "toTime" : "20:00",
  //       "vehicleId" : 1  ,
  //        "bonusCode" : "First100"
  //       } 

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
  alert(JSON.stringify(parkdata));
  console.warn(JSON.stringify(parkdata));
  fetch(BASE_ADDRESS + "/booking/v1/initBooking", requestOptions)
    .then(response => response.text())
    .then(then)
    .catch(error);
}



export { findUserById };
export { authonticate };
export { findAllVehicles }

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
export { updateVehicle };
export { deleteVehicle_new };
export { showParkingDetails };
export { Booking };
export { AddParkingLocation };

export { getAllParkingsLocationofAgent };
export { addparkingLocationInSystem };
export { updateParkingLocation };
export { getParkingDetailsbyParkingLocationId };
export { getAllParkingTypeList };
export { deleteParkingByParkingLocationId };
export { getparkingReviewsByLocationId };
export { getAlltheUpcomingVehicleList };
export { getAlltheArrivedVehicleList };
export { CheckIn};
export { CheckOut};
export {updateParkingreviewsByReview};

export {ParkingBookingInitiate};

