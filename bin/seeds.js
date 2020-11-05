const mongoose = require("mongoose");
const Plan = require("../models/Plan");

const dbName = "Host-my-bash";
mongoose.connect(`mongodb+srv://Crugudar:holamundo@host-my-bash.eonqa.mongodb.net/Host-my-bash?retryWrites=true&w=majority`);

const plans = [
  {
    image:
      "https://tecnohotelnews.com/wp-content/uploads/2020/05/roberto-nickson-h1_ILkb9tLo-unsplash.jpg",
    planName: "Pool party- Hotel Palace",
    description: "The sunset, amazing music, some drinks and your friends in a unique atmosphere ",
    streetName: "Passeig de Gracia",
    streetNumber: 103,
    city: "Barcelona",
    zipcode: 08007,
    phone: 934567890,
  },
  {
    image:
      "https://1806.com.au/wp-content/uploads/2015/05/Bar-1806-9-scaled.jpg",
    planName: "Cocktail making exhibition at our Bar- Hotel Arts",
    description:"Enjoy, together with 5 friends, a cocktail exhibition at the hotel's bar along with the tasting of various personalized cocktails according to the tastes of the attendees",
    streetName: "Carrer de la Marina",
    streetNumber: 19,
    zipcode: 08005,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://www.incimages.com/uploaded_files/image/1920x1080/getty_509420146_353481.jpg",
    planName: "Pool and magic - Hotel Arts",
    description:
      "Magic show with the best views of the city. Followed by a snack prepared by our amazing chefs",
    streetName: "Carrer de la Marina",
    streetNumber: 19,
    zipcode: 08005,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://tastychomps.com/wp-content/uploads/2018/11/ORL_TOKYOSOUL_ASSETS_8.jpg",
    planName: "Tasting dinner- Hotel Arts",
    description:
      "We reserve an intimate dinning room for you to enjoy the creations of chefs Alejandro Lozano and Mónica Divé",
    streetName: "Carrer de la Marina",
    streetNumber: 19,
    zipcode: 08005,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://welcometoibiza.com/wp-content/uploads/Casino-Ibiza-Gran-Hotel-Ibiza-07.jpg",
    planName: "Poker evening- Hotel palace",
    description: "Get ready for an afternoon with class, excitement and good luck, in the poker game that we will organize for you.",
    streetName: "Passeig de Gracia",
    streetNumber: 103,
    city: "Barcelona",
    zipcode: 08007,
    phone: 934567890,
  },
  {
    image: "https://media-cdn.tripadvisor.com/media/photo-s/06/e4/e5/11/catheriya-thai-massage.jpg",
    planName: "Tea and massage- Hotel palace",
    description:
      "Have a relaxing afternoon: a massage, music and a selection of tea and pastries so that your afternoon is the sweetest",
    streetName: "Passeig de Gracia",
    streetNumber: 103,
    zipcode: 08007,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://img.freepik.com/free-photo/girls-enjoying-spa-day-with-glass-champagne_23-2148238343.jpg?size=626&ext=jpg",
    planName: "Manicure and hairdressing- Hotel Estival Park",
    description:
      "Pamper yourselves for a whole afternoon getting a hair makeover and getting the finnest manicure, while enjoyimg a bottle of champagne on the house",
    streetName: "Granvia de les Corts Catalanes",
    streetNumber: 289,
    zipcode: 08011,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/0e/1d/22/73/disco-redlight.jpg",
    planName: "Disco- Hotel Estival Park",
    description:
      " Do you miss the discos? We too. That's why we open ours once a day so that 6 lucky people can dance until they can't anymore without fear of the virus",
    streetName: "Granvia de les Corts Catalanes",
    streetNumber: 289,
    zipcode: 08011,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image: "https://gazzettahedone.mx/wp-content/uploads/2019/05/DSC_2698.jpg",
    planName: "Blind dinner- Hotel Estival Park",
    description:
      "Dinner in the dark, as in the most exclusive restaurants in the great European capitals brought by the Hotel Estival Park for a maximum of 6 lucky people",
    streetName: "Granvia de les Corts Catalanes",
    streetNumber: 289,
    zipcode: 08011,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image: "https://media.timeout.com/images/105476110/image.jpg",
    planName: "Costume party on the Rooftop- Hotel H10 Puerta de Alcalá",
    description:
      "You bring your friends and the costumes, we'll take care of the rest",
    streetName: "Calle de Alcalá",
    streetNumber: 66,
    zipcode: 28009,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image: "https://celiaeig.com/images_db/imgsNews/134_.jpg",
    planName: "Cocktail class- Hotel H10 Puerta de Alcalá",
    description:
      "Cocktails friends and learning tricks that will make the center of the party",
    streetName: "Calle de Alcalá",
    streetNumber: 66,
    zipcode: 28009,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image: "https://ksr-ugc.imgix.net/assets/013/602/870/fd327ba0b7859b9414547aecb7ee7003_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1474433599&auto=format&frame=1&q=92&s=c6b555cba73ca064439a27ab135c4707",
    planName: "Mystery afternoon- Hotel H10 Puerta de Alcalá",
    description:
      " The terrible murder of our hotel owner has taken place and we need the best detectives to find the culprit and solve the mystery",
    streetName: "Calle de Alcalá",
    streetNumber: 66,
    zipcode: 28009,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image:
      "https://www.vinetur.com/imagenes/2017/noviembre/30/cata_vinos.jpg",
    planName: "Wine tasting B&B Hotel Madrid Centro Puerta del Sol",
    description:
      "Learn to enjoy wine to another level in this exclusive wine tasting accompanied by a cheese pairing made in heaven",
    streetName: "Calle de la Montera",
    streetNumber: 10,
    zipcode: 28013,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image:
      "https://www.nescafe.com/es/sites/g/files/dzyqzn2471/files/styles/topic_intro_large/public/coffee-collection-campaigns_1.jpg?itok=F5Y19G5W",
    planName:
      "Coffee tasting in our Coffee shop- B&B Hotel Madrid Centro Puerta del Sol",
    description: "Coffee addicts? Welcome to your home !!",
    streetName: "Calle de la Montera",
    streetNumber: 10,
    zipcode: 28013,
    city: "Madrid",
    phone: 934567890,
  },

  {
    image:
      "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/16/2016/10/27141324/new-years-eve.jpg",
    planName: "New year's Eve party- B&B Hotel Madrid Centro Puerta del Sol",
    description:"Yes, today is not New Year's Eve and probably not tomorrow either, but who prevents you from having a New Year's Eve party when you feel like it? Not us !!",
    streetName: "Calle de la Montera",
    streetNumber: 10,
    zipcode: 28013,
    city: "Madrid",
    phone: 934567890,
  },
];

Plan.create(plans, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Created ${plans.length} plans`);
  mongoose.connection.close();
});
