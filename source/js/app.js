define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'controller/controller'], function (news, shareTools, Controller) {

    return {
        init: function (storyPageUrl) {

            news.pubsub.emit('istats', ['App initiated', true]);

            //shareTools.init('.main', storyPageUrl, 'Custom message');

            news.setIframeHeight(9999);

            news.hostPageSetup(function () {
                // console.log('do something in the host page');
            });

            var myParams = {
                containerId: 'ns__hillsborough__list',
                detailId: 'ns__hillsborough__detail',
                detailNavId: 'ns__hillsborough__detail-nav',
                introId: 'ns__hillsborough__intro',
                profileId: 'ns__hillsborough__current-profile',
                profilePicId: 'ns__hillsborough__profile-pic',
                filterId: 'ns__hillsborough__filter'
            };

            myController = new Controller();
            //myController.init('ns__hillsborough__list', 'ns__hillsborough__detail');
            myController.init(myParams);

        }
    };

});