// Objet gérant le diaporama

class Diaporama {

    constructor(index, temps) {


        this.slideIndex = index;
        this.timer = temps;

        this.slides = document.getElementsByClassName("Slider");
        this.pupuces = document.getElementsByClassName("bouttonIndic");
        this.test = 0;
    }

    nextImg() {
        this.slideIndex++;
        this.diap();
    }

    prevImg() {
        this.slideIndex--;
        this.diap();
    }

    diap() {
        let i;
        let mySlide = this.slides;
        let myPuces = this.pupuces;

        if (this.slideIndex > mySlide.length) {
            this.slideIndex = 1
        }
        if (this.slideIndex < 1) {
            this.slideIndex = mySlide.length;
        }
        for (i = 0; i < mySlide.length; i++) {
            mySlide[i].style.display = "none";
            myPuces[i].className = myPuces[i].className.replace(" active", "");
        }
        mySlide[this.slideIndex - 1].style.display = "block";
        myPuces[this.slideIndex - 1].className += " active";
    }

    diapAuto() {
        if (this.test === 0) {
            this.test = setInterval(this.nextImg.bind(this), this.timer);
        }

    }

    diapPause() {
        clearInterval(this.test);
        this.test = 0;
    }

    allInOne() {
        this.diap();
        this.diapPause();
        this.diapAuto();
    }

    showCurrent(id) {
        id = parseInt(id);
        switch (id) {
            case 1:
                this.slideIndex = id;
                break;
            case 2:
                this.slideIndex = id;
                break;
            case 3:
                this.slideIndex = id;
                break;
            case 4:
                this.slideIndex = id;
                break;
            default:
                break;
        }
        this.allInOne();

    }

}
