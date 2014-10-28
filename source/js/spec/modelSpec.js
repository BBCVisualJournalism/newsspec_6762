define(['lib/news_special/bootstrap', 'model/model'],  function (news, Model) {

    var bodyWidth1 = 360;
    var bodyWidth2 = 978;
    var thumbHeight1 = 73;
    var thumbHeight2 = 85;
    
    beforeEach(function () {
        news.$('body').append('<div class="main"><ul id="ns__hillsborough__list" class="ns__hillsborough__list">' +
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
    });

    describe('Model', function () {
        
        it('should have an init method', function () {
            var myModel = new Model();
            expect(myModel).not.toBeNull();
            expect(myModel.init).toBeDefined();
        });
        
        it('should have an assembleData method', function () {
            var myModel = new Model();
            expect(myModel.assembleData).toBeDefined();

            var dataList = myModel.assembleData('#ns__hillsborough__list li');
            expect(dataList.length).toEqual(news.$('#ns__hillsborough__list li').length);
            expect(dataList[0]['name']).toBeDefined();
            expect(dataList[0]['age']).toBeDefined();
            expect(dataList[0]['profile']).toBeDefined();
            expect(dataList[0]['storylink']).toBeDefined();
        });
        
        it('should have a setDataStore method', function () {
            var myModel = new Model();
            expect(myModel.setDataStore).toBeDefined();

            var dataList = myModel.assembleData('#ns__hillsborough__list li');
            // Run setDataStore()
            myModel.setDataStore(dataList);
            // Check dataStore contains the same number of items as our fixture markup
            expect(myModel.dataStore).toBeDefined();
            expect(myModel.dataStore.length).toEqual(news.$('#ns__hillsborough__list li').length);
        });

    });

});