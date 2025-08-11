document.addEventListener("DOMContentLoaded", function() {
    const t = "@factorcode";
    let e = 0;
    document.title = "";
    setInterval(() => {
        e < t.length ? (document.title += t[e], e++) : (e = 0, document.title = "")
    }, 250);

    const n = document.getElementById("enter-screen"),
        i = document.getElementById("main-content"),
        a = document.getElementById("start-sound");

    n && i && n.addEventListener("click", () => {
        a && (a.volume = .1, a.play()), n.style.opacity = "0", setTimeout(() => {
            n.style.display = "none", i.style.visibility = "visible", i.style.opacity = "1"
        }, 500)
    }, {
        once: !0
    });

    setInterval(function() {
        debugger
    }, 500);

    const o = document.getElementById("particle-canvas"),
        c = o.getContext("2d");
    let l = [];
    const s = window.innerWidth < 768 ? 40 : 80;

    function d() {
        o.width = window.innerWidth, o.height = window.innerHeight
    }

    class r {
        constructor() {
            this.x = Math.random() * o.width, this.y = Math.random() * o.height, this.size = Math.random() * 2 + 1, this
                .speedX = Math.random() * 1 - .5, this.speedY = Math.random() * 1 - .5
        }
        update() {
            this.x += this.speedX, this.y += this.speedY, (this.x < 0 || this.x > o.width) && (this.speedX *= -1), (
                this.y < 0 || this.y > o.height) && (this.speedY *= -1)
        }
        draw() {
            c.fillStyle = "rgba(255, 255, 255, 0.8)", c.beginPath(), c.arc(this.x, this.y, this.size, 0, 2 * Math.PI),
                c.fill()
        }
    }

    function u() {
        l = [];
        for (let t = 0; t < s; t++) l.push(new r)
    }

    function m() {
        c.clearRect(0, 0, o.width, o.height);
        for (let t = 0; t < l.length; t++) l[t].update(), l[t].draw();
        requestAnimationFrame(m)
    }

    d(), u(), m(), window.addEventListener("resize", () => {
        d(), u()
    });

    const p = new IntersectionObserver(t => {
        t.forEach(t => {
            t.isIntersecting && t.target.classList.add("visible")
        })
    }, {
        threshold: .1
    });
    document.querySelectorAll(".fade-in").forEach(t => p.observe(t));

    document.addEventListener("keydown", function(t) {
        123 == t.keyCode || t.ctrlKey && t.shiftKey && ("I" == t.key || "J" == t.key || "C" == t.key) || t
            .ctrlKey && ("U" == t.key || "S" == t.key) ? t.preventDefault() : void 0
    });

    const h = document.getElementById("telegram-avatar"),
        g = h.src;

    h.onerror = function() {
        this.onerror = null, this.src = "https://via.placeholder.com/150"
    };

    setInterval(() => {
        h.src = g + "?t=" + (new Date).getTime()
    }, 3e5);

    const v = document.getElementById("background-video");
    v && v.play().catch(() => {
        console.log("Autoplay was prevented by browser.")
    })
});
