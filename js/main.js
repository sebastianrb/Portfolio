(function() {

    var main = document.querySelector(".main-body");
    var $portfolioHeader = $(".portfolio-header");
    var $tileList = $('.project-list');
    var projectTiles = Array.from(document.querySelectorAll(".project-list__project"));
    var $projectList = $('.project-list');
    var $projectListContainer = $('.project-list-container');
    var title = document.querySelector(".portfolio-header");
    var $portfolioTitle = $(".portfolio-header__title");
    var description = document.querySelector(".project-description");
    var loadAnimations = Array.from(document.querySelectorAll(".load-hidden"));
    var $flipper = $('.flipper');
    var $front = $('.front');
    var $back = $('.back');
    var $contactPopup = $('.evo_c-expand-and-fold-out-popup__popup-button');
    var selected = false;
    var mobileProjectListOffset = 110;
    var $otherProjectsDemoButton;
    var $modalCloseButton = $('.other-projects-modal__close-button');
    var $modal = $('.other-projects-modal');
    var projectID;

    //moda stuff
    $modalCloseButton.on('click', function(event) {
        event.preventDefault();
        $modal.addClass('hidden');
    });


    window.addEventListener("load", function(event) {
        loadAnimations.forEach( function(element, index) {
            element.classList.remove("load-hidden");
        });
        setTimeout(function() {
            offsetMobileProjects();
            description.style.transition = "left .3s ease-out .1s, opacity .4s"
        }, 2000);
    });



    //tiles
    $tileList.on('click', ".project-list__project", function(event) {
        // event.preventDefault();
        var $clickedTile = $(event.currentTarget);
        projectID = $clickedTile.data('project-id');
        var selectedProjectObject;

        //get corresponding project object
        for(var i = 0; i < projectObject.length; i++) {
            if(projectID === projectObject[i].projectID) {
                selectedProjectObject = projectObject[i];
            }
        }

        //if tile is already selected, remove selected class and reset description block
        if($clickedTile.hasClass('selected')) {
            projectID = 0;
            for(var i = 0; i < projectObject.length; i++) {
                if(projectID === projectObject[i].projectID) {
                    selectedProjectObject = projectObject[i];
                }
            }
            //disable clicked tile for a couple seconds
             togglePointerEvents($(projectTiles));

            $clickedTile.removeClass('selected');

            if($back.hasClass('visible-side')) {
                $front.find('.project-description__demo-button').remove();
                setTimeout(function() {
                    $back.find('.project-description__demo-button').remove();
                }, 1000);
            } else {
                $back.find('.project-description__demo-button').remove();
                setTimeout(function() {
                    $front.find('.project-description__demo-button').remove();
                }, 1000);
            }
            selected = false;

            $('.side:not(.visible-side)').find('.project-description__project-title').html(selectedProjectObject.title);
            $('.side:not(.visible-side)').find('.project-description__project-caption').html(selectedProjectObject.description);
             $('.side:not(.visible-side)').find('.project-description__demo-button').attr('href', selectedProjectObject.demoLink);

             if($front.hasClass('visible-side')) {
                $front.removeClass('visible-side');
                $back.addClass('visible-side');
             } else {
                $back.removeClass('visible-side');
                $front.addClass('visible-side');
             }

             if($('.side:not(.visible-side)').find(".project-description__demo-button").length === 0) {

                  var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');

                 $('.side:not(.visible-side)').append(demoButton);

             }

             if($flipper.hasClass("flipped")) {
                 $flipper.removeClass('flipped');
             } else {
                 $flipper.addClass('flipped');
             }

             // $flipper.toggleClass('flipped');
        } else {
            //disable clicked tile for a couple seconds
            togglePointerEvents($(projectTiles));

            //set classes
            $clickedTile.siblings('.project-list__project').removeClass('selected');
            $clickedTile.addClass('selected');
            $(projectTiles).find('.selected-project-scanner').removeClass("selected-project-scanner--shown");
            $clickedTile.find('.selected-project-scanner').addClass('selected-project-scanner--shown');


            if($('.side:not(.visible-side)').find(".project-description__demo-button").length === 0) {
                var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');
                $('.side:not(.visible-side)').append(demoButton);
            }

            // console.log(projectID);
            if(projectID === 6) {
              $('.side:not(.visible-side) .project-description__demo-button').addClass("other-projects");
              $(".other-projects").on('click', function(event) {
                  event.preventDefault();
                  // console.log("Clicked");
                  $modal.removeClass('hidden');
              });
            } else {
              $('.project-description__demo-button').removeClass("other-projects");
              $(".project-description__demo-button").off();
            }

            selected = true;

            if($front.hasClass('visible-side')) {
                //change info on back side, change visible-side class to back side, flip to back
                $back.find('.project-description__project-title').html(selectedProjectObject.title);
                $back.find('.project-description__project-caption').html(selectedProjectObject.description);
                $back.find('.project-description__demo-button').attr('href', selectedProjectObject.demoLink);

                $front.removeClass('visible-side');
                $back.addClass('visible-side');

                $flipper.addClass('flipped');
            } else {
                //change info on front side, change visible-side class to front side, flip to front
                $front.find('.project-description__project-title').html(selectedProjectObject.title);
                $front.find('.project-description__project-caption').html(selectedProjectObject.description);
                $front.find('.project-description__demo-button').attr('href', selectedProjectObject.demoLink);

                $back.removeClass('visible-side');
                $front.addClass('visible-side');

                $flipper.removeClass('flipped');
            }
        }

        $('.main-body__overlay').animate({ scrollTop: 0 }, 600);

        //top offsets on small screens
        offsetMobileProjects();
    });

    window.addEventListener("resize", function() {
        offsetMobileProjects();
    });


    function offsetMobileProjects() {
       if(window.innerWidth < 921) {
          // console.log("Small screen.");
          var headerHeight = $portfolioHeader.height();
          // console.log(headerHeight);
          var $visibleSide = $('.visible-side');
          var visibleSideHeight = $visibleSide.height();
          // console.log(visibleSideHeight);
          // var visibleSideMarginTop = $visibleSide.css("margin-top");
          var totalOffset = headerHeight + visibleSideHeight + 35 + mobileProjectListOffset;

          // console.log(totalOffset);
          // console.log($projectListContainer);

          $projectListContainer.css("top", totalOffset);
       }
    }


    function togglePointerEvents(tiles) {
        tiles.addClass('no-click');
        setTimeout(function() {
            tiles.removeClass('no-click');
        }, 1700);
    }


    //contact popup fade

    $contactPopup.on('mouseenter', function(event) {
       event.preventDefault();
       $projectList[0].classList.add("contact-faded");
       description.classList.add("contact-faded");
       $portfolioTitle.addClass("contact-faded");
    });

    $contactPopup.on('mouseleave', function(event) {
        event.preventDefault();
        $projectList[0].classList.remove("contact-faded");
        description.classList.remove("contact-faded");
        $portfolioTitle.removeClass("contact-faded");
    });

    var projectObject = [{
        title: "Bov Academy Student Site <div class='tech-used-button'><i class='fa fa-code' aria-hidden='true'></i></div><div class='tech-used-popup'><span>Technologies Used</span>Pure JavaScript, Pure CSS, Handlebars.js, Grunt</div>",
        description: "I am a lead developer on the team that built the student profile site for <a class='bov-link' href='https://bovacademy.com/' target='_blank'>Bov Academy</a>. The site contains profiles for the school's student body and heavily utilizes multimedia and various animation effects. We intentionally built the site using vanilla JavaScript.",
        demoLink: "https://students.bovacademy.com/",
        projectID: 1
    },
    {
        title: "Developer Profile <div class='tech-used-button'><i class='fa fa-code' aria-hidden='true'></i></div><div class='tech-used-popup'><span>Technologies Used</span>Pure JavaScript, jQuery, Sass, Gulp</div>",
        description: "My developer profile is meant to help visitors get to know me better both professionally and personally. The site contains a short bio as well as pictures and other information about my life and interests. It also includes contact information.",
        demoLink: "https://sebastianrb.github.io/developer-profile/",
        projectID: 2
    },
    {
        title: "React/Redux Weather App <div class='tech-used-button'><i class='fa fa-code' aria-hidden='true'></i></div><div class='tech-used-popup'><span>Technologies Used</span>React.js, Redux, Sass, Webpack, ES6</div>",
        description: "This weather app allows the user to search for a city and then makes calls to two external weather API's to provide weather forecasting and clothing recommendations. The site's content adjusts dynamically in response to new city searches.",
        demoLink: "http://sebastian-react-weather-app.surge.sh/",
        projectID: 2.5
    },
    {
        title: "Vue.js Photo Gallery <div class='tech-used-button'><i class='fa fa-code' aria-hidden='true'></i></div><div class='tech-used-popup'><span>Technologies Used</span>Vue.js, Sass, ES6</div>",
        description: "This is a photo gallery featuring some of my amateur photography work. The application is built using the Vue.js JavaScript framework.",
        demoLink: "https://sebastianrb.github.io/vue-photo-gallery/",
        projectID: 3
    },
    {
        title: "Tic Tac Toe <div class='tech-used-button'><i class='fa fa-code' aria-hidden='true'></i></div><div class='tech-used-popup'><span>Technologies Used</span>jQuery, Sass</div>",
        description: "This is a fully functional game of Tic Tac Toe. The computer opponent is moderately intelligent; it will win when possible and often try to block the player when the player is nearing victory. In addition, the computer will sometimes move first to keep things fair and interesting.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-08-Art-of-Modern-Frontend-Development/Chapter-02-Mastering-jQuery/Project-2-tic-tac-toe/",
        projectID: 4
    },
    {
        title: "Jigsaw Puzzle <div class='tech-used-button'><i class='fa fa-code' aria-hidden='true'></i></div><div class='tech-used-popup'><span>Technologies Used</span>Pure JavaScript, Pure CSS</div>",
        description: "This is a working jigsaw puzzle. The user can ask for hints, reset the game as needed, and increase the difficulty. Be warned: the puzzle is fairly challenging, so pay close attention to the three hints!",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/Chapter-04-JavaScript-Events-In-Depth/Project-2-Jigsaw-Puzzle/",
        projectID: -10
    },
    {
        title: "Evolution UI Framework <div class='tech-used-button'><i class='fa fa-code' aria-hidden='true'></i></div><div class='tech-used-popup'><span>Technologies Used</span>Pure JavaScript, jQuery, Sass, Gulp, Jekyll</div>",
        description: "Evolution UI is an <a href='https://github.com/evolution-ui/evolution-ui/tree/development' class='bov-link' target='_blank'>open-source front-end framework</a> comprising a library of innovative, unique web components, as well as a collection of standard components. I have contributed to and helped develop the project, and I now serve as a core maintainer.",
        demoLink: "https://evolution-ui.github.io/evolution-ui/",
        projectID: 5
    },
    {
        title: "Welcome!",
        description: 'This is my front-end web development portfolio. Here, you can check out a selection of my front-end work; choose a project from the list to see a description of the project and a link to it. <br/><br/> To learn more about me, feel free to check out my "Developer Profile".',
        projectID: 0
    },
    {
        title: "Minor Projects",
        description: "Here, you can view a selection of minor projects. These projects are relatively small in scale and less complex than the others, but nonetheless exhibit important technologies and development techniques. They include a Handlebars photo album, an AJAX fact generator, and a Regex link harvester.",
        demoLink: "#",
        projectID: 6
    }
    ];

//wip span : <span class='wip'> (work in progress)</span>
})();
