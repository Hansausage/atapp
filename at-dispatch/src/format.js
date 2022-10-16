const Api = require('./api');

module.exports = class Format {

    Format() {}

    async formatData() {
        const api = new Api();
        const keys = await api.getKeys();
        const promises = await keys.map(async key => {
            const promise = new Promise((resolve) => {
                resolve(api.getKey(key));
            })
            return promise;
       })
       const content = Promise.all(promises);
       console.log(content);
       return content;
    }

   sortDateTime(entries) {
        let data = [];
        let fuck = false;
        entries.sort((a, b) => {
            return new Date(a.schedDateTime) - new Date(b.schedDateTime);
        });
        entries.forEach((entry) => {
            let thisEntry = {};
            thisEntry.entries = [];
            for (const [key, value] of Object.entries(entry)) {
                if (entry.schedDateTime === undefined || entry.schedDateTime.length == 0) {
                    if (!fuck) {
                        thisEntry.date = 'unscheduled';
                        thisEntry.entries.push(entry);
                        data.push(thisEntry);
                        fuck = true;
                        return;
                    }
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].date == 'unscheduled') {
                            data[i].entries.push(entry);
                            return;
                        }
                    }
                }
                if (key =='schedDateTime' && new Date(value).toDateString() != 'Invalid Date') {
                    const date = new Date(value).toDateString();
                    if (data === undefined || data.length == 0) {
                        thisEntry.date = date;
                        thisEntry.entries.push(entry);
                        data.push(thisEntry);
                        break;
                    } 
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].date == date) {
                            data[i].entries.push(entry);
                            return;
                        }
                    }
                    thisEntry.date = date;
                    thisEntry.entries.push(entry);
                    data.push(thisEntry);
                }
            }
        })
        data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        for (let i = 0; i < data.length; i++) {
            if (data[i].date == 'unscheduled') {
                let unscheduled;
                unscheduled = data[i];
                data.splice(i, 1);
                data.unshift(unscheduled);
            }
        }
        console.log(data);
        return data;
    }
}