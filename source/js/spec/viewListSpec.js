define(['lib/news_special/bootstrap', 'view/list', 'model/model'],  function (news, ViewList, Model) {

    var bodyWidth1 = 360;
    var bodyWidth2 = 978;
    var thumbHeight1 = 73;
    var thumbHeight2 = 85;
    var profilePicHeight1 = 132;
    var profilePicHeight2 = 155;
    
    beforeEach(function () {
        news.$('body').append('<div id="ns__hillsborough__detail" class="ns__hillsborough__detail">' +
                '<div id="ns__hillsborough__intro" class="ns__hillsborough__intro">' +
                    '<h2>Introduction</h2>' +
                    '<p>' +
                        'On 15 April 1989, at the start of an FA Cup semi-final, a crush on the steel-fenced terraces of Sheffield Wednesday\'s Hillsborough stadium resulted in the death of 96 Liverpool fans and left hundreds more injured.' +
                    '</p>' +
                '</div>' +
            '</div>' +


            '<div class="main"><ul id="ns__hillsborough__list" class="ns__hillsborough__list">' +
           ' <li id="ns__hillsborough--0" class="">' +
                '<h2 class="ns__hillsborough__name">John Alfred Anderson</h2>' +
                '<span class="ns__hillsborough__age">62</span>' +
                '<p class="ns__hillsborough__profile">John Anderson attended the match with two friends and his adult son, Brian. The foursome drove to the ground and parked near the railway station. They went for a quick drink in a pub before setting off for the ground and arrived at the turnstiles at 2.25pm. Finding that area packed they entered the ground through an exit gate which had just been opened. Both John and Brian were caught in the ensuing crush but Brian survived after being pulled to safety. He later saw his father\'s body laid outside the ground and stayed with him a while.</p>' +
                '<a class="ns__hillsborough__storylink" href="http://www.bbc.co.uk/news/uk-england-26901582" target="ns__linkout">Full story (opens in a new browser window)</a>' +
            '</li>' +
            '<li id="ns__hillsborough--1" class="">' +
                '<h2 class="ns__hillsborough__name">Colin Mark Ashcroft</h2>' +
                '<span class="ns__hillsborough__age">19</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
            '<li id="ns__hillsborough--2" class="">' +
                '<h2 class="ns__hillsborough__name">James Gary Aspinall</h2>' +
                '<span class="ns__hillsborough__age">18</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
            '<li id="ns__hillsborough--3" class="">' +
                '<h2 class="ns__hillsborough__name">Colin Mark Ashcroft</h2>' +
                '<span class="ns__hillsborough__age">19</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
            '<li id="ns__hillsborough--4" class="">' +
                '<h2 class="ns__hillsborough__name">James Gary Aspinall</h2>' +
                '<span class="ns__hillsborough__age">18</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
            '<li id="ns__hillsborough--5" class="">' +
                '<h2 class="ns__hillsborough__name">Colin Mark Ashcroft</h2>' +
                '<span class="ns__hillsborough__age">19</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
            '<li id="ns__hillsborough--6" class="">' +
                '<h2 class="ns__hillsborough__name">James Gary Aspinall</h2>' +
                '<span class="ns__hillsborough__age">18</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
            '<li id="ns__hillsborough--7" class="">' +
                '<h2 class="ns__hillsborough__name">Colin Mark Ashcroft</h2>' +
                '<span class="ns__hillsborough__age">19</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
            '<li id="ns__hillsborough--8" class="">' +
                '<h2 class="ns__hillsborough__name">James Gary Aspinall</h2>' +
                '<span class="ns__hillsborough__age">18</span>' +
                '<p class="ns__hillsborough__profile"></p>' +
                '<a href="">Full story</a>' +
            '</li>' +
        '</ul></div></div>');
        news.$('body').css('width', bodyWidth1 + 'px');
    });

    afterEach(function () {
        news.$('.main').remove();
        news.$('.ns__hillsborough__detail').remove();
    });

    describe('ViewList', function () {
        //ViewList.init();
        
        it('should have an init method', function () {
            var myViewList = new ViewList();
            expect(myViewList).not.toBeNull();
            expect(myViewList.init).toBeDefined();

            var myModel = new Model();
            myModel.init('#ns__hillsborough__list li');


            var myParams = {
                containerId: 'ns__hillsborough__list',
                detailId: 'ns__hillsborough__detail',
                introId: 'ns__hillsborough__intro',
                profileId: 'ns__hillsborough__current-profile',
                profilePicId: 'ns__hillsborough__profile-pic',
                filterId: 'ns__hillsborough__filter'
            };

            myViewList.init(myParams, myModel);
            expect(myViewList.model).toBeDefined();
            expect(myViewList.model.dataStore).toBeDefined();
            expect(myViewList.model.dataStore[0]).toBeDefined();
            expect(myViewList.model.dataStore[0]['name']).toEqual('John Alfred Anderson');

            //expect(news.$('#ns__hillsborough__current-profile').length).toBeGreaterThan(0);
        });

        it('should have a getViewportWidth method', function () {
            var myViewList = new ViewList();
            expect(myViewList.getViewportWidth).toBeDefined();

            var myVpWidth = myViewList.getViewportWidth();
            expect(myVpWidth).toEqual(bodyWidth1);

            news.$('body').css('width', bodyWidth2 + 'px');
            myVpWidth = myViewList.getViewportWidth();
            expect(myVpWidth).toEqual(bodyWidth2);
        });

        it('should have a getThumbHeight method', function () {
            var myViewList = new ViewList();
            expect(myViewList.getThumbHeight).toBeDefined();

            var myVpWidth = myViewList.getViewportWidth();
            var myThumbHeight = myViewList.getThumbHeight(myVpWidth);
            //expect(myThumbHeight).toEqual(thumbHeight1);

            news.$('body').css('width', bodyWidth2 + 'px');
            myVpWidth = myViewList.getViewportWidth();
            //expect(myVpWidth).toEqual(bodyWidth2);
            myThumbHeight = myViewList.getThumbHeight(myVpWidth);
           //expect(myThumbHeight).toEqual(thumbHeight2);

        });

        it('should have a getProfilePicHeight method', function () {
            var myViewList = new ViewList();
            expect(myViewList.getProfilePicHeight).toBeDefined();

            var myVpWidth = myViewList.getViewportWidth();
            var myProfilePicHeight = myViewList.getProfilePicHeight(myVpWidth);
            expect(myProfilePicHeight).toEqual(profilePicHeight1);

            news.$('body').css('width', bodyWidth2 + 'px');
            myVpWidth = myViewList.getViewportWidth();
            //expect(myVpWidth).toEqual(bodyWidth2);
            myProfilePicHeight = myViewList.getProfilePicHeight(myVpWidth);
            expect(myProfilePicHeight).toEqual(profilePicHeight2);
        });

        it('should have an addThumbs method', function () {
            var myViewList = new ViewList();
            expect(myViewList.addThumbs).toBeDefined();
            expect(news.$('.ns__hillsborough__thumb').length).toEqual(0);

            var myVpWidth = myViewList.getViewportWidth();
            var myThumbHeight = myViewList.getThumbHeight(myVpWidth);

            myViewList.addThumbs('.ns__hillsborough__list li');
            expect(news.$('.ns__hillsborough__thumb').length).toEqual(news.$('.ns__hillsborough__list li').length);

        });

        it('should have a setThumbs method', function () {
            var myViewList = new ViewList();
            expect(myViewList.setThumbs).toBeDefined();

            var myVpWidth = myViewList.getViewportWidth();
            var myThumbHeight = myViewList.getThumbHeight(myVpWidth);

            myViewList.addThumbs('.ns__hillsborough__list li');
            //expect(news.$('.ns__hillsborough__thumb').length * thumbHeight1).toEqual(news.$('.ns__hillsborough__list li').length * myThumbHeight);

            news.$('body').css('width', bodyWidth2 + 'px');
            myVpWidth = myViewList.getViewportWidth();
            myThumbHeight = myViewList.getThumbHeight(myVpWidth);
            //expect(news.$('.ns__hillsborough__thumb').length * thumbHeight2).toEqual(news.$('.ns__hillsborough__list li').length * myThumbHeight);

        });

        it('should have a handleResize method', function () {
            var myViewList = new ViewList();
            expect(myViewList.handleResize).toBeDefined();
            /*
            expect(myViewList.thumbsEnabled).toEqual(false);



            var myModel = new Model();
            myModel.init('#ns__hillsborough__list li');


            var myParams = {
                containerId: 'ns__hillsborough__list',
                detailId: 'ns__hillsborough__detail',
                introId: 'ns__hillsborough__intro',
                profileId: 'ns__hillsborough__current-profile',
                profilePicId: 'ns__hillsborough__profile-pic',
                filterId: 'ns__hillsborough__filter'
            };

            myViewList.init(myParams, myModel);

            //news.$('body').css('width', 160 + 'px');

            var myVpWidth = myViewList.getViewportWidth();
            var myThumbHeight = myViewList.getThumbHeight(myVpWidth);
            myViewList.handleResize('.ns__hillsborough__list');

            //expect(myViewList.thumbsEnabled).toEqual(false);

            news.$('body').css('width', bodyWidth1 + 'px');
            myVpWidth = myViewList.getViewportWidth();
            myViewList.handleResize('.ns__hillsborough__list');

            expect(myViewList.thumbsEnabled).toEqual(true);

            news.$('body').css('width', bodyWidth2 + 'px');
            myVpWidth = myViewList.getViewportWidth();
            myViewList.handleResize('.ns__hillsborough__list');

            expect(myViewList.thumbsEnabled).toEqual(true);
            */
        });

        it('should have a setLayout method', function () {
            var myViewList = new ViewList();
            expect(myViewList.setLayout).toBeDefined();

            var myParams = {
                containerId: 'ns__hillsborough__list',
                detailId: 'ns__hillsborough__detail',
                introId: 'ns__hillsborough__intro',
                profileId: 'ns__hillsborough__current-profile',
                profilePicId: 'ns__hillsborough__profile-pic',
                filterId: 'ns__hillsborough__filter'
            };

            expect(news.$('#ns__hillsborough__list').parent().hasClass('ns__hillsborough--grid-layout')).toBeFalsy();

            myViewList.setLayout(bodyWidth2, myParams);
            expect(news.$('#ns__hillsborough__list').parent().hasClass('ns__hillsborough--grid-layout')).toBeTruthy();

            myViewList.setLayout(bodyWidth1, myParams);
            expect(news.$('#ns__hillsborough__list').parent().hasClass('ns__hillsborough--grid-layout')).toBeFalsy();

        });

        it('should have a getScrollPos method', function () {
            var myViewList = new ViewList();
            expect(myViewList.getScrollPos).toBeDefined();

        });

        it('should have an updateProfile method', function () {

            var myViewList = new ViewList();
            expect(myViewList.updateProfile).toBeDefined();

            var myModel = new Model();
            myModel.init('#ns__hillsborough__list li');

            var myParams = {
                containerId: 'ns__hillsborough__list',
                detailId: 'ns__hillsborough__detail',
                introId: 'ns__hillsborough__intro',
                profileId: 'ns__hillsborough__current-profile',
                profilePicId: 'ns__hillsborough__profile-pic',
                filterId: 'ns__hillsborough__filter'
            };

            myViewList.init(myParams, myModel);
            var myVpWidth = myViewList.getViewportWidth();
            var myThumbHeight = myViewList.getThumbHeight(myVpWidth);
            var myProfilePicHeight = myViewList.getProfilePicHeight(myVpWidth);

            myViewList.addThumbs('#ns__hillsborough__list li');

            var mockEvent = {
                currentTarget: '#ns__hillsborough--0 .ns__hillsborough__thumb'
            };

            myViewList.updateProfile(mockEvent, myParams);
            //expect(parseInt(news.$('.ns__hillsborough__profile-pic').css('height'), 10) + 1).toEqual(myProfilePicHeight);

            news.$('body').css('width', bodyWidth2 + 'px');
            myVpWidth = myViewList.getViewportWidth();
            
            myProfilePicHeight = myViewList.getProfilePicHeight(myVpWidth);
            myViewList.updateProfile(mockEvent, myParams);
            //expect(parseInt(news.$('.ns__hillsborough__profile-pic').css('height'), 10) + 1).toEqual(myProfilePicHeight);

        });

        it('should have a enableAutomaticRepositioning method', function () {
            var myViewList = new ViewList();
            expect(myViewList.enableAutomaticRepositioning).toBeDefined();
        });

        it('should have a disableAutomaticRepositioning method', function () {
            var myViewList = new ViewList();
            expect(myViewList.disableAutomaticRepositioning).toBeDefined();
        });

        it('should have a getProfilePicPos method', function () {
            var myViewList = new ViewList();
            expect(myViewList.getProfilePicPos).toBeDefined();
        });

        it('should have a setDetailsPos method', function () {
            var myViewList = new ViewList();
            expect(myViewList.setDetailsPos).toBeDefined();
        });

        it('should have a setDetailsPosToThumbPos method', function () {
            var myViewList = new ViewList();
            expect(myViewList.setDetailsPosToThumbPos).toBeDefined();
        });

        it('should have an addDetailNav method', function () {
            var myViewList = new ViewList();
            expect(myViewList.addDetailNav).toBeDefined();

        });

        it('should have an filterDataView method', function () {
            var myViewList = new ViewList();
            expect(myViewList.filterDataView).toBeDefined();
        });

        it('should have a displayProfile method', function () {
            var myViewList = new ViewList();
            expect(myViewList.displayProfile).toBeDefined();
        });

        it('should have a displayFilters method', function () {
            var myViewList = new ViewList();
            expect(myViewList.displayFilters).toBeDefined();
        });

        it('should have a testFilterBySex method', function () {
            var myViewList = new ViewList();
            expect(myViewList.testFilterBySex).toBeDefined();
        });

        it('should have a testFilterByAgeRange method', function () {
            var myViewList = new ViewList();
            expect(myViewList.testFilterByAgeRange).toBeDefined();
        });

        it('should have a highlightCurrentProfileThumb method', function () {
            var myViewList = new ViewList();
            expect(myViewList.highlightCurrentProfileThumb).toBeDefined();
        });

        it('should have a resetThumbs method', function () {
            var myViewList = new ViewList();
            expect(myViewList.resetThumbs).toBeDefined();
        });

        it('should have a displayIntro method', function () {
            var myViewList = new ViewList();
            expect(myViewList.displayIntro).toBeDefined();
        });

        it('should have an addTooltip method', function () {
            var myViewList = new ViewList();
            expect(myViewList.addTooltip).toBeDefined();
        });

        it('should have an updateTooltip method', function () {
            var myViewList = new ViewList();
            expect(myViewList.updateTooltip).toBeDefined();
        });

        it('should have an hideTooltip method', function () {
            var myViewList = new ViewList();
            expect(myViewList.hideTooltip).toBeDefined();
        });

        it('should have an setTooltipPos method', function () {
            var myViewList = new ViewList();
            expect(myViewList.setTooltipPos).toBeDefined();
        });

        it('should have an addResetLink method', function () {
            var myViewList = new ViewList();
            expect(myViewList.addResetLink).toBeDefined();
        });



    });

});