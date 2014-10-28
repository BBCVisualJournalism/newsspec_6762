/* TODO : remove the dependency on Dev and call to Dev.init() in release version - Dev is used to build the JSON file and console log it */

define(['lib/news_special/bootstrap'], function(news) {

    //var ViewList = {};
    var ViewList = function() {

        // The container element for the facewall
        this.FACEWALL_CONTAINER = '';
        this.DETAIL_CONTAINER = '';

        // An offset to compensate for user agent margin
        this.BREAKPOINT_OFFSET = 16;

        this.ITEMS_PER_ROW = 6;

        this.breakpoints = [320, 480, 768, 974];
        this.thumbHeights = [73, 85];
        this.profilePicHeights = [132, 155];
        //this.thumbHeight = this.thumbHeights[0];
        this.thumbsEnabled = false;
        this.filteringEnabled = false;
        this.intro = true;

        this.model = {};

        this.currentProfile = -1;
        this.iframeOffset = {'top':0, 'left':0 };

        this.tracking = false;

        return this;
    }

    // ViewList calls init() to set up some values in the ViewList. 
    ViewList.prototype.init = function(params, model) {
        this.FACEWALL_CONTAINER = "#" + params.containerId;
        this.DETAIL_CONTAINER = "#" + params.detailId;
        this.model = model;


        // Determine screen width and set thumbnail size
        if (this.getViewportWidth() >= (this.breakpoints[0] - this.BREAKPOINT_OFFSET)) {
            // Add IDs and thumbnails
            var myViewList = this;

            news.pubsub.on('resize', function () {
                myViewList.handleResize(params);
            });

            // In case we haven't received the resize event        
            if (!myViewList.thumbsEnabled) {
                var myVpWidth = this.getViewportWidth();
                myViewList.addThumbs(myViewList.FACEWALL_CONTAINER + ' li');
                myViewList.setThumbs(myViewList.FACEWALL_CONTAINER + ' li', this.getThumbHeight(myVpWidth));
                myViewList.thumbsEnabled = true;

                if (this.getViewportWidth() >= (this.breakpoints[2] - this.BREAKPOINT_OFFSET)) {
                    myViewList.addProfileElt(params);
                    myViewList.addFilterElt(params);
                    news.$('#' + params.filterId + ' form').on('change', function(ev) {
                        news.pubsub.emit('filter-click', [ev, params]);
                    });
                    news.$('#ns__filter__controls .ns--reset label').on('click', function(ev) {
                        $('#ns__filter__controls').trigger("reset");
                        //function emitEvent() {
                        news.pubsub.emit('filter-click', [ev, params]);
                        //}
                        //setTimeout(emitEvent, 10);
                    });
                    news.$('#ns__filter__controls .ns--reset input').on('click', function(ev) {
                        //function emitEvent() {
                        news.pubsub.emit('filter-click', [ev, params]);
                        //}
                        //setTimeout(emitEvent, 10);
                    });
                }

                this.setLayout(myVpWidth, params);
            }
            

        }

        //news.pubsub.emit('init');
    }

    ViewList.prototype.getViewportWidth = function() {

        return document.body.clientWidth;
    }

    ViewList.prototype.getThumbHeight = function(viewportWidth) {

        var myThumbHeight = this.thumbHeights[0];
        if (viewportWidth >= (this.breakpoints[this.breakpoints.length - 1])) {
            myThumbHeight = this.thumbHeights[1];
        }
        
        return myThumbHeight;
    }

    ViewList.prototype.getProfilePicHeight = function(viewportWidth) {

        var myPicHeight = this.profilePicHeights[0];
        if (viewportWidth >= (this.breakpoints[this.breakpoints.length - 1])) {
            myPicHeight = this.profilePicHeights[1];
        }
        
        return myPicHeight;
    }

    ViewList.prototype.addThumbs = function(selector) {

        var myViewList = this,
            dataLength = news.$(selector).length;

        news.$(selector).each(function (i) {

            var myTooltipContent = news.$(this).find('.ns__hillsborough__name').html() +
            ', ' +
            news.$(this).find('.ns__hillsborough__age').html();

            //news.$(this).prop('id', 'ns__hillsborough--' + i);
            news.$(this).prepend('<a class="ns__hillsborough__thumb" href="#ns__hillsborough--' + i + '" data-tooltip="' + myTooltipContent + '"></a>');
        });
        news.$(this.FACEWALL_CONTAINER).addClass('ns__hillsborough--thumbs-enabled');
        news.$('.ns__hillsborough__thumb').on('click', function (ev) {
            ev.preventDefault();
            news.$(this).trigger('focus');
        });
    }

    ViewList.prototype.setThumbs = function(selector, myThumbHeight) {
        // Calculates and sets the background position for each thumbnail
        //console.log('set thumbs: ' + myThumbHeight);
        myViewList = this;
        news.$(selector).each(function (i) {
            var myBgPos = i === 0 ? 0 : '-' + myThumbHeight * i + 'px';
            news.$(this).find('.ns__hillsborough__thumb').css('background-position', '0 ' + myBgPos);
        });
    }

    ViewList.prototype.addProfileElt = function(params) {
        var myMarkup = '<div id="' + params.profileId + '" class="' + params.profileId + '"></div>';
        news.$('#' + params.detailId).append(myMarkup);
    }

    ViewList.prototype.addFilterElt = function(params) {

        var myListItems = '',
            myMarkup = '<div id="' + params.filterId + '" class="' + params.filterId + '">' +
                '<h3>' +
                    '<span id="ns__selection__total" class="ns__selection__total">' + this.model.dataStore.length + '</span> ' +
                    '<span id="ns__selection__sex" class="ns__selection__sex">people</span>' +
                '</h3>' +
                '<form id="ns__filter__controls" class="ns__filter__controls">' +
                    '<fieldset>' +
                        '<legend>Filter by age group</legend>' +
                        '<div>' +
                            '<label for="ns__age-group--0">10-19</label>' +
                            '<input id="ns__age-group--0" class="ns__age-group" value="10-19" type="checkbox" />' +
                        '</div>' +
                        '<div>' +
                            '<label for="ns__age-group--1">20-29</label>' +
                            '<input id="ns__age-group--1" class="ns__age-group" value="20-29" type="checkbox" />' +
                        '</div>' +
                        '<div>' +
                            '<label for="ns__age-group--2">30-39</label>' +
                            '<input id="ns__age-group--2" class="ns__age-group" value="30-39" type="checkbox" />' +
                        '</div>' +
                        '<div>' +
                            '<label for="ns__age-group--3">40-49</label>' +
                            '<input id="ns__age-group--3" class="ns__age-group" value="40-49" type="checkbox" />' +
                        '</div>' +
                        '<div>' +
                            '<label for="ns__age-group--4">50-59</label>' +
                            '<input id="ns__age-group--4" class="ns__age-group" value="50-59" type="checkbox" />' +
                        '</div>' +
                        '<div>' +
                            '<label for="ns__age-group--5">60-67</label>' +
                            '<input id="ns__age-group--5" class="ns__age-group" value="60-67" type="checkbox" />' +
                        '</div>' +
                    '</fieldset>' +
                    '<fieldset>' +
                        '<legend>Filter by sex</legend>' +
                        '<div>' +
                            '<label for="ns__sex--female">Female</label>' +
                            '<input id="ns__sex--female" value="Female" type="checkbox" />' +
                        '</div>' +
                        '<div>' +
                            '<label for="ns__sex--male">Male</label>' +
                            '<input id="ns__sex--male" value="Male" type="checkbox" />' +
                        '</div>' +
                    '</fieldset>' +
                    '<div class="ns--reset">' +
                        '<label for="ns__button--reset">Clear selection</label>' +
                        '<input id="ns__button--reset" value="" type="reset" />' +
                    '</div>' +
                '</form>' +
                '<ul id="ns__indicator" class="ns__indicator"></ul>' +
            '</div>';
        news.$('#' + params.detailId).append(myMarkup);

        for (var i in this.model.dataStore) if (this.model.dataStore.hasOwnProperty(i)) {
            myListItems += '<li class="ns--enabled"></li>';
        }
        news.$('#ns__indicator').append(myListItems);
    }

    ViewList.prototype.handleResize = function(params) {

        var myVpWidth = this.getViewportWidth(),
            myPicHeight = this.getProfilePicHeight(myVpWidth),
            myViewList = this;

        // Update the stored iframe offset value            
        try{
            myViewList.iframeOffset = news.$(window.parent.document).find('.responsive-iframe').offset();
        } catch (e) {
            myViewList.iframeOffset['top'] = 0;
            myViewList.iframeOffset['left'] = 0;
             //do something because not in an iFrame
        }

        // Clear the events so we don't keep stacking up extra ones every time there's a resize
        news.pubsub.off('thumb-hover');
        news.pubsub.off('thumb-out');
        news.pubsub.off('thumb-click');
        news.pubsub.off('name-click');
        news.pubsub.off('detail-nav-click');
        news.pubsub.off('filter-click');
        news.pubsub.off('reset-click');
        news.$('#ns__filter__controls .ns--reset label').off();
        news.$('#ns__filter__controls .ns--reset input').off();
        news.$('#' + params.filterId + ' form').off();

        if (myVpWidth >= (myViewList.breakpoints[2] - myViewList.BREAKPOINT_OFFSET)) {

            if (!news.$('#' + params.profileId).length) {
                myViewList.addProfileElt(params);
            }

            if (!news.$('#' + params.filterId).length) {
                myViewList.addFilterElt(params);
            }
            news.$('#' + params.filterId + ' form').on('change', function(ev) {
                news.pubsub.emit('filter-click', [ev, params]);
            });
            news.$('#ns__filter__controls .ns--reset label').on('click', function(ev) {
                $('#ns__filter__controls').trigger("reset");
                news.pubsub.emit('filter-click', [ev, params]);
            });
            news.$('#ns__filter__controls .ns--reset input').on('click', function(ev) {
                news.pubsub.emit('filter-click', [ev, params]);
            });

            news.$('#' + params.profilePicId).css('height', (myPicHeight - 1));
            myPicHeight = this.getProfilePicHeight(myVpWidth);
            news.$('#' + params.profilePicId).css('background-position', 'center ' + this.getProfilePicPos(myPicHeight));
            
            myViewList.setThumbs('#' + params.containerId + ' li', myViewList.getThumbHeight(myVpWidth));
                
            news.pubsub.on('thumb-hover', function (ev) {
                myViewList.updateTooltip(ev, params);
            }); 

            news.pubsub.on('thumb-out', function (ev) {
                myViewList.hideTooltip();
            }); 

            news.pubsub.on('name-click', function (hrefHash) {
                news.$('.ns__hillsborough__thumb[href=' + hrefHash + ']').trigger('click');
            });
                
            news.pubsub.on('thumb-click', function (ev) {
                if (!news.$('#' + params.detailNavId).length) {
                    myViewList.addDetailNav(params);

                    news.$('#' + params.detailId + ' a').on('click', function(ev) {
                        news.pubsub.emit('detail-nav-click', [ev, params]);
                    });
                }
                myViewList.updateProfile(ev, params);
                myViewList.displayProfile(params);
                myViewList.setDetailsPos(params);
                if (!news.$('#ns__hillsborough__reset-link').length) {
                    myViewList.addResetLink(params);

                    news.$('#ns__hillsborough__reset-link').on('click', function(ev) {
                        news.pubsub.emit('detail-nav-click', [ev, params]);
                    });
                }
                //myViewList.setDetailsPosToThumbPos(ev, params); // !!!
                news.istats.log(
                    'facewall view', // action type
                    "newsSpecial", // action name
                    {
                        "view": 'clicked thumbnail image' // view/description
                    }
                );
            });

            if (myViewList.thumbsEnabled === false) {
                myViewList.thumbsEnabled = true;
            }
                
            news.pubsub.on('detail-nav-click', function (ev, params) {
                if (news.$(ev.currentTarget).prop('id') === 'ns__hillsborough__profile-link') {
                    ev.preventDefault();
                    myViewList.highlightCurrentProfileThumb(params);
                    myViewList.displayProfile(params);
                } else if (news.$(ev.currentTarget).prop('id') === 'ns__hillsborough__filter-link') {
                 ev.preventDefault();
                    myViewList.displayFilters(params);
                    if (myViewList.filteringEnabled) {
                        myViewList.filterDataView(ev, params);
                    }
                } else if (news.$(ev.currentTarget).prop('id') === 'ns__hillsborough__reset-link') {
                    news.pubsub.emit('reset-click', [ev, params]);
                } else {
                    ev.preventDefault();
                    //
                }
                if (!myViewList.tracking) {
                    myViewList.tracking = true;
                    news.istats.log(
                        'rhs view', // action type
                        "newsSpecial", // action name
                        {
                            "view": 'changed state' // view/description
                        }
                    );
                }
            });
                
            news.pubsub.on('filter-click',function (ev, params) {
                myViewList.filterDataView(ev, params);
                news.istats.log(
                    'rhs view', // action type
                    "newsSpecial", // action name
                    {
                        "view": 'clicked filter controls' // view/description
                    }
                );
            });
                
            news.pubsub.on('reset-click',function (ev, params) {
                $('#ns__filter__controls').trigger("reset");

                myViewList.resetThumbs(params);
                myViewList.displayIntro(params);
                myViewList.filterDataView(ev, params);
                // Set selected tab to 'Profile'

                news.istats.log(
                    'rhs view', // action type
                    "newsSpecial", // action name
                    {
                        "view": 'clicked reset link' // view/description
                    }
                );
            });

            myViewList.setDetailsPos(params);

        } else {
            myViewList.setThumbs('#' + params.containerId + ' li', myViewList.getThumbHeight(myVpWidth));
            //news.pubsub.off('thumb-click');
            //news.pubsub.off('detail-nav-click');
            //news.pubsub.off('filter-click');
            //news.pubsub.off('reset-click');
        }
        // myViewList.setLayout(myVpWidth, params);
        // hack to fix iPad on responsive site
        if (news.$(window.parent.document).find('.c-open').length > 0) {
            myViewList.setLayout(parseInt(news.$(window.parent.document).find('.c-open').css('width')), params);
        } else {
            myViewList.setLayout(myVpWidth, params);
        }
    }

    ViewList.prototype.setLayout = function(myVpWidth, params) {
        var myViewList = this;

        news.$(window.parent.document).find('.responsive-iframe').offset()

        //console.log('myVpWidth: ' + myVpWidth);
        //console.log('parentElt: ' + parseInt(news.$(window.parent.document).find('.c-open').css('width')));
        if (myVpWidth >= (this.breakpoints[2] - this.BREAKPOINT_OFFSET)) {
            news.$('#' + params.containerId).parent().addClass('ns__hillsborough--grid-layout');

            if (!news.$('#ns__hillsborough__tooltip').length > 0) {
                myViewList.addTooltip(params);
            }
            //console.log('addClass, myVpWidth: ' + myVpWidth);
            if (news.$('#' + params.detailId).hasClass('ns__intro--enabled')) {
                myViewList.disableAutomaticRepositioning(params); // !!!
            } else {
                myViewList.enableAutomaticRepositioning(params); // !!!
            }
        } else {
            news.$('#' + params.containerId).parent().removeClass('ns__hillsborough--grid-layout');
            //console.log('removeClass, myVpWidth: ' + myVpWidth);
            myViewList.disableAutomaticRepositioning(params); // !!!
        }
    }

    ViewList.prototype.enableAutomaticRepositioning = function(params) {

        // This code repositions the details module within the iframe when we scroll in the parent window
        news.$(window.parent.document, window.parent.document).ready(function () {
            var scrollingDiv = news.$('#' + params.detailId);
            news.$(window.parent, window.parent.document).scroll(function () {
                
                // disable scrolling if we're still in the intro, but doing it here 
                // is not the most efficient solution!
                if (!myViewList.intro) {
                    scrollingDiv
                    .stop()
                    .css('margin-top', myViewList.getScrollPos(
                        news.$(window.parent, window.parent.document).scrollTop(),
                        params
                    ) + "px");
                }

            });
        });

    }

    ViewList.prototype.disableAutomaticRepositioning = function(params) {
        var scrollingDiv = news.$('#' + params.detailId);
        scrollingDiv.css('margin-top', 0);
        news.$(window.parent, window.parent.document).unbind('scroll');
    }

    ViewList.prototype.addTooltip = function(params) {
        news.$('#' + params.containerId).after('<div id="ns__hillsborough__tooltip" class="ns__hillsborough__tooltip">Lorem ipsum</div>');
    }

    ViewList.prototype.updateTooltip = function(ev, params) {
        var myTooltipText = news.$(ev.currentTarget).attr('data-tooltip');
        news.$('#ns__hillsborough__tooltip').html(myTooltipText);
        this.setTooltipPos(ev, params);
        news.$('#ns__hillsborough__tooltip').css('display', 'block');
    }

    ViewList.prototype.hideTooltip = function() {
        news.$('#ns__hillsborough__tooltip').css('display', 'none');
    }

    ViewList.prototype.setTooltipPos = function(ev, params) {
        var myTargetHeight = Math.round(parseInt(news.$(ev.currentTarget).css('height'))),
            myTargetWidth = Math.round(parseInt(news.$(ev.currentTarget).css('width'))),
            myTargetTop = Math.round(news.$(ev.currentTarget).offset().top),
            myTargetLeft = Math.round(news.$(ev.currentTarget).offset().left),
            myTooltipHeight = Math.round(parseInt(news.$('#ns__hillsborough__tooltip').css('height'))),
            myTooltipWidth = Math.round(parseInt(news.$('#ns__hillsborough__tooltip').css('width'))),
            myTopPos = 0,
            myLeftPos = 0,
            myContainerOffsetLeft = Math.round(news.$('.ns__hillsborough--grid-layout').offset().left),
            myThumbsGridHeight = news.$('#' + params.containerId).outerHeight(),
            myThumbsGridWidth = news.$('#' + params.containerId).outerWidth(),
            myRightBoundary = 0;

        myRightBoundary = this.getViewportWidth() >= this.breakpoints[this.breakpoints.length - 1] ? 
            (6 * 82) + (5 * parseInt(news.$(ev.currentTarget).parent().css('margin-right'))) - 8 :
            (6 * 70) + (5 * parseInt(news.$(ev.currentTarget).parent().css('margin-right')));

        myLeftPos = (myTargetLeft - myContainerOffsetLeft) > (myThumbsGridWidth - myTooltipWidth) ? 
            (myRightBoundary - myTooltipWidth) :
            (myTargetLeft - myContainerOffsetLeft);

        myTopPos = myTargetTop > (myThumbsGridHeight - myTargetHeight) ? 
            (myTargetTop - (myTargetHeight + (parseInt(news.$(ev.currentTarget).parent().css('margin-bottom')) * 2))) :
            (myTargetTop + myTargetHeight);

        news.$('#ns__hillsborough__tooltip').css('top', myTopPos + 'px');
        news.$('#ns__hillsborough__tooltip').css('left', myLeftPos + 'px');    
    }

    ViewList.prototype.getScrollPos = function(myScrollTop, params) {
        var containerHeight = news.$('#' + params.containerId).outerHeight(),
            floatingEltHeight = news.$('#' + params.detailId).outerHeight(),
            scrollBreakPoint = (containerHeight + this.iframeOffset['top']) - floatingEltHeight,
            maxScrollPos = containerHeight - floatingEltHeight,
            optimumScrollPos = myScrollTop, // The ideal position, if there's enough room
            totalOffset = 0;

        //totalOffset = this.iframeOffset['top'];

        optimumScrollPos = myScrollTop > this.iframeOffset['top'] ? myScrollTop - this.iframeOffset['top'] : 0;

        return myScrollTop >= scrollBreakPoint ? maxScrollPos : optimumScrollPos;
    }

    ViewList.prototype.resetThumbs = function(params) {
        news.$('#' + params.containerId + ' li').removeClass('ns--disabled');
    }

    ViewList.prototype.displayIntro = function(params) {
        news.$('#' + params.profileId).html('');
        news.$('#' + params.detailId).removeClass('ns__profile--enabled');
        news.$('#' + params.detailId).removeClass('ns__filter--enabled');
        news.$('#' + params.detailId).addClass('ns__intro--enabled');
        this.disableAutomaticRepositioning(params);
    }

    ViewList.prototype.displayProfile = function(params) {
        news.$('#' + params.detailId).removeClass('ns__intro--enabled');
        news.$('#' + params.detailId).removeClass('ns__filter--enabled');
        news.$('#' + params.detailId).addClass('ns__profile--enabled');
        this.enableAutomaticRepositioning(params);
    }

    ViewList.prototype.displayFilters = function(params) {
        news.$('#' + params.detailId).removeClass('ns__intro--enabled');
        news.$('#' + params.detailId).removeClass('ns__profile--enabled');
        news.$('#' + params.detailId).addClass('ns__filter--enabled');
        this.enableAutomaticRepositioning(params);
    }

    ViewList.prototype.getProfilePicPos = function(picHeight) {
        return this.currentProfile === 0 ? 0 : '-' + picHeight * this.currentProfile + 'px';
    }

    ViewList.prototype.addDetailNav = function(params) {
        news.$('#' + params.introId).after('<div id="' + params.detailNavId + '" class="' + params.detailNavId + '">' +
                '<a id="ns__hillsborough__profile-link" class="ns__hillsborough__profile-link" href="#' + params.profileId + '" class>Profile</a>' +
                '<a id="ns__hillsborough__filter-link" class="ns__hillsborough__filter-link" href="#' + params.filterId + '" class>The 96 by age</a>' +
            '</div>'
        );
    }

    ViewList.prototype.addResetLink = function(params) {
        news.$('#' + params.detailId).append('<a id="ns__hillsborough__reset-link" class="ns__hillsborough__reset-link" href="#ns__hillsborough--0" class>Return to introduction</a>');
    }

    // valid form submitted so update ViewList then emit events of updated values
    ViewList.prototype.updateProfile = function(evObj, params) {
        var myVpWidth = this.getViewportWidth(),
            myPicHeight = this.getProfilePicHeight(myVpWidth),
            //myIndex = news.$(evObj.currentTarget).parent().index(),
            myProfileData = {},
            myMarkup = '<div id="' + params.profileId + '" class="' + params.profileId + '">',
            myBgPos = 0;

        // Clear any previously added event for .ns__hillsborough__link--companion
        news.$('.ns__hillsborough__link--companion').off();

        this.currentProfile = news.$(evObj.currentTarget).parent().index();
        myProfileData = this.model.dataStore[this.currentProfile];

        myBgPos = this.getProfilePicPos(myPicHeight);
        myMarkup += '<div id="' + params.profilePicId + '" class="' + params.profilePicId + '" style="height: ' + (myPicHeight - 1) + 'px; background-position: ' + 'center ' + myBgPos + '"></div>';
        myMarkup += '<h2>' + myProfileData['name'] + ', ' + myProfileData['age'] + '</h2>';
        myMarkup += '<p class="ns__hillsborough__profile">' + myProfileData['profile'] + '</p>';

        if (typeof myProfileData['storylink'] !== 'undefined') {
            myMarkup += '<a class="ns__hillsborough__storylink" href="' + myProfileData['storylink'] + '" target="ns__linkout">Full story (opens in a new browser window)</a>';
        }
        myMarkup += '</div>';

        news.$('#' + params.detailId).addClass('ns__detail--enabled');
        this.intro = false;
        //news.$('#' + params.detailId).addClass('ns__profile--enabled');
        news.$('#' + params.profileId).replaceWith(myMarkup);

        news.$('.ns__hillsborough__link--companion').on('click', function(ev) {
            news.pubsub.emit('name-click', [news.$(ev.currentTarget).attr('href')]);
        });

        this.highlightCurrentProfileThumb(params);

        //send out istats
        /*news.istats.log(
            'navigation', // action type
            "newsSpecial", // action name
            {
                "view": 'profile displayed' // view/description
            }
        );*/
    }

    ViewList.prototype.setDetailsPos = function(params) {

        myViewList = this;

        if (!myViewList.intro) {
        
            news.$('#' + params.detailId).css('margin-top', myViewList.getScrollPos(
                news.$(window.parent, window.parent.document).scrollTop(),
                params
            ) + "px");

        }
    }

    ViewList.prototype.setDetailsPosToThumbPos = function(evObj, params) {
        
        news.$('#' + params.detailId).css('margin-top', news.$(evObj.currentTarget).offset().top + 'px');
    }

    ViewList.prototype.highlightCurrentProfileThumb = function(params) {
        // Knock back the thumbnails
        news.$('#' + params.containerId + ' li').addClass('ns--disabled');
        // except for the active one
        news.$('#' + params.containerId + ' li:eq(' + this.currentProfile + ')').removeClass('ns--disabled');
    }

    ViewList.prototype.filterDataView = function(evObj, params) {

        // store the array indexes of items in dataStore which pass the filters selected
        var myFilteredIndexes = [],
            sexesSelected = [],
            ageRangesSelected = [];

        this.filteringEnabled = true;

        // Which sexes has the user selected?
        for (var i = 0; i < this.model.sexes.length; i++) {
            if (document.getElementById('ns__sex--' + this.model.sexes[i]).checked) {
                sexesSelected.push(this.model.sexes[i]);
            }
        }
        if (sexesSelected.length < 1) {
            sexesSelected = this.model.sexes;
        }

        // Which age ranges has the user selected?
        for (var i = 0; i < news.$('.ns__age-group').length; i++) {
            var myAgeRangeArray = [],
                myAgeRangeObj = {};
            if (document.getElementById('ns__age-group--' + i).checked) {
                myAgeRangeArray = (document.getElementById('ns__age-group--' + i).value).split('-');
                myAgeRangeObj = {
                    min: myAgeRangeArray[0],
                    max: myAgeRangeArray[1],
                }
                ageRangesSelected.push(myAgeRangeObj);
            }
        }
        if (ageRangesSelected.length < 1) {
            ageRangesSelected = this.model.ageRanges;
        }
        //console.log('ageRangesSelected:');
        //console.log(ageRangesSelected);

        for (var i = 0; i < this.model.dataStore.length; i++) {

            var passFilterBySex = this.testFilterBySex(sexesSelected, i);
            var passFilterByAgeRange = this.testFilterByAgeRange(ageRangesSelected, i);

            if (passFilterBySex && passFilterByAgeRange) {
                myFilteredIndexes.push(i);
            }
        }

        news.$('#' + params.containerId + ' li').addClass('ns--disabled');
        news.$('#' + params.filterId + ' .ns__indicator li').removeClass('ns--enabled');

        //console.log('myFilteredIndexes:');
        //console.log(myFilteredIndexes);

        for (var i = 0; i < myFilteredIndexes.length; i++) {
            news.$('#' + params.filterId + ' .ns__indicator li:eq(' + i + ')').addClass('ns--enabled');
            news.$('#ns__hillsborough--' + myFilteredIndexes[i]).removeClass('ns--disabled');
        }

        // Update the filters header
        news.$('#ns__selection__total').html(myFilteredIndexes.length);
        if (myFilteredIndexes.length === 1) {
            news.$('#ns__selection__sex').html('person');
        } else {
            news.$('#ns__selection__sex').html('people');
        }
    }

    ViewList.prototype.testFilterBySex = function(sexesArray, index) {

        var passFilterBySex = false;
        for (var i = 0; i < sexesArray.length; i++) {
            if (sexesArray[i] === this.model.dataStore[index]['sex']) {
                passFilterBySex = true;
            }
        }

        return passFilterBySex;
    }

    ViewList.prototype.testFilterByAgeRange = function(ageRangesArray, index) {

        var passFilterByAgeRange = false;
        for (var i = 0; i < ageRangesArray.length; i++) {
            if (ageRangesArray[i]['min'] <= this.model.dataStore[index]['age'] &&
                ageRangesArray[i]['max'] >= this.model.dataStore[index]['age']) {
                passFilterByAgeRange = true;
            }
        }

        return passFilterByAgeRange;
    }


    //public api
    return ViewList;

});