'use strict';

var Users = require('../models/users.js');
var yelp = require('yelp-fusion');

function ClickHandler () {
  // resets RSVP's after 6am;
  this.resetRSVP = (req, res) => {
    if(new Date().getHours() === 6) {
      Users.updateMany({},
        { $pull: 
          {'twitter.nightlife': {} }
        })
        .exec(err => {
          if (err) throw err;           
      }); 
    }
  };
  
  this.demo = (req, res) => {
  let something = [
    {
        "id": "w_TILSpebOiv2Ma46oLX_w",
        "alias": "copperpoint-brewing-co-boynton-beach",
        "name": "Copperpoint Brewing Co",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/eTRnvK53J9fmz9lcSKixrQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/copperpoint-brewing-co-boynton-beach?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 195,
        "categories": [
            {
                "alias": "beergardens",
                "title": "Beer Gardens"
            },{
                "alias": "breweries",
                "title": "Breweries"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 26.55955,
            "longitude": -80.07304
        },
        "transactions": [],
        "price": "$",
        "location": {
            "address1": "151 Commerce Rd",
            "address2": "",
            "address3": "",
            "city": "Boynton Beach",
            "zip_code": "33426",
            "country": "US",
            "state": "FL",
            "display_address": [
                "151 Commerce Rd",
                "Boynton Beach, FL 33426"
            ]
        },
        "phone": "+15615087676",
        "display_phone": "(561) 508-7676",
        "distance": 10847.416439770377
    },{
        "id": "6NzbgOQx1onp0q526O55qg",
        "alias": "oak-bistro-and-wine-bar-royal-palm-beach",
        "name": "OAK Bistro & Wine Bar",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/emCXc_XMV3vmkpCSCESlrQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/oak-bistro-and-wine-bar-royal-palm-beach?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 96,
        "categories": [
            {
                "alias": "wine_bars",
                "title": "Wine Bars"
            },{
                "alias": "tapas",
                "title": "Tapas Bars"
            },{
                "alias": "tapasmallplates",
                "title": "Tapas/Small Plates"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 26.6811671,
            "longitude": -80.2200916
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "11051 Southern Blvd",
            "address2": "Ste 210",
            "address3": "",
            "city": "Royal Palm Beach",
            "zip_code": "33411",
            "country": "US",
            "state": "FL",
            "display_address": [
                "11051 Southern Blvd",
                "Ste 210",
                "Royal Palm Beach, FL 33411"
            ]
        },
        "phone": "+15617536217",
        "display_phone": "(561) 753-6217",
        "distance": 11028.516509044368
    },{
        "id": "KBObkCcWPvck1n9ShB5DWg",
        "alias": "due-south-brewing-boynton-beach-2",
        "name": "Due South Brewing",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/5JR73WQOQAizT1VQg6a7uA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/due-south-brewing-boynton-beach-2?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 228,
        "categories": [
            {
                "alias": "breweries",
                "title": "Breweries"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 26.556677,
            "longitude": -80.074775
        },
        "transactions": [],
        "price": "$",
        "location": {
            "address1": "2900 High Ridge Rd",
            "address2": "Ste 3",
            "address3": "",
            "city": "Boynton Beach",
            "zip_code": "33426",
            "country": "US",
            "state": "FL",
            "display_address": [
                "2900 High Ridge Rd",
                "Ste 3",
                "Boynton Beach, FL 33426"
            ]
        },
        "phone": "+15614632337",
        "display_phone": "(561) 463-2337",
        "distance": 10805.584367042253
    },{
        "id": "Os7Sqj07--fH5GlKdaRhOw",
        "alias": "kaluz-restaurant-fort-lauderdale-3",
        "name": "Kaluz Restaurant",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/U9VvBN2dBTwLpTA03QtTEQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/kaluz-restaurant-fort-lauderdale-3?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 928,
        "categories": [
            {
                "alias": "newamerican",
                "title": "American (New)"
            },{
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 26.65089,
            "longitude": -80.2182322
        },
        "transactions": [],
        "price": "$$$",
        "location": {
            "address1": "3300 E Commercial Blvd",
            "address2": null,
            "address3": "",
            "city": "Fort Lauderdale",
            "zip_code": "33308",
            "country": "US",
            "state": "FL",
            "display_address": [
                "3300 E Commercial Blvd",
                "Fort Lauderdale, FL 33308"
            ]
        },
        "phone": "+19547722209",
        "display_phone": "(954) 772-2209",
        "distance": 7599.035695226534
    },{
        "id": "6Kw1Rlx44zXsLfBItumCGw",
        "alias": "kaluz-restaurant-wellington-2",
        "name": "Kaluz Restaurant",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/MYFlvcwHykDEdR41-USebw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/kaluz-restaurant-wellington-2?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 241,
        "categories": [
            {
                "alias": "newamerican",
                "title": "American (New)"
            },{
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 26.650888,
            "longitude": -80.218231
        },
        "transactions": [],
        "location": {
            "address1": "2025 Wellington Green Dr",
            "address2": "",
            "address3": null,
            "city": "Wellington",
            "zip_code": "33414",
            "country": "US",
            "state": "FL",
            "display_address": [
                "2025 Wellington Green Dr",
                "Wellington, FL 33414"
            ]
        },
        "phone": "+15617845500",
        "display_phone": "(561) 784-5500",
        "distance": 7594.352426927749
    },{
        "id": "K1JzjCE0JnhZ0ahwwS6MZQ",
        "alias": "the-chill-room-lake-worth",
        "name": "The Chill Room",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/-0-eheIKJbms-fxmVMfbfw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/the-chill-room-lake-worth?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 13,
        "categories": [
            {
                "alias": "vapeshops",
                "title": "Vape Shops"
            },{
                "alias": "lounges",
                "title": "Lounges"
            },{
                "alias": "kombucha",
                "title": "Kombucha"
            }
        ],
        "rating": 5,
        "coordinates": {
            "latitude": 26.6180095408126,
            "longitude": -80.1603312674591
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "7201 Lake Worth Rd",
            "address2": "Ste D",
            "address3": null,
            "city": "Lake Worth",
            "zip_code": "33467",
            "country": "US",
            "state": "FL",
            "display_address": [
                "7201 Lake Worth Rd",
                "Ste D",
                "Lake Worth, FL 33467"
            ]
        },
        "phone": "+15616297657",
        "display_phone": "(561) 629-7657",
        "distance": 2967.890082356587
    },{
        "id": "8LRYOrf-ZRQJjmh929VzIg",
        "alias": "the-venu-restaurant-and-bar-boynton-beach",
        "name": "The Venu Restaurant and Bar",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/ThJq9YzzTvUvxHYyvuQZuA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/the-venu-restaurant-and-bar-boynton-beach?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 120,
        "categories": [
            {
                "alias": "musicvenues",
                "title": "Music Venues"
            },{
                "alias": "bars",
                "title": "Bars"
            },{
                "alias": "italian",
                "title": "Italian"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 26.5266545643926,
            "longitude": -80.1866833493114
        },
        "transactions": [],
        "location": {
            "address1": "8794 W Boynton Beach Blvd",
            "address2": "Ste 101",
            "address3": null,
            "city": "Boynton Beach",
            "zip_code": "33472",
            "country": "US",
            "state": "FL",
            "display_address": [
                "8794 W Boynton Beach Blvd",
                "Ste 101",
                "Boynton Beach, FL 33472"
            ]
        },
        "phone": "+15612000222",
        "display_phone": "(561) 200-0222",
        "distance": 7653.60272462875
    },{
        "id": "HK_VnPpIzEFZ0iT1xVbx-A",
        "alias": "iberia-bar-and-grill-greenacres-2",
        "name": "Iberia Bar & Grill",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/dnj2HSeALxgRjShmOxra8A/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/iberia-bar-and-grill-greenacres-2?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 50,
        "categories": [
            {
                "alias": "portuguese",
                "title": "Portuguese"
            },{
                "alias": "bbq",
                "title": "Barbeque"
            },{
                "alias": "bars",
                "title": "Bars"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 26.62316,
            "longitude": -80.11382
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "3745 S Military Trl",
            "address2": "",
            "address3": "",
            "city": "Greenacres",
            "zip_code": "33463",
            "country": "US",
            "state": "FL",
            "display_address": [
                "3745 S Military Trl",
                "Greenacres, FL 33463"
            ]
        },
        "phone": "+15618292125",
        "display_phone": "(561) 829-2125",
        "distance": 6840.067584095725
    },{
        "id": "QOO0LIBqftW8AYQsbF9Q3g",
        "alias": "mckennas-place-palm-springs",
        "name": "McKenna's Place",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/OE_pC8MFXSnOzzwcUIEHhQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/mckennas-place-palm-springs?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 49,
        "categories": [
            {
                "alias": "tradamerican",
                "title": "American (Traditional)"
            },{
                "alias": "seafood",
                "title": "Seafood"
            },{
                "alias": "sportsbars",
                "title": "Sports Bars"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 26.651233,
            "longitude": -80.1051412
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "4068 Forest Hill Blvd",
            "address2": "",
            "address3": null,
            "city": "Palm Springs",
            "zip_code": "33406",
            "country": "US",
            "state": "FL",
            "display_address": [
                "4068 Forest Hill Blvd",
                "Palm Springs, FL 33406"
            ]
        },
        "phone": "+15619680032",
        "display_phone": "(561) 968-0032",
        "distance": 9307.515022942798
    },{
        "id": "vt-PoDTSRjUENvUGArxKsw",
        "alias": "fords-garage-wellington-wellington-2",
        "name": "Ford's Garage Wellington",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/tw6lA63E1QIESrhJii6qHw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/fords-garage-wellington-wellington-2?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 92,
        "categories": [
            {
                "alias": "burgers",
                "title": "Burgers"
            },{
                "alias": "tradamerican",
                "title": "American (Traditional)"
            },{
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.65049,
            "longitude": -80.20912
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "10300 Forest Hills Blvd",
            "address2": "Ste 122",
            "address3": null,
            "city": "Wellington",
            "zip_code": "33414",
            "country": "US",
            "state": "FL",
            "display_address": [
                "10300 Forest Hills Blvd",
                "Ste 122",
                "Wellington, FL 33414"
            ]
        },
        "phone": "+15618053673",
        "display_phone": "(561) 805-3673",
        "distance": 6555.378528515231
    },{
        "id": "bWhgHY7At3T5obS3pORYHw",
        "alias": "jojos-raw-bar-and-grill-wellington",
        "name": "JoJo's Raw Bar & Grill",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/qTPCYQ_umNEjqiwrkiOxlA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/jojos-raw-bar-and-grill-wellington?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 114,
        "categories": [
            {
                "alias": "tradamerican",
                "title": "American (Traditional)"
            },{
                "alias": "sportsbars",
                "title": "Sports Bars"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.6624553,
            "longitude": -80.2670101
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "13889 Wellington Trace",
            "address2": "Ste A20",
            "address3": null,
            "city": "Wellington",
            "zip_code": "33414",
            "country": "US",
            "state": "FL",
            "display_address": [
                "13889 Wellington Trace",
                "Ste A20",
                "Wellington, FL 33414"
            ]
        },
        "phone": "+15614271997",
        "display_phone": "(561) 427-1997",
        "distance": 12127.689167945324
    },{
        "id": "0rzaXNCJ_cT9oz6NQjC4rQ",
        "alias": "ali-baba-cafe-and-hookah-lounge-boynton-beach-7",
        "name": "Ali Baba Cafe & Hookah Lounge",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/XmfsJbQFIr7YQRywIgYEmQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/ali-baba-cafe-and-hookah-lounge-boynton-beach-7?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 32,
        "categories": [
            {
                "alias": "hookah_bars",
                "title": "Hookah Bars"
            },{
                "alias": "lounges",
                "title": "Lounges"
            },{
                "alias": "venues",
                "title": "Venues & Event Spaces"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 26.536572,
            "longitude": -80.091687
        },
        "transactions": [
            "delivery",
            "pickup"
        ],
        "price": "$$",
        "location": {
            "address1": "901 N Congress Ave",
            "address2": "Ste D107",
            "address3": "",
            "city": "Boynton Beach",
            "zip_code": "33426",
            "country": "US",
            "state": "FL",
            "display_address": [
                "901 N Congress Ave",
                "Ste D107",
                "Boynton Beach, FL 33426"
            ]
        },
        "phone": "+15618066296",
        "display_phone": "(561) 806-6296",
        "distance": 10445.147384577764
    },{
        "id": "ODEyQsSNl26ud1icQy-akQ",
        "alias": "eagle-grill-greenacres-2",
        "name": "Eagle Grill",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/vHDLdeGov8dw7x44el95iA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/eagle-grill-greenacres-2?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 175,
        "categories": [
            {
                "alias": "seafood",
                "title": "Seafood"
            },{
                "alias": "cajun",
                "title": "Cajun/Creole"
            },{
                "alias": "bars",
                "title": "Bars"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.609197,
            "longitude": -80.146079
        },
        "transactions": [
            "delivery",
            "pickup"
        ],
        "price": "$$",
        "location": {
            "address1": "4636 S Jog Rd",
            "address2": "",
            "address3": "",
            "city": "Greenacres",
            "zip_code": "33467",
            "country": "US",
            "state": "FL",
            "display_address": [
                "4636 S Jog Rd",
                "Greenacres, FL 33467"
            ]
        },
        "phone": "+15619640900",
        "display_phone": "(561) 964-0900",
        "distance": 3280.508212230941
    },{
        "id": "MiQsq0JlWuaHIML-ny7kHg",
        "alias": "bonefish-grill-lake-worth",
        "name": "Bonefish Grill",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/96tGTtsMPJYl5TnDm8BH6w/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/bonefish-grill-lake-worth?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 134,
        "categories": [
            {
                "alias": "seafood",
                "title": "Seafood"
            },{
                "alias": "newamerican",
                "title": "American (New)"
            },{
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.619348,
            "longitude": -80.203056
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "9897 Lake Worth Rd",
            "address2": "",
            "address3": "",
            "city": "Lake Worth",
            "zip_code": "33467",
            "country": "US",
            "state": "FL",
            "display_address": [
                "9897 Lake Worth Rd",
                "Lake Worth, FL 33467"
            ]
        },
        "phone": "+15619652663",
        "display_phone": "(561) 965-2663",
        "distance": 3928.347758386702
    },{
        "id": "cLQwj3WilmobrjH9wLvQOw",
        "alias": "the-beauty-and-the-beeeef-wellington",
        "name": "The Beauty and The Beeeef",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/AClxVqveRr5yw2cwszrPfA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/the-beauty-and-the-beeeef-wellington?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 212,
        "categories": [
            {
                "alias": "burgers",
                "title": "Burgers"
            },{
                "alias": "newamerican",
                "title": "American (New)"
            },{
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.645403,
            "longitude": -80.20786
        },
        "transactions": [
            "delivery",
            "pickup"
        ],
        "price": "$$",
        "location": {
            "address1": "10300 Forest Hill Blvd",
            "address2": "Ste 239",
            "address3": "",
            "city": "Wellington",
            "zip_code": "33414",
            "country": "US",
            "state": "FL",
            "display_address": [
                "10300 Forest Hill Blvd",
                "Ste 239",
                "Wellington, FL 33414"
            ]
        },
        "phone": "+15616124511",
        "display_phone": "(561) 612-4511",
        "distance": 6530.406112206478
    },{
        "id": "we-nPde5Mws1-pp8YbV2Hw",
        "alias": "asador-patagonia-royal-palm-beach",
        "name": "Asador Patagonia",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/W_FhmhcTAprldjL4--VhUQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/asador-patagonia-royal-palm-beach?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 45,
        "categories": [
            {
                "alias": "argentine",
                "title": "Argentine"
            },{
                "alias": "tikibars",
                "title": "Tiki Bars"
            },{
                "alias": "steak",
                "title": "Steakhouses"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 26.68336,
            "longitude": -80.231832
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "675 Royal Palm Beach Blvd",
            "address2": "",
            "address3": "",
            "city": "Royal Palm Beach",
            "zip_code": "33411",
            "country": "US",
            "state": "FL",
            "display_address": [
                "675 Royal Palm Beach Blvd",
                "Royal Palm Beach, FL 33411"
            ]
        },
        "phone": "+15616519477",
        "display_phone": "(561) 651-9477",
        "distance": 11376.572789451124
    },{
        "id": "RGs0qo2CPGh15-CZ6HC9BA",
        "alias": "bonefish-macs-sports-grille-wellington",
        "name": "Bonefish Mac's Sports Grille",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/3WB7gUMv_zhY65zwKoHnmQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/bonefish-macs-sports-grille-wellington?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 179,
        "categories": [
            {
                "alias": "seafood",
                "title": "Seafood"
            },{
                "alias": "tradamerican",
                "title": "American (Traditional)"
            },{
                "alias": "sportsbars",
                "title": "Sports Bars"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.65091,
            "longitude": -80.21899
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "10880 Forest Hill Blvd",
            "address2": "",
            "address3": "",
            "city": "Wellington",
            "zip_code": "33414",
            "country": "US",
            "state": "FL",
            "display_address": [
                "10880 Forest Hill Blvd",
                "Wellington, FL 33414"
            ]
        },
        "phone": "+15617986227",
        "display_phone": "(561) 798-6227",
        "distance": 7638.361119830116
    },{
        "id": "uDLElE2G5YpQzEGzkJ9tpg",
        "alias": "bar-louie-boynton-beach-3",
        "name": "Bar Louie",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/4tyNwBSyzE67dAKS93eTSg/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/bar-louie-boynton-beach-3?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 315,
        "categories": [
            {
                "alias": "newamerican",
                "title": "American (New)"
            },{
                "alias": "bars",
                "title": "Bars"
            },{
                "alias": "gastropubs",
                "title": "Gastropubs"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.5455175253638,
            "longitude": -80.0882732980781
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "1500 Gateway Blvd",
            "address2": "Ste 100",
            "address3": "",
            "city": "Boynton Beach",
            "zip_code": "33426",
            "country": "US",
            "state": "FL",
            "display_address": [
                "1500 Gateway Blvd",
                "Ste 100",
                "Boynton Beach, FL 33426"
            ]
        },
        "phone": "+15618530090",
        "display_phone": "(561) 853-0090",
        "distance": 10192.562322068801
    },{
        "id": "WCaWUMhiKqsc4qtBSThEUw",
        "alias": "brass-monkey-tavern-lake-worth",
        "name": "Brass Monkey Tavern",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/kBN4H7H2DPYwU8VLpSiOpA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/brass-monkey-tavern-lake-worth?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 77,
        "categories": [
            {
                "alias": "sportsbars",
                "title": "Sports Bars"
            },{
                "alias": "tradamerican",
                "title": "American (Traditional)"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.61862,
            "longitude": -80.16974
        },
        "transactions": [
            "delivery",
            "pickup"
        ],
        "price": "$$",
        "location": {
            "address1": "7781 Lake Worth Rd",
            "address2": null,
            "address3": null,
            "city": "Lake Worth",
            "zip_code": "33467",
            "country": "US",
            "state": "FL",
            "display_address": [
                "7781 Lake Worth Rd",
                "Lake Worth, FL 33467"
            ]
        },
        "phone": "+15619689559",
        "display_phone": "(561) 968-9559",
        "distance": 2717.03299274531
    },{
        "id": "52QujdUomOzpW9zgK14gkQ",
        "alias": "elmos-rock-bar-and-grill-boynton-beach",
        "name": "Elmo's Rock Bar & Grill",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/DqljEDAaPJeGqX9FV_lerw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/elmos-rock-bar-and-grill-boynton-beach?adjust_creative=RdWj-yTflu7GcvUrdnUfWQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=RdWj-yTflu7GcvUrdnUfWQ",
        "review_count": 39,
        "categories": [
            {
                "alias": "bars",
                "title": "Bars"
            },{
                "alias": "musicvenues",
                "title": "Music Venues"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 26.53104,
            "longitude": -80.12092
        },
        "transactions": [],
        "price": "$",
        "location": {
            "address1": "9770 S Military Trl",
            "address2": "Ste B2",
            "address3": "",
            "city": "Boynton Beach",
            "zip_code": "33436",
            "country": "US",
            "state": "FL",
            "display_address": [
                "9770 S Military Trl",
                "Ste B2",
                "Boynton Beach, FL 33436"
            ]
        },
        "phone": "+15612923359",
        "display_phone": "(561) 292-3359",
        "distance": 8886.289109296291
    }

]


    
          let demoObj = { twitter: {
              nightlife: [
              {
                  "id": "6NzbgOQx1onp0q526O55qg",
                  "name": "OAK Bistro & Wine Bar",
                  "count": 14
              }, {
                  "id": "KBObkCcWPvck1n9ShB5DWg",
                  "name": "Due South Brewing",
                  "count": 8
              }, {
                  "id": "8LRYOrf-ZRQJjmh929VzIg",
                  "name": "The Venu Restaurant and Bar",
                  "count": 21
              }, {
                  "id": "QOO0LIBqftW8AYQsbF9Q3g",
                  "name": "McKenna's Place",
                  "count": 11
              }, {
                  "id": "HK_VnPpIzEFZ0iT1xVbx-A",
                  "name": "Iberia Bar & Grill",
                  "count": 16
              }, {
                  "id": "K1JzjCE0JnhZ0ahwwS6MZQ",
                  "name": "The Chill Room",
                  "count": 5
              }, {
                  "id": "bWhgHY7At3T5obS3pORYHw",
                  "name": "JoJo's Raw Bar & Grill",
                  "count": 10
              }, {
                  "id": "0rzaXNCJ_cT9oz6NQjC4rQ",
                  "name": "Ali Baba Cafe & Hookah Lounge",
                  "count": 18
              }, {
                  "id": "B9cbm_4R_H1Bdv-L6K3gDQ",
                  "name": "The Brass Tap",
                  "count": 26
              }, {
                  "id": "ODEyQsSNl26ud1icQy-akQ",
                  "name": "Eagle Grill",
                  "count": 3
              }, {
                  "id": "vt-PoDTSRjUENvUGArxKsw",
                  "name": "Ford's Garage Wellington",
                  "count": 20
              }, {
                  "id": "cLQwj3WilmobrjH9wLvQOw",
                  "name": "The Beauty and The Beeeef",
                  "count": 12
              }, {
                  "id": "uDLElE2G5YpQzEGzkJ9tpg",
                  "name": "Bar Louie",
                  "count": 18
              }, {
                  "id": "we-nPde5Mws1-pp8YbV2Hw",
                  "name": "Asador Patagonia",
                  "count": 38
              }, {
                  "id": "RGs0qo2CPGh15-CZ6HC9BA",
                  "name": "Bonefish Mac's Sports Grille",
                  "count": 44
              }, {
                  "id": "WCaWUMhiKqsc4qtBSThEUw",
                  "name": "Brass Monkey Tavern",
                  "count": 55
              }, {
                  "id": "52QujdUomOzpW9zgK14gkQ",
                  "name": "Elmo's Rock Bar & Grill",
                  "count": 36
              }, {
                  "id": "w_TILSpebOiv2Ma46oLX_w",
                  "name": "Copperpoint Brewing Co",
                  "count": 48
              }, {
                  "id": "6Kw1Rlx44zXsLfBItumCGw",
                  "name": "Kaluz Restaurant",
                  "count": 52
              }, {
                  "id": "l5rYrJlWnvqjV-lY2F2-WQ",
                  "name": "Flanigan's Seafood Bar & Grill",
                  "count": 61
              }]
            }  
          };    
  };
  
	this.getClicks = (req, res) => {
    let nightlife = [];
        
    // check if id exists in nightlife array
    function findId(id) {
      for(let i = 0; i < nightlife.length; i++) {
        if(nightlife[i].id === id) return i;
      }              
      return false;
    };    
		
    Users
			.find({}).select({ 'twitter.nightlife': 1, _id: false})
			.exec((err, results) => {
				if (err) throw err;

        // return restaurant id and total 'going' count for all users
        results.forEach((array, idx) => {
          let arr = array.twitter.nightlife;
          if(arr.length) {
            for(let i = 0; i < arr.length; i++) {
              let item = arr[i];
              if(item.count) {
                let index = findId(item.id);
                if(!index) {
                   nightlife[index].count += item.count;
                } else {
                   nightlife.push({
                     'id'    : item.id,
                     'count' : item.count
                   }); 
                }
              }
            }
          }
        });

		res.json(nightlife);
		}); 
  }; // getClicks

  // for authenticated users to add or remove rsvp  
	this.addClick = (req, res) => {
  
		Users
			.findOne({'twitter.id': req.body.userId})
      .select({'twitter.nightlife': 1})
			.exec((err, result) => {
					if (err) throw err;      
          
          if(result) {
            let nightlife = result.twitter.nightlife,
                barCount = {},
                barExists = false;
            for(var i = 0; i < nightlife.length; i++) {
                     
               if(nightlife[i].id === req.body.id ) {
                 nightlife[i].count = nightlife[i].count === 1 ? 0 : 1;
                 barCount.id        = nightlife[i].id;                
                 barCount.count     = nightlife[i].count === 0 ? -1 : 1;
                 barExists          = true;
               }
            };                      
            
            if(!barExists) {
              let obj = { 
                id    : req.body.id,
                name  : req.body.name,
                count : 1
                };
              
              // return obj to db and send barCount to UI
              result.twitter.nightlife.push(obj); 
              barCount = { id    : req.body.id, 
                           count : 1
                         };
            }
            
            result.save( err => {
              if(err) throw err;
            });            
            
            res.json(barCount);
         };

			});
	};
	
	// queries the Yelp api and stores session data and location
	this.getNightlife = (req, res) => {
		 var Client = yelp.client(process.env.API_KEY);
     var request = {
        		term    : 'bars',
    	    	location: req.query.location,
            sort_by : 'rating',
            limit   : 20,
        	};
     
     //if user authenticates, save location to user
     if(req.body.user) { 
       Users.findOneAndUpdate({ 
            'twitter.id' : req.body.user
            }, {
            'twitter.previousSession' : req.query.location
            }, {
            new   : true, 
            upsert: true
            })
          	.exec((err, success) => {
             	if(err) return console.error(err);
        	  });    
     };
        
      // Yelp Fusion api	
     Client.search(request).then(response => {
       var results = response.jsonBody.businesses,
           json    = JSON.stringify(results, null, 4);
          
           return res.json(json);
     }).catch(error => {
       	return res.json(error);
    }); 
	};
	
	// returns the user location and cached search results after twitter log in
	this.userLocation = (req, res) => {
   
		Users.find({_id: req.user._id})
			.exec((err, user) => {
				if(err) throw err;       
       
        return res.json(user[0]);     				
			});
	}; 

};

module.exports = ClickHandler;





// 'use strict';

// var Users = require('../models/users.js');
// var yelp = require('yelp-fusion');

// function ClickHandler () {
//   // resets RSVP's after 2am;
//   const resetRSVP = () => {
//     if(new Date().getHours() === 2) {
//       Users
//         .find({}).select({ 'twitter.nightlife': 1, _id: false})
//         .exec((err, results) => {
//           if (err) throw err; 
      
//           results.forEach( (array, idx) => {
//             let arr = array.twitter.nightlife;
//             if(arr.length > 0) {       
//               for(var i = 0; i < arr.length; i++) {
//                 var item = arr[i];
//                 if(item.count > 0) {
//                   item.count = 0;
//                 }; 
//               }; 
//             };        
//           }); // forEach()
//         results.save();
//       }); 
//     };  
//   };
	
//   // interval checks time once an hour
//   //setInterval(resetRSVP, 3600000);
  
// 	this.getClicks = (req, res) => {
//     let nightlife = [];
		
//     Users
// 			.find({}).select({ 'twitter.nightlife': 1, _id: false})
// 			.exec((err, results) => {
// 				if (err) { throw err; }
           
//         results.forEach((array, idx) => {
//           let arr = array.twitter.nightlife;
//           if(arr.length > 0) {       
//             for(var i = 0; i < arr.length; i++) {
//               var item = arr[i];
             
//               if(item.count > 0) {
//                 nightlife.push(item.id);
//               } 
//             } 
//           }        
//         });// forEach()
     
// 			res.json(nightlife);
// 			}); // Users.exec
// 	}; // getClicks

// 	this.addClick = (req, res) => {
// 		Users
// 			.findOne({'_id': req.body.userId})
//       .select({'twitter.nightlife': 1})
// 			.exec((err, result) => {
// 					if (err) throw err; 
//           let barCount = {}        
          
//           if(result) {
//             let nightlife = result.twitter.nightlife;
//             let found = 1;
//             for(var i = 0; i < nightlife.length; i++) {
//                if(nightlife[i].id === req.body.id ) {
//                  barCount.id = nightlife[i].id;
//                  nightlife[i].count === 1 ? nightlife[i].count = 0 
//                                           : nightlife[i].count = 1;
                 
//                  barCount.count = nightlife[i].count;
//                  found = 0;
//                }
//             };                      
            
//             if(found) {
//               let obj = { 
//                 id    : req.body.id,
//                 name  : req.body.name,
//                 count : 1
//                 };
//               result.twitter.nightlife.push(obj);
//               barCount = { id : req.body.id, count: 1};
//             }
            
//             result.save(err => {
//               if(err) throw err;
//             });            
            
//             res.json(barCount);
//          };

// 			});
// 	};
	
// 	// queries the Yelp api and stores session data and location
// 	this.getNightlife = (req, res) => {
//     //console.log("getNightLife", req.body, req.params, req.query)
// 		 var Client = yelp.client(process.env.API_KEY);
//      var request = {
//         		term    : 'bars',
//     	    	location: req.query.location,
//             sort_by : 'rating',
//             limit   : 20,
//         	};
     
//       // if user authenticates save location to user
//      if(!req.body.user) {
//        //console.log('updated locale session')
//        Users.findOneAndUpdate({
//              _id: '5c59ed1e9148306b65d5a1a3'
//             }, {
//              session: req.query.location
//             }, {
//              upsert: true,
//              new   : true
//             })
//             .exec( (err, logged) => {
//               if(err) throw err; 
//             });
//      } else {
//        //console.log('updated user session')
//        Users.findOneAndUpdate({ 
//             '_id' : req.body.user
//             }, {
//             'twitter.previousSession' : req.query.location
//             }, {
//             new   : true, 
//             upsert: true
//             })
//           	.exec((err, success) => {
//              	if(err) return console.error(err);
//         	  });    
//      };
        
//       // Yelp Fusion api	
//      Client.search(request).then(response => {
//        var results = response.jsonBody.businesses,
//            json    = JSON.stringify(results, null, 4);

//            res.json(json);
//      }).catch(error => {
//        	res.end("We apologize, there has been an error processing your request. Error message: " + error);
//     }); 
// 	};
	
// 	// returns the user location and cached search results after twitter log in
// 	this.userLocation = (req, res) => {
//     console.log("userLocation")
// 		Users.find({_id: req.user._id})
// 			.exec((err, user) => {
// 				if(err) throw err;       
      
// 				res.json(user);
// 			});
// 	}; 

// };

// module.exports = ClickHandler;