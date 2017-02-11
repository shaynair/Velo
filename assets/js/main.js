$(document).ready(function() {

    new WOW().init();

    /* ======= Fixed header when scrolled ======= */

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 100 });

    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e) {

        //store hash
        var target = this.hash;

        e.preventDefault();

        $('body').scrollTo(target, 800, { offset: -50, 'axis': 'y' });
        //Collapse mobile menu after clicking
        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        }

    });


    Physics(function(world) {
        world.add(Physics.integrator('verlet'));
        var renderer = Physics.renderer('canvas', {
            el: 'viewport',
            meta: false, // don't display meta data
            styles: {
                // set colors for the circle bodies
                'circle': {
                    strokeStyle: '#351024',
                    lineWidth: 1,
                    fillStyle: '#b7b2af'
                },
                // set colors for the circle bodies
                'rectangle': {
                    strokeStyle: '#FFFFFF',
                    lineWidth: 1,
                    fillStyle: '#ADD8FF'
                }
            }
        });

        // add the renderer
        world.add(renderer);
        // render on each step
        world.on('step', function() {
            world.render();
        });
        // bounds of the window
        var viewportBounds = Physics.aabb(0, 0, 2000, 500);

        // constrain objects to these bounds
        world.add(Physics.behavior('edge-collision-detection', {
            aabb: viewportBounds,
            restitution: 0.99,
            cof: 0.99
        }));

        world.add(Physics.body('circle', {
            x: 250, // x-coordinate
            y: 100, // y-coordinate
            radius: 20,
            restitution: 0.2
        }));
        world.add(Physics.body('circle', {
            x: 50, // x-coordinate
            y: 100, // y-coordinate
            radius: 20,
            restitution: 0.8
        }));
        world.add(Physics.body('rectangle', {
            x: 250, // x-coordinate
            y: 500, // y-coordinate
            width: 200,
            height: 10,
            restitution: 0
        }));
        world.add(Physics.behavior('body-impulse-response'));
        world.add(Physics.behavior('constant-acceleration'));
        // subscribe to the ticker
        Physics.util.ticker.on(function(time) {
            world.step(time);
        });
        // start the ticker
        Physics.util.ticker.start();
    });




});