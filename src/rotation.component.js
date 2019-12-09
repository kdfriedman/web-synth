
export class RotationComponent {
    constructor() {
        this.angle = 0;
        this.rotation = 0;
        //# Convert radians to degrees
        this.R2D = 180 / Math.PI;
        this.active = false;
        this.center = { x:0, y:0 };
        this.startAngle;
        this.stop;
    }

    init(adsrKnobDivElems) {
        this.wireUpTouchEventListeners();
        this.wireUpMouseEventListeners(adsrKnobDivElems);
    }

    wireUpTouchEventListeners() {
        document.ontouchmove = e => {
            return e.preventDefault();
        };
    }

    wireUpMouseEventListeners(adsrKnobDivElems) {
        adsrKnobDivElems.addEventListener("mousedown", e => {
            this.start(e);
            adsrKnobDivElems.onmousemove = e => {
                this.rotate(e, this.center, adsrKnobDivElems);
            }
        }, false);
        adsrKnobDivElems.addEventListener("mouseup", e => {
            adsrKnobDivElems.onmousemove = null;
        }, false);
    }

    start(e) {
        //# Set the starting angle of the touch relative to target's center
        let height, left, top, width, x, y, _ref;
        e.preventDefault();
        _ref = e.target.getBoundingClientRect(), 
        top = _ref.top, 
        left = _ref.left, 
        height = _ref.height, 
        width = _ref.width;
        this.center = {
            x: left + (width / 2),
            y: top + (height / 2)
          };
        x = e.clientX - this.center.x;
        y = e.clientY - this.center.y;
        this.startAngle = this.R2D * Math.atan2(y, x);
        console.log(e);
        return this.active = true;
    }

    rotate(e, center, adsrKnobDivElems) {
        let isNotWebkit = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        let isWebkit = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        let d, x, y;
        e.preventDefault();
        x = e.clientX - center.x;
        y = e.clientY - center.y;
        d = this.R2D * Math.atan2(y, x);
        this.rotation = d - this.startAngle;
        this.degreeToPercentConversion = Math.abs(Math.floor(((this.angle + this.rotation) / 360) * 100));
        console.log(this.degreeToPercentConversion);

        //check if active is true and determine if userAgent is webkit or nonWebkit
        if (this.active && isNotWebkit) {
            adsrKnobDivElems.style.transform = `rotate(${this.angle + this.rotation}deg)`;
        } else if (this.active && isWebkit) {
            adsrKnobDivElems.style.webkitTransform = `rotate(${this.angle + this.rotation}deg)`;
        } else {
            return this.active = false;
        }
      };

}