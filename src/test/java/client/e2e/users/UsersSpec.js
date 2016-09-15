describe('Users page', function() {

    beforeEach(function () {
       browser.get('/users');
       waitUrl('/users');
    });

    function waitUrl(urlInput) {
        browser.wait(function () {
           return browser.getCurrentUrl().then(function (url) {
               return (url.indexOf(browser.baseUrl + urlInput) !== -1);
           })
        });
    }

    function checkAvailableElement(el) {
        browser.wait(protractor.ExpectedConditions.presenceOf(el), 10000);
    }

    it("Open user page", function () {
        expect(browser.getCurrentUrl()).toBe('http://localhost:8080/users');
        expect(element(by.binding('headingTitle')).getText()).toEqual('JDBC simple CRUD');
    });

    it("Add new user", function () {
        element(by.cssContainingText('.btn-success', 'ADD')).click();
        checkAvailableElement(element(by.cssContainingText('.modal-title', 'Add new user!')));
        checkAvailableElement(element(by.cssContainingText('.btn', 'Add')));
        checkAvailableElement(element(by.cssContainingText('.btn', 'Cancel')));

        expect(element(by.cssContainingText('.modal-title', 'Add new user!')).getText()).toEqual('Add new user!');
        element(by.model('user.name')).sendKeys('Test name');
        expect(element(by.model('user.name')).getAttribute('value')).toEqual("Test name");
        element(by.model('user.email')).sendKeys('emailTest@test.com');
        expect(element(by.model('user.email')).getAttribute('value')).toEqual("emailTest@test.com");
        element(by.model('user.mobile')).sendKeys('3800000008');
        expect(element(by.model('user.mobile')).getAttribute('value')).toEqual("3800000008");
        element(by.cssContainingText('.btn', 'Add')).click();
    });

    it("Check user list on available user", function () {
       checkAvailableElement(element(by.repeater('user in users.userList')));
       expect(element(by.repeater('user in users.userList').column('user.name')).getText()).toEqual('Test name');
       expect(element(by.repeater('user in users.userList').column('user.email')).getText()).toEqual('emailTest@test.com');
       expect(element(by.repeater('user in users.userList').column('user.mobile')).getText()).toEqual('3800000008');
    });

    it("Edit user from list", function () {
        checkAvailableElement(element(by.repeater('user in users.userList')));
        var user = element(by.repeater('user in users.userList').row(0));
        checkAvailableElement(user.element(by.css('.fa-pencil-square-o')));
        user.element(by.css('.fa-pencil-square-o')).click();
        user.element(by.model('user.name')).clear().sendKeys('Edit test name');
        expect(user.element(by.model('user.name')).getAttribute('value')).toEqual('Edit test name');
        user.element(by.model('user.email')).clear().sendKeys('EditEmailTest@test.com');
        expect(user.element(by.model('user.email')).getAttribute('value')).toEqual('EditEmailTest@test.com');
        user.element(by.model('user.mobile')).clear().sendKeys('390909090');
        expect(user.element(by.model('user.mobile')).getAttribute('value')).toEqual('390909090');
        checkAvailableElement(user.element(by.css('.btn-success')));
        user.element(by.css('.btn-success')).click();
    });

    it("Delete user from list", function () {
        checkAvailableElement(element(by.repeater('user in users.userList')));
        element(by.repeater('user in users.userList').row(0)).element(by.css('.btn-danger')).click();
        browser.sleep(100);
        expect(element.all(by.repeater('user in users.userList')).count()).toBe(0);
    });

    it("Test pagination", function () {
        var i = 0;
        while (i <= 20){
            browser.get('/users');
            waitUrl('/users');
            checkAvailableElement(element(by.cssContainingText('.btn-success', 'ADD')));
            element(by.cssContainingText('.btn-success', 'ADD')).click();
            checkAvailableElement(element(by.cssContainingText('.modal-title', 'Add new user!')));
            checkAvailableElement(element(by.cssContainingText('.btn', 'Add')));
            checkAvailableElement(element(by.cssContainingText('.btn', 'Cancel')));

            element(by.model('user.name')).sendKeys('Test name' + i);
            expect(element(by.model('user.name')).getAttribute('value')).toEqual("Test name" + i);
            element(by.model('user.email')).sendKeys('emailTest@test.com' + i);
            expect(element(by.model('user.email')).getAttribute('value')).toEqual("emailTest@test.com" + i);
            element(by.model('user.mobile')).sendKeys('3800000008' + i);
            expect(element(by.model('user.mobile')).getAttribute('value')).toEqual("3800000008" + i);

            element(by.cssContainingText('.btn', 'Add')).click();

            i ++;
        }
        browser.get('/users');
        waitUrl('/users');

        expect(element.all(by.repeater('page in pages')).count()).toBe(5);

        element(by.repeater('page in pages').row(0)).click();
        var user = element(by.repeater('user in users.userList').row(0));
        expect(user.element(by.binding('user.name')).getText()).toEqual('Test name20');
        expect(user.element(by.binding('user.email')).getText()).toEqual('emailTest@test.com20');
        expect(user.element(by.binding('user.mobile')).getText()).toEqual('380000000820');

        element(by.repeater('page in pages').row(3)).click();
        var user = element(by.repeater('user in users.userList').row(0));
        expect(user.element(by.binding('user.name')).getText()).toEqual('Test name5');
        expect(user.element(by.binding('user.email')).getText()).toEqual('emailTest@test.com5');
        expect(user.element(by.binding('user.mobile')).getText()).toEqual('38000000085');
    });

    it('Delete all users from list', function () {
        checkAvailableElement(element(by.repeater('user in users.userList')));
        var i = 0;
        while (i <= 20){
            browser.get('/users');
            waitUrl('/users');
            element(by.repeater('user in users.userList').row(0)).element(by.css('.btn-danger')).click();
            i ++;
        }
    })
    
});