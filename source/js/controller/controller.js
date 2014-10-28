/* TODO : remove the dependency on Dev and call to Dev.init() in release version - Dev is used to build the JSON file and console log it */

define(['lib/news_special/bootstrap', 'view/list', 'model/model'], function(news, ViewList, Model) {

    //var Controller = {};
    var Controller = function() {

        return this;
    }

    // controller calls init() to set up some values in the Controller. 
    Controller.prototype.init = function(params) {

        myModel = new Model();
        myModel.init('#' + params.containerId + ' li');

        myList = new ViewList();
        myList.init(params, myModel);

        this.addEventListeners(params);

        //news.pubsub.emit('init');
    }

    Controller.prototype.addEventListeners = function(params) {
        window.addEventListener('resize', function () {
            news.pubsub.emit('resize');
        }, false);

        // Hacky attempt to ensure hover behaviour isn't simulated by touchscreen devices
        var isTouch =  !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;

        if (!isTouch) {
            news.$('.ns__hillsborough__thumb').on('mouseover', function(ev) {
                news.pubsub.emit('thumb-hover', [ev]);
            });

            news.$('.ns__hillsborough__thumb').on('mouseout', function(ev) {
                news.pubsub.emit('thumb-out', [ev]);
            });
        }

        news.$('.ns__hillsborough__thumb').on('click', function(ev) {
            //console.log('controller, thumb-click: ');
            //console.log(ev);
            news.pubsub.emit('thumb-click', [ev]);
        });
    }

    // valid form submitted so update Controller then emit events of updated values
    Controller.prototype.updateDetails = function() {
        news.pubsub.emit('update');
        //send out istats
        /*news.istats.log(
            'navigation', // action type
            "newsSpecial", // action name
            {
                "view": 'results displyed' // view/description
            }
        );*/
    }

    //public api
    return Controller;

});