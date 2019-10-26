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
  
  // return all rsvps for users
	this.getClicks = (req, res) => {
    console.log('server, getClicks')
    let nightlife = [];
    // check if id exists in nightlife array
    function findId(id) {
      for(let i = 0; i < nightlife.length; i++) {
        if(nightlife[i].id === id) return i;
      }   
      return false;
    };  
	
    Users
		  .find({}).select({ 'twitter.nightlife': 1})
			.exec((err, results) => {
				if (err) throw err;
        
        // return restaurant id and total 'going' count for all users
        results.forEach((array, idx) => {
          let arr = array.twitter.nightlife;
        
          if(arr.length) {
            for(let i = 0; i < arr.length; i++) {           
              let item = arr[i];
              if(item.count) {
                let index = nightlife.length ? findId(item.id) : false;
                if(index !== false) {
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
    console.log('server addClicks')
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
              barCount = { 
                id    : req.body.id, 
                count : 1
              };
            }
            
            result.save( err => {
              if(err) throw err;
              res.json(barCount);
            });            
         };
			});
	};
	
	// queries the Yelp api and stores session data and location
	this.getNightlife = (req, res) => {
    console.log('server getNightLife')
		 let Client = yelp.client(process.env.API_KEY),
         request = {
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
           res.json(json);
     }).catch(error => {
       	  res.json(error);
    }); 
	};
	
	// returns the user location and cached search results after twitter log in
	this.userLocation = (req, res) => {
   console.log('server userLocation')
		Users.find({_id: req.user._id})
			.exec((err, user) => {
				if(err) throw err;       
       
        return res.json(user[0]);     				
			});
	}; 

};

module.exports = ClickHandler;