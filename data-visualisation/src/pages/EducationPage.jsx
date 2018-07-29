import React from "react";
import Card from "@material-ui/core/Card";

import {JSONresponeSales} from "../data";

import {withRouter} from "react-router";

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

class EducationPageRouter extends React.Component{

constructor(props) {
	super(props);
	this.state = {
	sales: []
};

}

loadSales() {

	const input = {JSONresponeSales};
	const arrayOfSalesAndDates = input["JSONresponeSales"];

	const buckets = arrayOfSalesAndDates.map((index) => {
	return {
		sales: index["sales_over_time"].buckets
	};

})

const carData = buckets[0]["sales"].map((index) => {
	return {
		carDates: index.key_as_string,
		carSales: index.total_sales["value"]
	};
})

const phoneData = buckets[1]["sales"].map((index) => {
	return {
		phoneDates: index.key_as_string,
		phoneSales: index.total_sales["value"]
	};
})

const umbrellaData = buckets[2]["sales"].map((index) => {
	return {
		umbrellaDates: index.key_as_string,
		umbrellaSales: index.total_sales["value"]
	}; 
})

var format = function(input) {
	var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
	if (!input || !input.match(pattern)) {
		return null;
	}
	return input.replace(pattern, '$3/$2/$1');
};


var total = [];
for (var i = 0; i < carData.length; i++) {
	if (carData[i].carDates === phoneData[i].phoneDates) {
		total[i] = {};
		total[i].date = format(carData[i].carDates);
		total[i].CarSales = carData[i].carSales;
		total[i].PhoneSales = phoneData[i].phoneSales;

		total[i].umbrellaSales = 0;
		for (var j = 0; j < umbrellaData.length; j++) {
			if (carData[i].carDates === umbrellaData[j].umbrellaDates) {
				total[i].UmbrellaSales = total[i].umbrellaSales + umbrellaData[j].umbrellaSales;
			}
			else {
			total[i].UmbrellaSales = 0;
			}	
		}
	} 
}

this.state = {sales: total}

} 


render() {

let titleStyle = {
	fontWeight: "400",
	fontSize: "40px"
};

let yAxisStyle = {
	fontWeight: "300",
	fontSize: "25px",
	textAnchor: 'middle',
};


let xAxisStyle = {
	fontWeight: "300",
	fontSize: "25px",
	textAnchor: 'bottom'
};

	return (
	<Card>
		<div>{this.loadSales()}</div>

		<div class="a" style={titleStyle} align="center"> Sales of Cars, Phones and Umbrellas in 2018 </div>
		
		<LineChart width={1150} height={500} data={this.state.sales}
		margin={{ top: 5, right: 70, left: 20, bottom: 30 }}>
		<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="date">
				<Label value='Date' position='bottom' style={xAxisStyle}/>
			</XAxis>

			<YAxis dataKey="CarSales">
				<Label angle={-90} value='Sale Number' position='insideLeft' style={yAxisStyle} margin={{left: 100, top: 200}} />
			</YAxis>

			<Tooltip />
			<Legend verticalAlign="center" height={36}/>
			<Line type="monotone" dataKey="CarSales" stroke="#B20000" />
			<Line type="monotone" dataKey="PhoneSales" stroke="#A0A000" />
			<Line type="monotone" dataKey="UmbrellaSales" stroke="#005900" />
		</LineChart>

	</Card>
	)
}
}

const EducationPage = withRouter(EducationPageRouter);

export default (EducationPage);