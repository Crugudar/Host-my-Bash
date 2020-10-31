const mongoose = require("mongoose");
const Plan = require("../models/Plan");

const dbName = "Host-my-bash";
mongoose.connect(`mongodb://localhost/${dbName}`);

const plans = [
  {
    image:
      "https://tecnohotelnews.com/wp-content/uploads/2020/05/roberto-nickson-h1_ILkb9tLo-unsplash.jpg",
    planName: "Piscina- Hotel palace",
    description: "Atardecer, música unas copas y amigos en un ambiente único",
    streetName: "Passeig de Gracia",
    streetNumber: 103,
    city: "Barcelona",
    zipcode: 08007,
    phone: 934567890,
  },
  {
    image:
      "https://www.hotelartsbarcelona.com/app/uploads/2017/09/p41-bar-mural-inocuo-hotel-arts-barcelona-980x980.jpg",
    planName: "Bar- Hotel Arts",
    description:
      "Disfruta junto con 5 amigos de una exhibición de cocktelería en el bar de huestro hotel junto con la degustación de varios cóckteles personalizados según los gustos de los asistentes",
    streetName: "Carrer de la Marina",
    streetNumber: 19,
    zipcode: 08005,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2018/05/28/15275217975215.jpg",
    planName: "Piscina y magia- Hotel Arts",
    description:
      "Show de magia con las mejores vistas de la ciudad. Seguidas de un picoteo preparado por nuestros chefs",
    streetName: "Carrer de la Marina",
    streetNumber: 19,
    zipcode: 08005,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://www.hotelartsbarcelona.com/app/uploads/2017/10/enoteca_paco_perez_hotel_arts_horiz.jpg",
    planName: "Cena degustación- Hotel Arts",
    description:
      "Os reservamos un cómedor íntimo para poder disfrutar de las creaciones de los chefs Alejandro Lozano y Mónica Divé",
    streetName: "Carrer de la Marina",
    streetNumber: 19,
    zipcode: 08005,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://travesiasdigital.com/wp-content/uploads/2019/05/royal-bar-hotel-palace-tokio-japon.jpg",
    planName: "Tarde de póker- Hotel palace",
    description: "Amigos, cartas y las mejores bebidas en nuetro bar",
    streetName: "Passeig de Gracia",
    streetNumber: 103,
    city: "Barcelona",
    zipcode: 08007,
    phone: 934567890,
  },
  {
    image: "https://cf.bstatic.com/images/hotel/max1024x768/132/132938846.jpg",
    planName: "Masaje y merienda- Hotel palace",
    description:
      "Tenéis para vosotros una tarde relajante, un masaje, música y una selección de platos para que tu tarde y la de tus amigos sea la más dulce",
    streetName: "Passeig de Gracia",
    streetNumber: 103,
    zipcode: 08007,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image:
      "https://www.estivalpark.es/hotels/park/files/content/hotel/fotos-habitacion/Suite-Hotel-II-6.jpg",
    planName: "Manicura y peluqueria- Hotel Estival Park",
    description:
      "Tarde de mimos: poneos guapos uno a uno mientras el resto disfruta de una botella de vino cortesía de la casa ",
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
      "¿Echas de menos las discotecas? Nosotros también. Por eso abrimos la nuestra una vez cada día para que 6 afortunados puedan bailar hasta reventar sin temor al virus",
    streetName: "Granvia de les Corts Catalanes",
    streetNumber: 289,
    zipcode: 08011,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image: "https://cf.bstatic.com/images/hotel/max1280x900/186/186427456.jpg",
    planName: "Cena íntima- Hotel Estival Park",
    description:
      "Cena a oscuras, como en los restaurantes más exclusivos de las grandes capitales europeas traido por el Hotel Estival Park para un máximo de 6 afortunados",
    streetName: "Granvia de les Corts Catalanes",
    streetNumber: 289,
    zipcode: 08011,
    city: "Barcelona",
    phone: 934567890,
  },
  {
    image: "https://media.timeout.com/images/105476110/image.jpg",
    planName: "Fista de disfraces en el Rooftop- Hotel H10 Puerta de Alcalá",
    description:
      "Tú trae a tus amigos y los disfraces, del resto nos ocupamos nosotros",
    streetName: "Calle de Alcalá",
    streetNumber: 66,
    zipcode: 28009,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image: "https://www.venuesplace.com/ficheros/1vqdVYnT/66YBeIiM_t4.jpg",
    planName: "Clase de cockteleria- Hotel H10 Puerta de Alcalá",
    description:
      "Pues eso, cóckteles amigos y aprender trucos que te harán ser el centro de la fiesta",
    streetName: "Calle de Alcalá",
    streetNumber: 66,
    zipcode: 28009,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image: "https://vive-media-tpvbooking.netdna-ssl.com/36550/17.jpg",
    planName: "Trade de cine- Hotel H10 Puerta de Alcalá",
    description:
      "Dinos, ¿cuál es esa peli que te encanta y quieres compartir con los tuyos? Nosotros la proyectamos en pantalla grande y os proporcionamos todo lo necesario para que sea una tarde inolvidable",
    streetName: "Calle de Alcalá",
    streetNumber: 66,
    zipcode: 28009,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image:
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/83905009.jpg?k=5de796bfdb1cc63039613c44f7fd49c58b536c4d371b5801a6507ae5c6067d2c&o=",
    planName: "Suite- B&B Hotel Madrid Centro Puerta del Sol",
    description:
      "Tarde de mimos: poneos guapos uno a uno mientras el resto disfruta de una botella de vino cortesía de la casa ",
    streetName: "Calle de la Montera",
    streetNumber: 10,
    zipcode: 28013,
    city: "Madrid",
    phone: 934567890,
  },
  {
    image:
      "https://res.cloudinary.com/hzekpb1cg/image/upload/q_95%2Cf_auto/s3/public/prod/s3fs-public/hotel-madrid-puerta-del-sol-coffee.jpg",
    planName:
      "Degustación de café en nuestro Coffee shop- B&B Hotel Madrid Centro Puerta del Sol",
    description: "¿Adictos al café? Bienvenidos a vuestra casa!!",
    streetName: "Calle de la Montera",
    streetNumber: 10,
    zipcode: 28013,
    city: "Madrid",
    phone: 934567890,
  },

  {
    image:
      "https://y.cdrst.com/foto/hotel-sf/a0d49/granderesp/b-b-hotel-madrid-centro-puerta-del-sol-general-974ee99.jpg",
    planName: "Fiesta de nochevieja- B&B Hotel Madrid Centro Puerta del Sol",
    description:
      "Sí, ya, hoy no es nochevieja y probablemente mañana tampoco, pero ¿quién te impide celebrar una fiesta de Nochevieja cuando te venga en gana? Nosotro no!!",
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
