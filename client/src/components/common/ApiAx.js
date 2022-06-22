import axios from "axios";

/**
 * AoiGet - GET reguest for data
 * 
 * @param {string API URL} url 
 * @param {query object} query 
 * @returns axios promise with data or error
 */
export const ApiGet = (url, query = {}) => {
    return sendApiRequest('get', url, query, {});
};

/**
 * ApiPost - POST request for insert data
 * 
 * @param {string API URL} url 
 * @param {query object} query
 * @param {json data for insert} data 
 * @returns axios promise with data or error
 */
export const ApiPost = (url, data = {}) => {
    return sendApiRequest('post', url, {}, data);
};

/**
 * ApiPut - PUT request for update data
 * 
 * @param {string API URL} url 
 * @param {query object} query
 * @param {json data for update} data 
 * @returns axios promise with data or error
 */
export const ApiPut = (url, data = {}) => {
    return sendApiRequest('put', url, {}, data);
};

/**
 * ApiDelete - DELETE request 
 * 
 * @param {string API URL} url 
 * @param {query object} query
 * @param {json data for insert} data 
 * @returns axios promise with data or error
 */
export const ApiDelete = (url) => {
    return sendApiRequest('delete', url, {});
};

/**
 * sendApiRequest -  Axios API request
 *  
 * @param {string API method} method 
 * @param {string API URL} url 
 * @param {query object} query 
 * @param {json data for POST and PUT} data 
 * @returns axios promise with data or error
 */
function sendApiRequest(method, url, query, data = {}) {
    const options = createRequestOptions(url, method, query, data);
    return (axios(options)
        .then(response => {
            return response.data;
        })
        .catch(function (error) {
            return error;
        })
    );
}

/**
 * createRequestOptions - create option object for API request
 * 
 * @param {string API method} method 
 * @param {string API URL} url 
 * @param {query object} query 
 * @param {json data for POST and PUT} data 
 * @returns option object
 */
function createRequestOptions(url, method, query, data) {
    if(query){
        const qs = require("qs");
        url += '?' + qs.stringify(query);
    }

    let options = {
        'method': method,
        'url': url
    };

    if (['post', 'put'].includes(options.method)) {
        options['headers'] = { 'Content-Type': 'application/json' };
        options['data'] = JSON.stringify(data);
    }

    return options;
}

