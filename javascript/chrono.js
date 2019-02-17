// Objet du minuteur

class Chrono {
    constructor(minutes, secondes, delai) {

        this.mn = minutes;
        this.s = secondes;
        this.del = delai;

        this.defaultS = 0;
        this.defaultM = 20;

        this.t = 0;
        sessionStorage.setItem('secondes', secondes);
        sessionStorage.setItem('minutes', minutes);
    }

    reset() {
        clearInterval(this.t);

        document.getElementById("minutes").textContent = "";
        document.getElementById("secondes").textContent = "";

        document.getElementById("secondes").style.color = "black";
        document.getElementById("minutes").style.color = "black";

        sessionStorage.setItem("minutes", 20);
        sessionStorage.setItem("secondes", 0);
        this.t = 0;
        this.s = this.defaultS;
        this.mn = this.defaultM;
        sessionStorage.removeItem("status");
        document.getElementById("reserve").style.display = "none";
    }

    updateChrono() {
        this.s--;

        if (this.s < 0) {
            this.s = 59;
            this.mn--;
        }

        sessionStorage.setItem('secondes', this.s);
        sessionStorage.setItem('minutes', this.mn);

        document.getElementById("minutes").textContent = this.mn;
        document.getElementById("secondes").textContent = this.s;

        if (this.mn <= 0 && this.s < 30) {
            document.getElementById("secondes").style.color = "red";
            document.getElementById("minutes").style.color = "red";
        }

        if (this.mn <= 0 && this.s === 0) {
            this.reset();
        }
    }

    TestChrono() {

        sessionStorage.getItem("minutes");
        sessionStorage.getItem("secondes");
        let that = this;
        let minutes = parseInt(sessionStorage.getItem("minutes"));
        let secondes = parseInt(sessionStorage.getItem("secondes"));
        if ((minutes > 0) || (secondes > 0)) {
            that.mn = sessionStorage.getItem("minutes");
            that.s = sessionStorage.getItem("secondes");
            that.start();
        }
    }

    start() {
        if (this.t === 0) {
            this.t = setInterval(this.updateChrono.bind(this), this.del);
        }

    }
}
