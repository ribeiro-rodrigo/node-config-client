# Node Config Client
NodeJs version of the Spring Config Client project. 

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Node Config Client allows a NodeJs application to take immediate advantage of the Spring Config Server.<br/>

Spring Cloud Config project url: https://cloud.spring.io/spring-cloud-config/

# Installation
```
npm install node-config-client --save
```
# Usage 
```javascript 

let configClient = require('node-config-client');

configClient.load({
	name:'application_name', // spring application name
	profiles:['prod','test','dev'], // spring profiles    
	label:'master', // git branch
	location:'localhost:8888', // spring cloud server address

}).then(config => {
  // getting configuration
	console.log(`mysql host: ${config.get('mysql.frota.host')}`);
	console.log(`mysql username: ${config.get('mysql.username')}`);
	console.log(`mysql password: ${config.get('mysql.password')}`);
	console.log(`mysql database: ${config.get('mysql.database')}`);
}).catch(erro => console.log(erro)); 

```
[npm-image]: https://img.shields.io/npm/v/node-config-client.svg
[npm-url]: https://npmjs.org/package/node-config-client
[downloads-image]: https://img.shields.io/npm/dm/node-config-client.svg
[downloads-url]: https://npmcharts.com/compare/node-config-client?minimal=true
