# Host-my-Bash

## Description

Host my bash has its origin in the situation we are currently living. Since Hotels can no longer benefit fron tourism (as much as they did) and people are sick and tired of staying at home we've decided to create a platform where hotels can offer plans to local clients to have fun while keeping in mid we are in the middle of a pandemic. 
 
## User Stories

###Client and Hotel

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **About us** - As a user I want to know the marvellous people that made this project

###Only Client
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **book an event** - As a user I want to be able to book the plan that I've chosen and create a gust list with the friends that will come with me (maximun 6)
- **profile** - As a user I want to see all the plans that I've booked edit my guest list and even cancel the reservation deleting it. I also want to upload a profile picture.

###Only Hotel 
- **events create** - As a user I want to create an event so that people can book it
- **profile** - As a user I want to see all the plans that I'm offering an the number of reservation that it has. I also want to edit the plan or delete it and stop offering it if no one has made a reservation already.


## Backlog

List of other features outside of the MVPs scope

Clients:
-Interact with other users with reviews maybe
-Taylormade event 

Hotels:
- Have more control over the possibility to edit a plan or delete it even if there are reservations

Covid Page

E-commerce


## ROUTES:

- GET / 
  - renders the homepage and shows different options to Hotels or Clients
  
- GET /signup
  - renders the signup form 
  - error messages
- POST /signup
  - redirects to /loggin after the signup
  -error messages
  - body:
    username,
    lastname,
    email,
    verifyemail,
    password,
    verifypassword,
    
- GET /login
  - renders the login form (with flash msg)
- POST /auth/login
  - body:
    - username
    - password
    
- GET /logout
  - redirects to / and erases token

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
    
    
-GET /aboutus
 - renders about us
 
-GET /filter
 - renders filter

-GET/list/
 - renders errors
 - renders available plans

-GET /details/:_id/:date
 - renders plan details 
 
-GET /booking/:_id/:date/
 - renders booking form with info in query
 
-POST/booking/:_id/:date/:people 
 - Saves info of the booking form.
 - Creates new booking
 - Updates user
 - renders confirmation
 
-GET /profile
 - populates User
 - renders profile
 
- GET /editbookings/:_id
 - renders edit form
 
- POST /editbookings/:_id
 -  gets the info in the form 
 -  updates the booking
 -  re populates User
 -  renders profile with new info

-GET /profilephoto
 -renders form to upload profile phot

 
-POST /profilephoto 
 - gets photo
 - updates user
 - redirects to profile

 
 -GET /delete/:_id
  - deletes booking 
  - updates user
  
  FROM THIS ONE ON ALMOST EVERY ROUTE MODIFIES THE LAYOUT FOR HOTEL USERS
 
 -GET /hotelsignup
  - special signup for hotels
  - renders special signup
 
 -POST /hotelsignup
      username,
      email,
      password: hashPass,
      isHotel: true,
  - creates Hotel
 
 -GET /hotelprofile
  - Renders hotel profile
  
 -GET /createaplan
  - renders the form to create a plan
  
 -POST /createaplan
  - get info 
  - creates plan
  - updates User
  - redirects to profile
  
 -GET /deleteplans/:_id
  - deletes plan 
  - updates user
  - redirects to profile

 -GET /editplans/:_id
   - renders form
 
 -POST /editplans/:_id
   - updates plan redirects profile
   

## Models

User model
 
```
  username: { type: String, required: true, unique: true },
  imgPath:{type:String},
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHotel: { type: Boolean, default: false },
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
```

Plan model
```
    image:{type:String},
    planName:{type:String, required:true},
    description:{type:String, required:true},
    streetName:{type:String},
    streetNumber:{type:String},
    zipcode:{type:Number},
    city:{type:String},
    phone: {type:Number},
    reserved:[{type:String,default:null}]
```
Booking model 
```
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    plan:{type:Schema.Types.ObjectId, ref:'Plan'},
    date: {type: String},
    invited:[{type:Object}]
```

## Links

### Trello

https://trello.com/b/Evh6yG4c/host-my-bash

### Git

https://github.com/Crugudar/Host-my-Bash

https://host-my-bash.herokuapp.com/

### Slides

https://docs.google.com/presentation/d/1R65rjHN9ROETqNoHDRqvEv1YwkIqHDkW88cRBWamP8U/edit?usp=sharing

