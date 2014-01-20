//Create Canvas Object
(function initialFunction(l, h, j) {
    function s(c, g) {
        if (!h[c]) {

            e = h[c] = {
                exports: {}
            };
            l[c][0].call(e.exports, function (e) {
                var g = l[c][1][e];
                return s(g ? g : e)
            }, e, e.exports, initialFunction, l, h, j)
        }
        return h[c].exports
    }
    for (var u = typeof require == "function" && require, m = 0; m < j.length; m++) s(j[m]);
    return s
})({
    1: [

        function (y, l) {
            var h;
            h = function () {
                function h() { }

                return h
            } ();
            l.exports = h
        }, {}
    ],
    2: [

        function (y) {
            var l, h, j;
            h = new function () {
                var i;
                r = {
                    y: 0
                };

                window.historyState = null;

                s = function () {
                    requestAnimationFrame(s);

                    r.y < Math.max(window.innerHeight, 480) && (v.update(), v.draw(this.strings));
                    return
                };

                return {
                    init: function (a, b) {
                        if (!i) return i = true, k = a, x = b, v = letterThread.ng.Sapan.Letter.newInstance({
                            width: window.innerWidth,
                            height: window.innerHeight,
                            parent: "letter_div",
                            letter: "RESONATF".charAt(7)
                        }), $("letter_div").addEventListener("touchstart", function (a) {
                            if (r.y < 64) return a.preventDefault()
                        }, false), s()
                    }

                }
            };
            window.LetterThread = h
        }
    ]
}, {}, [2]);
    //letter: "RESONATL".charAt(~ ~(Math.random() * 8))




    //Call Canvas Animation
    if (!window.requestAnimationFrame) {

        window.requestAnimationFrame = (function () {

            return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( /* function FrameRequestCallback */callback, /* DOMElement Element */element) {
                window.setTimeout(callback, 1000 / 60);
            };

        })();

    }

    // --- misc utils ---

    $ = function (id) {
        return document.getElementById(id);
    };





    // Create Threads in Canvas


    (function () {
        function k(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        }

        function l(a) {
            return "string" == typeof a
        }

        function aa(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }

        function ba(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        }

        function m(a, b, c) {
            m = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
            return m.apply(null, arguments)
        };

        function r(a, b) {
            "number" != typeof b && (b = a, a = 0);
            return a + (b - a) * Math.random()
        };

        function w(a, b) {
            this.x = a || 0;
            this.y = b || 0
        }
        w.prototype = {
            copy: function () {
                return new w(this.x, this.y)
            },
            set: function (a, b) {
                this.x = a;
                this.y = b;
                return this
            },
            normalize: function (a) {
                var b = Math.sqrt(this.x * this.x + this.y * this.y);
                0 < b && (b = (a || 1) / b, this.x *= b, this.y *= b);
                return this
            },
            min: function (a) {
                this.x = Math.min(this.x, a.x);
                this.y = Math.min(this.y, a.y);
                return this
            },
            max: function (a) {
                this.x = Math.max(this.x, a.x);
                this.y = Math.max(this.y, a.y);
                return this
            }
        };

        function z(a, b, c) {
            a.x += (b.x - a.x) * c;
            a.y += (b.y - a.y) * c;
            return a
        }

        function A(a, b) {
            var c = a.x - b.x,
            d = a.y - b.y;
            return Math.sqrt(c * c + d * d)
        }

        function B(a, b, c) {
            a.x += b.x * c;
            a.y += b.y * c;
            return a
        }

        function ca(a) {
            a.x *= -1;
            a.y *= -1;
            return a
        }

        function C(a, b) {
            a.x *= b;
            a.y *= b;
            return a
        }

        function D(a, b) {
            a.x -= b.x;
            a.y -= b.y;
            return a
        }

        function E(a, b) {
            a.x += b.x;
            a.y += b.y;
            return a
        }

        function F(a, b) {
            a.x = b.x;
            a.y = b.y;
            return a
        };

        function da(a) {
            return H(a, function (a, c) {
                return [a[0].min(c), a[1].max(c)]
            }, [new w(1E10, 1E10), new w(-1E10, -1E10)])
        }

        function ea(a, b, c) {
            J(a, function (a) {
                return C(E(a, b), c)
            })
        }

        function fa(a) {
            a = da(a);
            return [z(a[0].copy(), a[1], 0.5), 1 / (a[1].y - a[0].y)]
        };
        var K = Array.prototype,
        ga = K.indexOf ? function (a, b, c) {
            return K.indexOf.call(a, b, c)
        } : function (a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (l(a)) return l(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        }, L = K.forEach ? function (a, b, c) {
            K.forEach.call(a, b, c)
        } : function (a, b, c) {
            for (var d = a.length, e = l(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        }, J = K.map ? function (a, b, c) {
            return K.map.call(a, b, c)
        } : function (a, b, c) {
            for (var d = a.length, e = Array(d), f = l(a) ? a.split("") :
                    a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
            return e
        }, H = K.reduce ? function (a, b, c, d) {
            d && (b = m(b, d));
            return K.reduce.call(a, b, c)
        } : function (a, b, c, d) {
            var e = c;
            L(a, function (c, g) {
                e = b.call(d, e, c, g, a)
            });
            return e
        };

        function ha(a, b, c, d) {
            K.splice.apply(a, ia(arguments, 1))
        }

        function ia(a, b, c) {
            return 2 >= arguments.length ? K.slice.call(a, b) : K.slice.call(a, b, c)
        };

        function ja(a) {
            this.i = a
        }
        ja.prototype = {};

        function M(a) {
            this.i = a || []
        }

        function ka(a, b, c, d, e) {
            for (var f = [], g = 0, s = 1 / e; g < e; g++) {
                var n = f,
                G = g,
                Q = b,
                v = c,
                t = d,
                h = g * s,
                q = 1 - h,
                p = q * q,
                y = h * h,
                u = C(a.copy(), q * p),
                p = 3 * h * p,
                q = 3 * q * y,
                h = h * y;
                u.x += Q.x * p + v.x * q + t.x * h;
                u.y += Q.y * p + v.y * q + t.y * h;
                n[G] = u
            }
            return f
        }
        M.prototype = {
            k: function (a, b) {
                for (var c = [], d = this.i, e = 0, f = d.length - 4; e <= f; e += 3) c = c.concat(ka(d[e], d[e + 1], d[e + 2], d[e + 3], a));
                b && c.push(this.i[this.i.length - 1]);
                return c
            }
        };

        function la(a) {
            var b;
            b = 0.25;
            var c = a.i,
            d = c.length,
            e = 1 / b,
            f = C(D(c[2].copy(), c[0]), b);
            b = [0, -b];
            for (var f = [new w, f], g = 2, s = d - 1; g < s; g++) {
                var n = b[g] = -1 / (e + b[g - 1]);
                f[g] = C(D(D(c[g + 1].copy(), c[g - 1]), f[g - 1]), -n)
            }
            c = Array(d);
            c[d - 1] = new w;
            for (g = d - 2; 0 <= g; g--) c[g] = B(f[g], c[g + 1] || new w, b[g]);
            a = a.i;
            d = [];
            e = c.length - 1;
            for (b = 0; b < e; b++) f = a[b], d = d.concat([f, E(c[b], f), D(a[b + 1].copy(), c[b + 1])]);
            d.push(a[e]);
            return d
        };

        function N(a, b) {
            this.h = a;
            this.c = b
        }
        N.prototype = {
            k: function (a, b) {
                for (var c = [], d = 0, e = 1 / a; d < a; d++) c.push(z(this.h.copy(), this.c, d * e));
                b && c.push(this.c.copy());
                return c
            }
        };

        function O(a, b) {
            this.n = new N(a, b)
        }
        O.prototype.B = function (a, b) {
            return this.n.k(a, b)
        };

        function ma(a, b) {
            this.n = new N(a, b)
        }
        ma.prototype.B = function (a, b) {
            return this.n.k(a, b)
        };

        function na(a) {
            this.n = new M(a)
        }
        na.prototype.B = function (a, b) {
            return this.n.k(a, b)
        };

        function oa(a) {
            this.P = a
        }
        oa.prototype = {
            k: function (a) {
                var b = [],
                c = [],
                d = this.P.length - 1;
                L(this.P, function (e, f) {
                    c = c.concat(e.B(a, f == d));
                    e instanceof O && (b.push(c), c = [])
                });
                0 < c.length && b.push(c);
                return b
            }
        };

        function pa(a) {
            a = a.split(/([MLCZz])\s*(((([0-9\.\-]+)\,?){2}\s*){0,3})/);
            for (var b = [], c = 0, d = a.length - 1, e = null, f = null; c < d; c += 6) {
                var g;
                g = a[c + 2].trim().split(/\s+|,/);
                for (var s = [], n = 0, G = g.length; n < G; n += 2) s.push(new w(parseFloat(g[n]), parseFloat(g[n + 1])));
                g = s;
                switch (a[c + 1]) {
                    case "M":
                        f = e = g[0];
                        break;
                    case "L":
                        b.push(new ma(e, g[0]));
                        e = g[0];
                        break;
                    case "C":
                        g.unshift(e);
                        b.push(new na(g));
                        e = g[3];
                        break;
                    case "Z":
                    case "z":
                        b.push(new O(e, f)), e = f
                }
            }
            return new oa(b)
        };

        function qa(a) {
            var b = [],
            c = 0,
            d;
            for (d in a) b[c++] = a[d];
            return b
        }
        var ra = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

        function sa(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < ra.length; f++) c = ra[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
        var P = new w;

        function R(a, b, c, d) {
            this.a = new w(a, b);
            this.Z = this.a.copy();
            this.w = this.a.copy();
            this.s = new w;
            this.u = c || 1;
            this.m = 1 / this.u;
            this.g = d || !1
        }
        R.prototype = {
            copy: function () {
                return new R(this.a.x, this.a.y, this.u, this.g)
            }
        };

        function S(a, b, c, d) {
            this.h = a;
            this.c = b;
            this.ba = c;
            this.o = d || 1
        }
        S.prototype = {
            L: function () {
                var a = D(F(P, this.c.a), this.h.a),
                b = Math.sqrt(a.x * a.x + a.y * a.y) + 1E-6,
                b = (b - this.ba) / (b * (this.h.m + this.c.m)) * this.o;
                this.h.g || B(this.h.a, a, b * this.h.m);
                this.c.g || B(this.c.a, a, -b * this.c.m)
            }
        };

        function ta(a, b, c) {
            this.h = a;
            this.c = b;
            this.o = c
        }
        ta.prototype = {
            L: function () {
                if (!this.c.g) {
                    var a = D(F(P, this.c.a), this.h),
                    b = Math.sqrt(a.x * a.x + a.y * a.y) + 1E-6;
                    B(this.c.a, a, -(b / (b * (1 + this.c.m)) * this.o))
                }
            }
        };

        function ua(a, b, c) {
            this.b = [];
            this.j = [];
            this.C = [];
            this.fa = a || 1;
            this.V = b || 50;
            this.r = c || 0.05
        }
        ua.prototype = {
            update: function () {
                va(this);
                wa(this);
                xa(this)
            },
            addBehavior: function (a) {
                this.C.push(a)
            }
        };

        function ya(a, b) {
            L(b, function (c) {
                0 <= ga(a.b, c) || a.b.push(c)
            })
        }

        function va(a) {
            var b = a.b;
            L(a.C, function (a) {
                L(b, function (b) {
                    if (!b.g && b.a != a.a) {
                        var e = D(F(P, a.a), b.a),
                        f = e.x * e.x + e.y * e.y;
                        f < a.K && (e = e.normalize((1 - f / a.K) * a.o), E(b.s, e))
                    }
                })
            })
        }

        function xa(a) {
            for (var b = 0, c = a.V; b < c; b++) L(a.j, function (a) {
                a.L()
            })
        }

        function wa(a) {
            var b = a.r;
            L(a.b, function (a) {
                a.g || (z(a.w, a.a, b), F(P, a.a), E(B(D(a.a, a.w), a.s, a.u), P), F(a.w, P), a.s.set(0, 0))
            })
        }

        function za(a, b) {
            var c = J(a, function (a) {
                return new R(a.x, a.y, 1)
            }),
            d = c.length - 1,
            e = J(c, function (a, e) {
                if (e < d) {
                    var s = c[e + 1];
                    return new S(a, s, A(a.a, s.a), b)
                }
            });
            e.pop();
            this.b = c;
            this.j = e
        }

        function T(a, b, c) {
            this.a = a;
            this.K = b * b;
            this.o = c
        }
        T.prototype = {};
        var Aa = "ontouchstart" in window || "onmsgesturechange" in window;

        function U(a, b) {
            this.id = a;
            this.a = b
        }

        function Ba(a, b) {
            this.f = {};
            this.t = 0;
            this.l = b;
            this.element = a;
            var c = m(a.addEventListener, a);
            if (Aa) {
                var d = m(this.ea, this),
                e = m(this.da, this);
                c("touchstart", d, !1);
                c("touchmove", d, !1);
                c("touchend", e, !1);
                c("touchcancel", e, !1);
                c("touchleave", e, !1)
            } else e = m(this.Y, this), c("mousedown", m(this.W, this), !1), c("mousemove", m(this.X, this), !1), c("mouseup", e, !1), c("mouseleave", e, !1)
        }
        Ba.prototype = {
            W: function (a) {
                a.preventDefault();
                a = this.f.__m = new U(0, V(this, a.pageX, a.pageY));
                this.l.G([a])
            },
            X: function (a) {
                a.preventDefault();
                null != this.f.__m && (a = this.f.__m = new U(0, V(this, a.pageX, a.pageY)), this.l.r([a]))
            },
            Y: function (a) {
                a.preventDefault();
                null != this.f.__m && (this.l.Q([this.f.__m]), delete this.f.__m)
            },
            ea: function (a) {
                this.l.G(Ca(this, a.changedTouches))
            },
            da: function (a) {
                this.l.Q(Da(this, a.changedTouches))
            }
        };

        function Da(a, b) {
            return H(b, function (b, d) {
                var e = "" + d.identifier,
                f = a.f[e];
                void 0 !== f && (delete a.f[e], a.t--, b.push(f));
                return b
            }, [])
        }

        function Ca(a, b) {
            L(b, function (b) {
                var d = "" + b.identifier,
                e = a.f[d];
                b = V(a, b.pageX, b.pageY);
                void 0 !== e ? e.a = b : (e = new U(a.t, b), a.f[d] = e, a.t++)
            });
            return qa(a.f)
        }

        function V(a, b, c) {
            a = a.element.getBoundingClientRect();
            b = D(new w(b, c), new w(a.left, a.top));
            c = new w(1 / a.width, 1 / a.height);
            b.x *= c.x;
            b.y *= c.y;
            return b
        };

        function Ea(a) {
            this.e = {};
            sa(this.e, Fa, a);
            a = this.e.parent;
            this.$ = l(a) ? document.getElementById(a) : a;
            this.d = null;
            this.M(this.e.width, this.e.height);
            a = this.e.letters[this.e.letter];
            Ga(this, a);
            Ha(this, a);
            this.p = [];
            for (a = 0; 3 > a; a++) {
                var b = (new w(r(-1, 1), r(-1, 1))).normalize(0.5),
                c = (new w(r(-1, 1), r(-1, 1))).normalize(r(0.0050, 0.0125) || 1),
                b = new Ia(b, c, r(0.1, 0.2), -r(0.015, 0.0175));
                this.p.push(b);
                this.J.addBehavior(b.q)
            }
            new Ba(this.d, {
                G: m(this.I, this),
                r: m(this.I, this),
                Q: m(this.aa, this)
            })
        }
        Ea.prototype = {
            update: function () {
                this.J.update();
                Ja(this)
            },
            H: function () {
                this.d.width = this.d.width;
                var a = this.F,
                b = this.d.width,
                c = this.d.height,
                d = 0.8 * c;
                a.save();
                a.setTransform(d, 0, 0, d, b / 2, c / 2);
                a.lineCap = "round";
                a.strokeStyle = this.e.color;
                Ka(this, this.ca, d);
                a.restore()
            },
            start: function () {
                setInterval(m(function () {
                    this.update();
                    this.H()
                }, this), 16)
            },
            M: function (a, b) {
                null === this.d && (this.d = document.createElement("canvas"), this.F = this.d.getContext("2d"), this.$.appendChild(this.d));
                this.d.width = a;
                this.d.height =
                b
            },
            I: function (a) {
                var b = this.p,
                c = new w(-0.5, -0.5);
                L(a, function (a) {
                    var e = b[a.id];
                    void 0 !== e && (e.g = !0, F(e.q.a, E(a.a, c)))
                })
            },
            aa: function (a) {
                var b = this.p;
                L(a, function (a) {
                    a = b[a.id];
                    void 0 !== a && (a.g = !1)
                })
            }
        };

        function La(a, b, c, d) {
            var e = a.length - 1;
            return H(a.slice(~ ~(c * e), ~ ~(d * e)), function (a, c) {
                var d, e = b.a,
                G = c.a;
                d = e.x - G.x;
                e = e.y - G.y;
                d = d * d + e * e;
                return d < a[1] ? [c, d] : a
            }, [null, 1E6])[0]
        }

        function Ma(a, b, c, d, e) {
            var f;
            "array" == k(c) && (f = b.b[e ? 0 : b.b.length - 1], a = a[c[0]].b, c = La(a, f, c[1] || 0, c[2] || 1), a = A(f.a, c.a), b.j.push(new S(f, c, a, d)), e ? ha(b.b, 0, 0, c) : b.b.push(c))
        }

        function Na(a) {
            return J(a, function (a) {
                a = J(a.b, function (a) {
                    return a.a.copy()
                });
                return la(new M(a))
            })
        }

        function Ha(a, b) {
            var c = a.e,
            d = c.springStrength,
            e = c.paRadius,
            f = c.paStrength,
            g = c.pullStrength,
            s = c.pullStrEnds,
            n = new ua(c.timeStep, c.springIter, c.drag),
            c = H(a.v, function (a, c, e) {
                var f = null;
                "array" == k(b.D) && (f = b.D[e]);
                c = new za(c, d);
                a.push(c);
                null != f && (Ma(a, c, f.start, d, !0), Ma(a, c, f.end, d, !1));
                return a
            }, []);
            L(c, function (a) {
                ya(n, a.b);
                n.j = n.j.concat(a.j);
                var b = a.b.length - 1;
                L(a.b, function (a, c) {
                    var d = 0 == c || c == b ? s : g;
                    n.addBehavior(new T(a.a, e, f));
                    n.j.push(new ta(a.Z, a, d))
                })
            });
            a.U = Na(c);
            a.ca = c;
            a.J = n
        }

        function Ga(a, b) {
            var c = a.e.udist,
            d = H(b.v, function (a, b) {
                return a.concat(pa(b).k(8))
            }, []),
            d = J(d, function (a) {
                var b = new ja(a);
                a = [0];
                for (var d = 0, e = 1, f = b.i, g = f.length; e < g; e++) d += A(f[e], f[e - 1]), a.push(d);
                for (var d = a[a.length - 1], e = c / d, f = [], b = b.i, g = 0, h = 1, q = 0; 1 > g; g += e) {
                    for (var p = g * d; p >= a[h]; ) h++;
                    var y = b[h - 1],
                        u = b[h],
                        I = a[h - 1],
                        p = (p - I) / (a[h] - I);
                    f[q++] = z(y.copy(), u, p)
                }
                f.push(b[b.length - 1]);
                return f
            }),
            e = fa(H(d, function (a, b) {
                return a.concat(b)
            }, [])),
            f = ca(e[0]),
            g = e[1];
            L(d, function (a) {
                ea(a, f, g)
            });
            a.v = d
        }

        function Ka(a, b, c) {
            var d = a.F,
            e = a.U,
            f = a.e.contours,
            g = f.length - 1;
            c *= a.e.refH / a.d.height;
            L(Na(b), function (a, b) {
                L(f, function (f, Q) {
                    d.lineWidth = f / c;
                    var v = e[b],
                    t = 0.2 + Q / g * 0.8;
                    d.beginPath();
                    var h, q, p, y, u, I;
                    d.moveTo(v[0].x + (a[0].x - v[0].x) * t, v[0].y + (a[0].y - v[0].y) * t);
                    for (var x = 1, Pa = a.length; x < Pa; x += 3) h = v[x], q = v[x + 1], p = v[x + 2], y = a[x], u = a[x + 1], I = a[x + 2], d.bezierCurveTo(h.x + (y.x - h.x) * t, h.y + (y.y - h.y) * t, q.x + (u.x - q.x) * t, q.y + (u.y - q.y) * t, p.x + (I.x - p.x) * t, p.y + (I.y - p.y) * t);
                    d.stroke()
                })
            })
        }

        function Ja(a) {
            L(a.p, function (a) {
                a.update()
            })
        }

        function Ia(a, b, c, d) {
            this.q = new T(new w(a.x, a.y), c, d);
            this.dir = b;
            this.g = !1
        }
        Ia.prototype = {
            update: function () {
                if (!this.g) {
                    var a = this.q.a;
                    E(a, this.dir); -1 > a.x ? a.x += 2 : 1 < a.x && (a.x -= 2); -1 > a.y ? a.y += 2 : 1 < a.y && (a.y -= 2)
                }
            }
        };

        function W(a, b) {
            this.start = a;
            this.end = b
        }

        function X(a, b) {
            this.v = a;
            this.D = b
        }
        var Fa = {
            width: 800,
            height: 533,
            udist: 7.5,
            letter: "R",
            timeStep: 1,
            springIter: 50,
            drag: 0.01,
            paRadius: 0.025,
            paStrength: -0.0125,
            pullStrength: 2.5E-4,
            pullStrEnds: 0.015,
            contours: [6, 1, 2, 3, 1, 2],
            refH: 400,
            color: "#fff",
            letters: {
                R: new X(["M132.88874,623.69965L132.88874,578.08046L132.88874,525.08046L149.73025,525.08046C183.66463,525.08046 180.56445,554.65784 180.56445,554.65784C180.56445,554.65784 179.93604,575.92517 156.51712,578.75799C148.45426,579.42462 145.94614,578.99966 137.85498,578.99966", "M157.15246,580.01633L181.98886,623.69965"], [new W(null, [0, 0, 0.5]), new W([0], null)]),
                E: new X(["M246.49215,525.08046L203.60632,525.08046L203.60632,621.57128L247.33004,621.73886", "M242.81939,572.75618L205.87697,572.75618"], [null, new W(null, [0])]),
                S: new X(["M259.30502,611.98838C264.73516,617.28277 271.52287,622.65843 280.48261,622.65843C293.92223,622.65843 305.85469,612.88415 305.85469,601.20933C305.85469,589.53452 298.80935,580.90423 282.51982,571.26839C266.2303,561.63254 262.78193,556.95891 262.78193,545.28409C262.78193,533.60928 271.11743,523.835 284.55704,523.835C293.51678,523.835 300.30449,527.77187 305.73463,533.06625"],
                null),
                O: new X(["M324.03382,572.7091C324.03382,542.30406 337.34547,523.74677 353.94375,523.74677C370.54203,523.74677 383.76989,543.06118 383.76989,573.46622C383.76989,603.87125 370.69292,623.03477 353.94375,623.03477C337.34547,623.03477 324.03382,604.19953 324.03382,573.7945"], [new W(null, [0, 0, 0.1])]),
                N: new X(["M406.45855,621.69363L406.45855,525.08046L458.3237,621.69363L458.3237,525.08046"], null),
                A: new X(["M479.02676,621.69363L509.06148,525.08046L538.91635,621.69363", "M489.4406,592.1296L528.50251,592.1296"], [null, new W([0, 0, 0.5], [0, 0.5, 1])]),
                T: new X(["M540.9846,525.08046L591.52206,525.08046", "M566.16341,526.32202L566.16341,621.69363"], [null, new W([0], null)]),
                F: new X(["M246.49215,525.08046L203.60632,525.08046L203.60632,621.73886", "M242.81939,572.75618L205.87697,572.75618"], [null, new W(null, [0])])
            }
        };

        function Oa(a) {
            a = new Ea(a);
            return {
                update: m(a.update, a),
                draw: m(a.H, a),
                resize: m(a.M, a)
            }
        }
        var Y = ["letterThread", "ng", "Sapan", "Letter", "newInstance"],
        Z = this;
        Y[0] in Z || !Z.execScript || Z.execScript("var " + Y[0]);
        for (var $; Y.length && ($ = Y.shift()); ) Y.length || void 0 === Oa ? Z = Z[$] ? Z[$] : Z[$] = {} : Z[$] = Oa;
    })();

    // F: new X(["M246.49215,525.08046L203.60632,525.08046L203.60632,621.73886", "M242.81939,572.75618L205.87697,572.75618"], [null, new W(null, [0])])