import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import '../public/css/style.css';
import noImage from '../public/img/NoProductImage_300.jpg';

// Main Component
class App extends Component {
    constructor(props) {
        super(props);
        this.changeHandler  = this.changeHandler.bind(this);
        this.twitterHandler = this.twitterHandler.bind(this);
        this.state = {
          value  : "",
          userId : ""
        }
    }

    componentDidMount() {
        const regex    = RegExp('^/login/.*'),
              loggedIn = regex.test(window.location.pathname);
       
        // this.setState({
        //   load : document.getElementById('load'),
        //   input: document.getElementById('location-input')
        // })
        this.load  = document.getElementById('load');
        this.input = document.getElementById('location-input');
        this.searchInput = document.getElementById('search'),

        this.searchInput.addEventListener('click', (evt)  => {
            evt.preventDefault();

            //let location = document.getElementById("location").elements[1].value;
            let location = this.state.value;
            // if(this.bars.length) this.bars = [];     
            !location ? this.getLocation( geoLocation => this.yelpHandler(geoLocation)) 
                      : this.yelpHandler(location);            
        });
      
        // checks if user is logged in /  returns previous session
        if( loggedIn ) {     
          ajax.ready(ajax.request('GET', '/user/location', {}, (req) => {

             let user        = req.twitter,
                 location    = user.previousSession || sessionStorage.getItem('current');     
                 //this.setState({userId : user.id});
                 this.userId = user.id; 
             return this.yelpHandler(location || user.location);
          }));
        } else {
          //this.setState({userId : ''});
          this.userId = "";
        }  

    }
  
    componentDidUpdate(prevProps, prevState) {
        //console.log('cDU', prevProps, prevState)
    }

    componentWillUnmount(a, b) {
      //console.log('cWU', a, b)
      console.log('cWU', this.bars)
      this.searchInput.removeEventListener('click');
    }
    
    changeHandler(evt) {
        evt.preventDefault();
        
        this.setState({
            value: evt.target.value
          });
    }  

    twitterHandler(evt) {
        evt.preventDefault();
        window.location.href = '/api/auth/twitter';     
    }

    yelpHandler(locale) {
        this.load.classList.add('loading');  
      
        if(typeof locale === 'object') locale = locale.latitude + '%20' + locale.longitude ;
                                     
        let path = '/businesses/search?term=bars&location=' + locale;        
        let data = !this.userId ? {} : {user: this.userId};
       
        ajax.ready(ajax.request("POST", path, data, (res) => {
            let obj = JSON.parse(res);
            if(obj.error) return alert(res);

            ReactDOM.render(
                <SearchResults 
                    data={obj}
                    load={this.load}
                    input={this.input}
                    searchLocation={locale} />,
                    document.getElementById('main')
            );
            //let zip = typeof locale === 'string'? locale : '';   
            this.loadBttnEvents();                
        }));
    }

    loadBttnEvents() {
        let twitterBttn = document.getElementsByClassName('bttn'),
            bttnLength  = twitterBttn.length,
            path        = '/rsvp/clicks';

        ajax.ready(ajax.request("GET", path, {}, (clicks) => {
         
            clicks.forEach( item => {
                let bttnId = document.getElementById(item.id);
              
                if(bttnId) {
                  bttnId.innerHTML = item.count;
                };    
            });        
        }));          
        
        for(let i = 0; i < bttnLength; i++) {                  
            twitterBttn[i].addEventListener('click', function(event) {
                //event.preventDefault();
                
                if(!this.userId) return alert('You have to be logged in to perform this action!');
                
                //let index = (this.parentNode.parentNode.id).slice(13);// id (number) of businesscard
                // let index = this.getAttribute('data-id');
                // this.bars[index].userId = this.userId;
              
                let barId = this.firstElementChild.getAttribute('id'),
                    obj   = {
                      id     : barId,
                      name   : this.getAttribute('data-name'),
                      userId : this.userId
                    };
                
                ajax.ready(ajax.request("POST", path, this.bars[index], (bar) => {
                let going = document.getElementById(bar.id),            
                    sum   = bar.count === 0 ?  -1 :  1;

                going.innerHTML = (parseInt(going.innerHTML, 10) + sum);            
                }))

            }); 
        }; // for(loop)         
    }

    getLocation(next) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          
          next({
            latitude : position.coords.latitude,
            longitude: position.coords.longitude
          });
           
        }, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
     };
  
     const showError = (error) => {
       switch(error.code) {
         case error.PERMISSION_DENIED:
           console.log("User denied the request for Geolocation.");
           break;
         case error.POSITION_UNAVAILABLE:
           console.log("Location information is unavailable.");
           break;
         case error.TIMEOUT:
           console.log("The request to get user location timed out.");
           break;
         case error.UNKNOWN_ERROR:
           console.log("An unknown error occurred.");
           break;
       };
     };
    }      

    render() {
        return (
            <ErrorBoundary>
                <div id ="heading" className="container">
                    <h1>Night Owls</h1>
                    <p>The only app that lets you know where the party's at!</p>
                    <form id="location">
                        <div className="input-group">
                            <div className="input-group-btn">
                                <button id="login" 
                                        className="btn btn-default" 
                                        type="button" 
                                        title='Twitter'
                                        onClick={this.twitterHandler}>
                                    <i className="fa fa-twitter"></i>
                                </button>
                            </div>
                            <input id="location-input" 
                                   className="form-control"  
                                   type="text" 
                                   placeholder="Search location" 
                                   value={this.state.value}
                                   onChange={this.changeHandler} 
                                   required/>
                            <div className="input-group-btn">
                                <button id="search" 
                                        className="btn btn-default" 
                                        type="submit">    
                                    <span className="glyphicon glyphicon-search" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
                <div id="main"/>
                <div id="load"/>
                <br />
                <p id="credit">Powered by Yelp&copy; Fusion | jDub's Code Studio&copy; 2019 | font courtesy of <a href="https://www.fontspring.com/">Fontspring</a></p>
            </ErrorBoundary>
        )
    }
}

