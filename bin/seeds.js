const mongoose = require('mongoose');
const Estancia = require('../models/Estancia')

const dbName = 'Host-my-bash';
mongoose.connect(`mongodb://localhost/${dbName}` );

const estancias = [
    {
        image:'https://tecnohotelnews.com/wp-content/uploads/2020/05/roberto-nickson-h1_ILkb9tLo-unsplash.jpg',
        estanciaName:"Piscina- Hotel palace",
        streetName:'Passeig de Gracia',
        streetNumber:103,
        city:'Barcelona',
        zipcode:08007,
        phone: 934567890,
    
    },
    {
        image:'https://www.hotelartsbarcelona.com/app/uploads/2017/09/p41-bar-mural-inocuo-hotel-arts-barcelona-980x980.jpg',
        estanciaName:"Bar- Hotel Arts",
        streetName:'Carrer de la Marina',
        streetNumber:19,
        city:'Barcelona',
        zipcode:08005,
        phone: 934567890,
      
    },
    {
        image:'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2018/05/28/15275217975215.jpg',
        estanciaName:"Piscina- Hotel Arts",
        streetName:'Carrer de la Marina',
        streetNumber:19,
        city:'Barcelona',
        zipcode:08005,
        phone: 934567890,
       
    },
    {
        image:'https://www.hotelartsbarcelona.com/app/uploads/2017/10/enoteca_paco_perez_hotel_arts_horiz.jpg',
        estanciaName:"Comedor pequeño- Hotel Arts",
        streetName:'Carrer de la Marina',
        streetNumber:19,
        city:'Barcelona',
        zipcode:08005,
        phone: 934567890,
    },
    {
        image:'https://travesiasdigital.com/wp-content/uploads/2019/05/royal-bar-hotel-palace-tokio-japon.jpg',
        estanciaName:"Bar- Hotel palace",
        streetName:'Passeig de Gracia',
        streetNumber:103,
        city:'Barcelona',
        zipcode:08007,
        phone: 934567890,
     
    },
    {
        image:'https://cf.bstatic.com/images/hotel/max1024x768/132/132938846.jpg',
        estanciaName:"Suite junior- Hotel palace",
        streetName:'Passeig de Gracia',
        streetNumber:103,
        city:'Barcelona',
        zipcode:08007,
        phone: 934567890,

    },
    {
        image:'https://www.estivalpark.es/hotels/park/files/content/hotel/fotos-habitacion/Suite-Hotel-II-6.jpg',
        estanciaName:"Suite junior- Hotel Estival Park",

        streetName:'Granvia de les Corts Catalanes',
        streetNumber:289,
        city:'Barcelona',
        zipcode:08011,
        phone: 934567890,

    },
    {
        image:'https://media-cdn.tripadvisor.com/media/photo-s/0e/1d/22/73/disco-redlight.jpg',
        estanciaName:"Disco- Hotel Estival Park",

        streetName:'Granvia de les Corts Catalanes',
        streetNumber:289,
        city:'Barcelona',
        phone: 934567890,
    },
    {
        image:'https://cf.bstatic.com/images/hotel/max1280x900/186/186427456.jpg',
        estanciaName:"Comedor íntimo- Hotel Estival Park",

        streetName:'Granvia de les Corts Catalanes',
        streetNumber:289,
        city:'Barcelona',
        zipcode:08011,
        phone: 934567890,

    },
    {
        image:'https://media.timeout.com/images/105476110/image.jpg',
        estanciaName:"Rooftop- Hotel H10 Puerta de Alcalá",

        streetName:'Calle de Alcalá',
        streetNumber:66,
        city:'Madrid',
        zipcode:28009,
        phone: 934567890,
 
    },
    {
        image:'https://www.venuesplace.com/ficheros/1vqdVYnT/66YBeIiM_t4.jpg',
        estanciaName:"Bar entrada- Hotel H10 Puerta de Alcalá",

        streetName:'Calle de Alcalá',
        streetNumber:66,
        city:'Madrid',
        zipcode:28009,
        pack: [{type:String}],
        phone: 934567890,
        webpage:{type:String} ,
        invited:[{type:String}],
        bookedDates:[{type:Date}]
    },
    {
        image:'https://vive-media-tpvbooking.netdna-ssl.com/36550/17.jpg',
        estanciaName:"Sala reuniones- Hotel H10 Puerta de Alcalá",

        streetName:'Calle de Alcalá',
        streetNumber:66,
        city:'Madrid',
        zipcode:28009,
        phone: 934567890,

    },
    {
        image:'https://q-xx.bstatic.com/xdata/images/hotel/max500/83905009.jpg?k=5de796bfdb1cc63039613c44f7fd49c58b536c4d371b5801a6507ae5c6067d2c&o=',
        estanciaName:"Suite- B&B Hotel Madrid Centro Puerta del Sol",

        streetName:'Calle de la Montera',
        streetNumber:10,
        city:'Madrid',
        zipcode:28013,
        phone: 934567890,

    },
    {
        image:'https://res.cloudinary.com/hzekpb1cg/image/upload/q_95%2Cf_auto/s3/public/prod/s3fs-public/hotel-madrid-puerta-del-sol-coffee.jpg',
        estanciaName:"Coffee shop- B&B Hotel Madrid Centro Puerta del Sol",

        streetName:'Calle de la Montera',
        streetNumber:10,
        city:'Madrid',
        zipcode:28013,
        phone: 934567890,
    },

    {
        image:'https://y.cdrst.com/foto/hotel-sf/a0d49/granderesp/b-b-hotel-madrid-centro-puerta-del-sol-general-974ee99.jpg',
        estanciaName:"Terrace- B&B Hotel Madrid Centro Puerta del Sol",
   
        streetName:'Calle de la Montera',
        streetNumber:10,
        city:'Madrid',
        zipcode:28013,
        phone: 934567890,

    },
    
    
  ];


  Estancia.create(estancias, (err) => {
        if (err) { throw(err);}
        console.log(`Created ${estancias.length} estancias`);
        mongoose.connection.close();
      });