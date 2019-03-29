import React, { Component } from 'react';


class ListItem extends Component {
	
	render() {
		var next_start = new Date(this.props.item.next_transit_start);
		var now = new Date();

		while(next_start < now) {
			next_start = new Date(next_start.getTime() + 86400 * this.props.item.duration);
		}

		var next_end = new Date(next_start.getTime() + 86400 * 1000 * this.props.item.duration);
		let st = next_start.toLocaleString()
		let end = next_end.toLocaleString()

		let dist = (this.props.item.stellar_distance * 3.26156);
		dist = dist.toFixed(3)


		return <li key={this.props.item.key}>
		<div  className="fullItem"> 
		<p className="itemTitle"><i>{this.props.item.name}</i></p>
		<p style={{margin: "0 10px"}}> Planet Radius(R jup): {this.props.item.planet_radius.toFixed(3)}</p>
			
		<b style={{margin: "0 2px"}}>Discovery</b> <p style={{margin: "0 10px"}}>  At {this.props.item.facility_discovered} via {this.props.item.discovery_method} </p>
		<b style={{margin: "0 2px"}}>Next Transit</b> <p style={{margin: "0 10px"}}>  <i>{st}</i> to <i>{end}</i> </p>

		<b style={{margin: "0 2px"}}>Star: {this.props.item.star_host_name}</b>
		<p style={{margin: "0 10px"}}> Distance(ly): {dist}</p>	
		<p style={{margin: "0 10px"}}> Stellar Mass(M Sol): {this.props.item.stellar_mass} </p>	
		<p style={{margin: "0 10px"}}> Stellar Radius(R Sol): {this.props.item.stellar_radius}</p>
		</div>
		</li>;
	}
}

export default ListItem;