// Error class React Component
class ErrorBoundary extends Component {
		
		constructor(props) {
			super(props);
			this.state = { hasError: false };
		}
    
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
		
    componentDidCatch(error, info) {
			// Display fallback UI
			this.setState({ hasError: true });
			// log the error to console 
			console.log(error, info);   
		}
		render() {
			if (this.state.hasError) {
				// You can render any custom fallback UI
				return <h3>Um...Something went wrong.</h3>;
			}
			return this.props.children;
		};
}; 

// Used with BrowserRouter for React Paths
class Main extends Component {
    render() {
      return (
        <BrowserRouter>
          <Route exact path='/' strict component={App} />
          <Route exact path='/login/:user' component={App} />
        </BrowserRouter>
        );
    }
  }

// build the search results UI
const SearchResults = (props) => {
    //const input = document.getElementById('location-input');
    let obj    = props.data,
        locale = props.searchLocation,
        dist   = obj[obj.length-1].distance,
        input   = props.input,
        load   = props.load,
        city;

    const costDescription = {
          0 : 'Unavailable',
          1 : 'Inexpensive',
          2 : 'Moderate',
          3 : 'Pricey',
          4 : 'Ultra High End'
          };
    
    const data = function(arr) {
           
        if(load.classList.value === 'loading') load.classList.remove('loading');
        
        const results = arr.map( (key, i) => {

          let price = obj[i].price;
          if(!price) price = "";

              // find closest zip code to coordinates
          if(dist > obj[i].distance) {
            dist = obj[i].distance;
            city = obj[i].location.city;       
          } else {
            city = obj[obj.length-1].location.city;
          }

          // write value of city or zip code to search bar
          if(i === obj.length -1) {
            sessionStorage.setItem('current', input.value || city);
            input.placeholder = !input.value ? city : locale, input.value = '';   
          }  


          // no image will revert to 'no image available' icon
          if(!obj[i].image_url) obj[i].image_url = noImage;         
            
          let businesscard = 'businesscard_' + i;
          return (
            <div id = {businesscard} className = 'container' key = {i}>
              <h2 className = 'smallScreen' title = 'Visit Website'>
                <a href   = {obj[i].url}
                   target ='_blank'
                   rel    ='external'
                   dangerouslySetInnerHTML = {{__html: obj[i].name}} />
              </h2>
              <div className='img-holder'>
                <img className ='img-thumbnail' 
                           alt ='img-url'
                           src ={obj[i].image_url} />
                <br />
                <button className = 'bttn'
                            title = 'Let people know you are going by pushing the button'
                             type = 'button'
                            value = 'submit'
                          data-id = {i} >Going <span id={obj[i].id} className = 'badge'>0</span>
                </button>
              </div>
              <div className='business'>
                <h2 className = 'avgScreen' title = 'Visit Website'>
                  <a href   = {obj[i].url}
                     target = '_blank'
                     rel    = 'external'
                     dangerouslySetInnerHTML = {{__html: obj[i].name}} />
                </h2>
                <p className = 'address'>
                  <a href   = {'https://www.yelp.com/map/' + obj[i].alias}
                     target = '_blank'
                     title  = 'Get Directions'
                     rel    = 'external'
                     dangerouslySetInnerHTML = {{__html:  
                         obj[i].location.address1 + `.<br>` 
                         + obj[i].location.city + `, ` 
                         + obj[i].location.state + `. ` 
                         + obj[i].location.zip_code }} />
                  <br />
                  <span className = 'phone'>Telephone:
                    <a href   = {obj[i].phone}
                       target = '_blank'
                       title  = 'Call Number'
                       dangerouslySetInnerHTML={
                             {__html : ` ` + obj[i].display_phone}
                           } />
                  </span>
                  <br />
                  <span className = 'rate'
                        dangerouslySetInnerHTML = {
                    {__html : `Price: ` + price + ` `  + costDescription[price.length]}
                  } />
                  <br />
                  <span dangerouslySetInnerHTML = {
                    {__html : `Rating: `+ obj[i].rating}
                  } />
                </p>
              </div>
            </div>
          )
        });
        
        return (
            <div>{results}</div>
        );        
    }

    return (
        <div>
            {data(obj)}
        </div>
    );
 
}

// Configure ajax call
const ajax = {
  ready: function ready(fn) {
        
    if (typeof fn !== 'function') return;
    if (document.readyState === 'complete') return fn();

    document.addEventListener('DOMContentLoaded', fn, false);
  },
  request: function ajaxRequest(method, path, data, callback) {
    let xmlhttp = new XMLHttpRequest(),
        url     = '../api' + path,        
        params  = typeof data === 'string' ? data 
                  : Object.keys(data).map( k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) ).join('&');  

    xmlhttp.open(method, url, true);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          let res = JSON.parse(xmlhttp.response);
              
          if(res.statusCode === 400) return alert(res.response.body)
             
          callback(res);
        }
    };

    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xmlhttp.send(params);
    return xmlhttp;
  }
};


ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);


function maintenanceUpdate(obj, event) {
  obj.addEventListener(event, () => {
    setTimeout(() =>{
      confirm("This app is being updated, some of the features not might work correctly.")
    }, 2000)
  });
}

// if(window.addEventListener) {
//   maintenanceUpdate(window, 'load');
// } else {
//   maintenanceUpdate(document, 'DOMContentedLoaded');  
// }