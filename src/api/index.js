// import request from 'superagent'
import axios from 'axios'
axios.create({
    baseURL: 'http://localhost:3000/67api',
    timeout: 1000,
    headers: {
        'X-API-Key': 'foobar',
        'Accept': 'application/json'
    }
});

const isObj = (obj) => {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
}

export const region = 'http://localhost:3000/67api'
export const rootUrl = 'http://localhost:3000'
export const imageUrl = 'http://localhost:3000/images/'

export const fetchApi = (cfg) =>{
    if(!isObj(cfg)) return false;
    if(!cfg.url) return false;
    cfg.data = cfg.data || {};

    if(cfg.method === 'POST'){
        return axios.post(cfg.url,cfg.data)
    }

    // return new Promise((resolve, reject) => {
        // request(cfg.method, region + cfg.url)
        //     .send(cfg.data)
        //     .set('X-API-Key', 'foobar')
        //     .set('Accept', 'application/json')
        //     .end(function(err, res){
        //         if(err){
        //             console.log(err);
        //             console.log(res.error);
        //             resolve(null)
        //         }else{
        //             resolve(res.body)
        //         }
        //     });
        // });
}
