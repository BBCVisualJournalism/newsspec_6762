/* TODO : remove the dependency on Dev and call to Dev.init() in release version - Dev is used to build the JSON file and console log it */

define(['lib/news_special/bootstrap'], function(news) {

    var Model = function() {

        // The container element for the facewall
        this.dataStore = [];
        this.dataFields = ['name', 'age', 'sex', 'profile', 'storylink']; // imagePos + storyLink also needed
        this.sexes = ['female', 'male'];
        this.ageRanges = [
            {
                min: 10,
                max: 19
            },
            {
                min: 20,
                max: 29
            },
            {
                min: 30,
                max: 39
            },
            {
                min: 40,
                max: 49
            },
            {
                min: 50,
                max: 59
            },
            {
                min: 60,
                max: 67
            }
        ];

        return this;
    }

    // ViewList calls init() to set up some values in the ViewList. 
    Model.prototype.init = function(selector) {
        //console.log('Model, init');
        var listData = this.assembleData(selector);
        this.setDataStore(listData);
    }

    Model.prototype.assembleData = function(selector) {
        var myContainer = news.$(selector),
            myList = [],
            myModel = this;

        news.$(selector).each(function() {

            var myObj = {};

            for (var field in myModel.dataFields) if (myModel.dataFields.hasOwnProperty(field)) {
                if (myModel.dataFields[field] === 'storylink') {
                    var myLink = news.$(this).find('.ns__hillsborough__storylink').prop('href');
                    if (typeof myLink !== 'undefined') {
                        myObj[myModel.dataFields[field]] = news.$(this).find('.ns__hillsborough__storylink').prop('href');
                    }
                } else if (myModel.dataFields[field] === 'sex') {
                    myObj[myModel.dataFields[field]] = news.$(this).hasClass('ns__hillsborough--female') ? 'female' : 'male';
                } else {
                    myObj[myModel.dataFields[field]] = news.$(this).find('.ns__hillsborough__' + myModel.dataFields[field]).html();
                }
            }

            myList.push(myObj);
            
        });
        return myList;
    }

    Model.prototype.setDataStore = function(data) {
        this.dataStore = data;
        //console.log('this.dataStore:');
        //console.log(this.dataStore);
    }

    Model.prototype.getDataLength = function() {
        return this.dataStore.length;
    }

    //public api
    return Model;

});