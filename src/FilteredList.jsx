import React, { Component } from 'react';

import List from './List';


class FilteredList extends Component {
 constructor(props) {
   super(props);
   this.sortedBy = this.sortedBy.bind(this);

   
   this.state = {
     search: "",
     filter: "Filter By",
     filterByTitle: "Filter By",
     sortByTitle: "Sort By",
     sortByDropdown: false

   };
 }

      // Sets the state whenever the user types on the search bar
      onSearch = (event) => {
        this.setState({search: event.target.value.trim().toLowerCase()});
      }

      filterItem = (item) => {
        // Checks if the current search term is contained in this item
        return item.name.toLowerCase().search(this.state.search) !== -1 && ((item.value2 === this.state.filter) || (this.state.filter === "Filter By"));
      }

      selectedFilter = (eventKey, event) => {
        this.setState({filter: eventKey, filterByTitle: eventKey});
      }

      // sortedBy = (eventKey, event) => {
      //   if (eventKey === "S->T") {
      //     this.props.items.sort(function(a, b) {
      //       return parseFloat(a.value1) - parseFloat(b.value1);
      //     });
      //   } else if (eventKey === "T->S") {
      //     this.props.items.sort(function(a, b) {
      //       return parseFloat(b.value1) - parseFloat(a.value1);
      //     });
      //   } else {
      //     this.props.items.sort(function(a, b) {
      //       return parseFloat(a.imageURL.replace( /[^\d.]/g, '' )) - parseFloat(b.imageURL.replace( /[^\d.]/g, '' ));
      //     });        
      //   }

      //   this.setState({sortByTitle: eventKey});
      // }

      sortedBy(event) {
        event.persist()
        const { _, value } = event.target;

        this.setState({sortByTitle: value});
       
      }  

      render() {
        var filteredList = this.props.items.filter(this.filterItem);


        if (this.state.sortByTitle != null) {
          console.log(this.state.sortByTitle)

          var lebron = this.state.sortByTitle


          filteredList.sort(function(a, b) {
              if (lebron == "next_transit_start") {
                var a = new Date(a[lebron])
                var b = new Date(b[lebron])

                if (a < b) {
                  return -1;
                } else {
                  return 1;
                }

                
              }
              else if (a[lebron] < b[lebron]) {
                return -1;
              } else {
                return 1;
              }
          });
        }

       return (
        <div className="filter-list">

        <div style={{opacity: ".88", "background-image": "linear-gradient(-90deg, #5433FF, #20BDFF)" ,height: "160px", width: "100%", display: "block", float:"left", position:"fixed"}}>
          <h1 style={{color: "white"}}>Next Exoplanet Transits</h1>
          <input type="text" placeholder="Search Exoplanet" onChange={this.onSearch} />
          <p style={{color: "white"}}>Displaying {filteredList.length} of 1736 total exoplanets</p>

          <p style={{"margin-top": "10px", "font-size": "15 px"}}>Sort By</p>
           <input onChange={this.sortedBy} type="radio" name="editList" value="name"/>
          
          <label ><i>Planet Name</i></label>
          <input onChange={this.sortedBy} type="radio" name="editList" value="planet_radius" />
          <label ><i>Planet Radius</i></label>
          <input onChange={this.sortedBy} type="radio" name="editList" value="next_transit_start"/>
          <label ><i>Next Transit Date</i></label>
        </div>

      

        <div style={{width: "100%", margin: "160px 2px 0 0", display: "block", float:"left"}}>
          <List items={filteredList} /> </div>
        </div>
        );
     }
   }
   export default FilteredList;