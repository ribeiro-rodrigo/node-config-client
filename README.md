# Node Config Client
NodeJs version of the Spring Config Client project. Node Config Client allows a NodeJs application to take immediate advantage of the Spring Config Server.<br/>

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
