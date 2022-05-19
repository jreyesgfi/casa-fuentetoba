//^^^^^^^^^^^^^^^^^^^^^^^^
//example of main photo dict

    
//first the different types of arrays
var terrazaFolder = [];
var salonFolder = [];
var bañosFolder = [];
var habitacionesFolder = [];
var cocinaFolder = [];





export const globalFolder={
    'JARDÍN': terrazaFolder,
    'SALÓN': salonFolder,
    'BAÑOS':bañosFolder,
    'HABITACIONES':habitacionesFolder,
    'COCINA':cocinaFolder,
}

const ejemploDocumento= {
    'imgUrl':'/images/photolake/cocina/cocina-2.jpeg',
    'room':'COCINA',
    'place':2,
}

const ejemploDocumento2= {
    'imgUrl':'/images/photolake/salon/salon-2.jpeg',
    'room':'SALÓN',
    'place':3,
}

const ejemploDocumento3= {
    'imgUrl':'/images/photolake/baño/baño-1.jpeg',
    'room':'BAÑOS',
    'place':3,
}

const ejemploDocumento4= {
    'imgUrl':'/images/photolake/habitacion/habitacion-1.jpeg',
    'room':'HABITACIONES',
    'place':3,
}

const ejemploDocumento5= {
    'imgUrl':'/images/photolake/terraza/terraza-2.jpeg',
    'room':'JARDÍN',
    'place':6,
}

const ejemploDocumento6= {
    'imgUrl':'/images/photolake/cocina/cocina-1.jpeg',
    'room':'COCINA',
    'place':6,
}

const ejemploDocumento7= {
    'imgUrl':'/images/photolake/terraza/terraza-1.jpeg',
    'room':'JARDÍN',
    'place':6,
}

const ejemploDocumento8= {
    'imgUrl':'/images/photolake/habitacion/habitacion-2.jpeg',
    'room':'HABITACIONES',
    'place':6,
}

const ejemploDocumento9= {
    'imgUrl':'/images/photolake/baño/baño-2.jpeg',
    'room':'BAÑOS',
    'place':1,
}

const ejemploDocumento10= {
    'imgUrl':'/images/photolake/salon/salon-1.jpeg',
    'room':'SALÓN',
    'place':3,
}

// example of documents array()
var ejemploArrayDocumentos=[
    ejemploDocumento10,
    ejemploDocumento,
    ejemploDocumento2,
    ejemploDocumento3,
    ejemploDocumento4,
    ejemploDocumento5,
    ejemploDocumento6,
    ejemploDocumento7,
    ejemploDocumento8,
    ejemploDocumento9,
];

for (let ejemplo of ejemploArrayDocumentos){
    var room = ejemplo['room'];
    globalFolder[room]?.push(ejemplo)
}


cocinaFolder.push(ejemploDocumento)

