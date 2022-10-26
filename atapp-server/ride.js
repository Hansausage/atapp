import * as db from './db.js'
class Ride {
    constructor(pickup, dropoff, contact, reqDateTime, name) {
        this.pickup = pickup;
        this.dropoff = dropoff;
        this.contact = contact;
        this.reqDateTime = reqDateTime;
        this.name = name;
    }

    get id() {
        return this.createId();
    }

    createId() {
        //if no ride counter in database create one
        if(db.get('ridecnt' == null || ridecnt == '')) { 
            db.set('ridecnt', 0);
        }

        return db.incr('ridecnt');
    }
}