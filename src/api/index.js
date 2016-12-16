import request from 'superagent'
const region = 'http://localhost:3000/67api'

const isObj = (obj) => {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
}

const fetchApi = (cfg) =>{
    if(!isObj(cfg)) return false;
    if(!cfg.url) return false;
    cfg.data = cfg.data || {};
    return new Promise((resolve, reject) => {
        request(cfg.method, region + cfg.url)
            .send(cfg.data)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end(function(err, res){
                if(err){
                    console.log(err);
                    console.log(res.error);
                    resolve(null)
                }else{
                    resolve(res.body)
                }
            });
        });
}

export default fetchApi;
