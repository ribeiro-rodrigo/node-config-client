var httpClient = require('http');
var url = require('url');

function createPropertySources(properties){
    return {
        get(key){
            for(var prop of properties.propertySources){
                var value = prop.source[key];
                if(value !== undefined)
                    return value;
            }
        }
    };
}

function buildURL(location){
    
    location = process.env['NODE_CONFIG_CLIENT_LOCATION'] ? process.env['NODE_CONFIG_CLIENT_LOCATION'] : location;  
    return url.parse('http://'+location);
}

function buildAuth(user){
    user.name = process.env['NODE_CONFIG_CLIENT_USER_NAME'] ? process.env['NODE_CONFIG_CLIENT_USER_NAME'] : user.name;
    user.password = process.env['NODE_CONFIG_CLIENT_USER_PASSWORD'] ? process.env['NODE_CONFIG_CLIENT_USER_PASSWORD'] : user.password;

    return user.name+':'+user.password;
}

function validateConfig(config){
    if(process.env['NODE_CONFIG_CLIENT_NAME'] && !config.name)
        throw new Error('Name field not defined');
    if(!process.env['NODE_CONFIG_CLIENT_PROFILES'] && (!config.profiles || !config.profiles.length))
        config.profiles = ['default'];
    if(!process.env['NODE_CONFIG_CLIENT_LOCATION'] && !config.location)
        throw new Error('Location field not set');
}

function buildPath(applicationName,profiles,label){
    
    applicationName = process.env['NODE_CONFIG_CLIENT_NAME'] ? process.env['NODE_CONFIG_CLIENT_NAME'] : applicationName
    profiles = process.env['NODE_CONFIG_CLIENT_PROFILES'] ? process.env['NODE_CONFIG_CLIENT_PROFILES'] : profiles.join();

    return '/'+applicationName+'/'+profiles+(label ? '/'+label : '');
}

function requestConfig(config){
    return new Promise(function(resolve,reject){
        var body = null;
        httpClient.get({
            host:buildURL(config.location).hostname,
            port:buildURL(config.location).port,
            path:buildPath(config.name,config.profiles,config.label),
            auth:config.user ? buildAuth(config.user) : ""

        },function(res){
            res.on('error',function(e){
                reject(e);
            });
            res.on('data',function(data){
                body = JSON.parse(data);
            });
            res.on('end',function(e){
                resolve(body);
            });
        }).on('error',function(e){
            reject(e);
        }).end();
    });
}

exports.load = function(config){
    
    validateConfig();
    
    return requestConfig(config) 
            .then(function(configurations){
                return createPropertySources(configurations);
            });
}