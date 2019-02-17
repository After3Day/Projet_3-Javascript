// Un objet qui gère une promesse pour l'appel de l'objet JSON de l'API JCDeceaux

class Appel {
    constructor(url) {

        this.Url = url;
    }

    newReq(url) {
        return new Promise(function (resolve, reject) {
            let req = new window.XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        resolve(req.responseText);
                    } else {
                        reject(req);
                    }
                }
            }
            req.open("GET", url);
            req.send();
        })
    }
}
