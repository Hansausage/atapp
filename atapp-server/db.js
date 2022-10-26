import Redis, { ScanStream } from "ioredis";
import JSONCache from "redis-json";
import bcrypt, { hash } from 'bcrypt';
const client = new Redis();
const jsoncache = new JSONCache(client);

//this shit needs to be rewritten asap
//contains functions for crypto, redis, and user logins

export function getRedisClient() {
    return client;
}

export async function set(key, val) {
    console.log(val);
    await jsoncache.set(key, val);
}

export async function get(key) {
    let x = await jsoncache.get(key.slice(3, key.length));
    return x;
}

export async function incr(key) {
    jsoncache.incr(key);
    return key;
}

export function scan() {
    let keys = [];
    return new Promise((resolve, reject) => {
    const stream = client.scanStream()
        .on('data', (data) => {
            for (let i = 0; i < data.length; i++) {
                keys.push(data[i]);
            }
        })
        .on('error', (err) => {
            console.log('fuck');
            reject(err);
        })
        .on('end', () => {
            for(let i = 0; i < keys.length; i++) {
                if (keys[i].includes('_t')) {
                    keys.splice(i, 1);
                }
            }
            resolve(keys);
        })
    })
}



export async function createHash(password) {
   const hash = await bcrypt.hash(password, 10);
   return hash;
}

export async function checkPassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
}

export async function checkUser(username, password) {
    const user = await get('user:' + username);
    const hash = user.password;
    const passwordCheck = await checkPassword(password, hash);
    if (!passwordCheck || user.username != username) {
        return false;
    }
    return true;
}

export async function createUser(username, password, contact, email) {
    const hash = await createHash(password);
    await jsoncache.set('user:' + username, {
        username: username,
        password: hash,
        contact: contact,
        email: email
    });
}

/* export async function search() {
    const data = [];
    scan().then((x) => {
        x.forEach(element => {
            data.push(await get(element))
            
        })
    })
} */