'use strict';

define('dummy/tests/acceptance/ember-shepherd-test', ['ember-native-dom-helpers', 'qunit', '@ember/test-helpers', 'ember-window-mock', 'ember-qunit', 'ember-sinon-qunit/test-support/test', 'dummy/tests/data'], function (_emberNativeDomHelpers, _qunit, _testHelpers, _emberWindowMock, _emberQunit, _test, _data) {
  'use strict';

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var tour = void 0;

  (0, _qunit.module)('Acceptance | Tour functionality tests', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    hooks.beforeEach(function () {
      tour = this.owner.lookup('service:tour');
      tour.setProperties({
        steps: _data.default,
        confirmCancel: false,
        modal: false,
        defaults: {
          classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
          scrollTo: true,
          showCancelLink: true
        }
      });
    });

    hooks.afterEach(function () {
      // Remove all Shepherd stuff, to start fresh each time.
      document.body.classList.remove('shepherd-active');
      (0, _emberNativeDomHelpers.findAll)('[class^=shepherd]', document.documentElement).forEach(function (el) {
        el.parentNode.removeChild(el);
      });
      (0, _emberNativeDomHelpers.findAll)('[id^=shepherd]', document.documentElement).forEach(function (el) {
        el.parentNode.removeChild(el);
      });
      tour.cleanup();
    });

    (0, _qunit.test)('Shows cancel link', function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assert) {
        var cancelLink;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _testHelpers.visit)('/');

              case 2:
                _context.next = 4;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 4:
                cancelLink = (0, _emberNativeDomHelpers.find)('.shepherd-cancel-link', document.documentElement);

                assert.ok(cancelLink, 'Cancel link shown');

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Hides cancel link', function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(assert) {
        var defaults, steps;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                defaults = {
                  classes: 'shepherd-element shepherd-open shepherd-theme-arrows test-defaults',
                  showCancelLink: false
                };
                steps = [{
                  id: 'test-highlight',
                  options: {
                    attachTo: '.first-element bottom',
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    showCancelLink: false,
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    highlightClass: 'highlight',
                    title: 'Welcome to Ember-Shepherd!',
                    text: ['Testing highlight']
                  }
                }];
                _context2.next = 4;
                return (0, _testHelpers.visit)('/');

              case 4:

                tour.cancel();
                tour.set('defaults', defaults);
                tour.set('steps', steps);

                _context2.next = 9;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 9:

                assert.notOk((0, _emberNativeDomHelpers.find)('.shepherd-open a.shepherd-cancel-link', document.documentElement));

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Cancel link cancels the tour', function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(assert) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _testHelpers.visit)('/');

              case 2:
                _context3.next = 4;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 4:

                assert.ok(document.body.classList.contains('shepherd-active'), 'Body has class of shepherd-active, when shepherd becomes active');

                _context3.next = 7;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content a.shepherd-cancel-link', document.documentElement);

              case 7:

                assert.notOk(document.body.classList.contains('shepherd-active'), 'Body does not have class of shepherd-active, when shepherd becomes inactive');

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    (0, _test.default)('Confirm cancel makes you confirm cancelling the tour', function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(assert) {
        var steps, window, stub;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                steps = [{
                  id: 'intro',
                  options: {
                    attachTo: '.first-element bottom',
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    title: 'Welcome to Ember Shepherd!',
                    text: ['A field that has rested gives a bountiful crop.'],
                    scrollTo: false
                  }
                }];
                window = (0, _emberWindowMock.lookupWindow)(this);
                stub = this.stub(window, 'confirm');

                stub.returns(true);

                _context4.next = 6;
                return (0, _testHelpers.visit)('/');

              case 6:

                tour.set('confirmCancel', true);
                tour.set('steps', steps);

                _context4.next = 10;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 10:

                assert.ok(document.body.classList.contains('shepherd-active'), 'Body has class of shepherd-active, when shepherd becomes active');

                _context4.next = 13;
                return (0, _emberNativeDomHelpers.click)('.shepherd-open a.shepherd-cancel-link', document.documentElement);

              case 13:

                assert.ok(stub.calledOnce);

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Modal page contents', function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(assert) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                assert.expect(3);

                _context5.next = 3;
                return (0, _testHelpers.visit)('/');

              case 3:
                _context5.next = 5;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 5:

                assert.ok(document.body.classList.contains('shepherd-active'), 'Body gets class of shepherd-active, when shepherd becomes active');
                assert.equal((0, _emberNativeDomHelpers.findAll)('.shepherd-enabled', document.documentElement).length, 2, 'attachTo element and tour have shepherd-enabled class');
                assert.ok((0, _emberNativeDomHelpers.find)('#shepherdOverlay', document.documentElement), '#shepherdOverlay exists, since modal');

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Non-modal page contents', function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(assert) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                assert.expect(3);

                _context6.next = 3;
                return (0, _testHelpers.visit)('/');

              case 3:

                tour.cancel();

                _context6.next = 6;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpNonmodal');

              case 6:

                assert.ok(document.body.classList.contains('shepherd-active'), 'Body gets class of shepherd-active, when shepherd becomes active');
                assert.equal((0, _emberNativeDomHelpers.findAll)('.shepherd-enabled', document.documentElement).length, 2, 'attachTo element and tour get shepherd-enabled class');
                assert.notOk((0, _emberNativeDomHelpers.find)('#shepherdOverlay', document.documentElement), '#shepherdOverlay should not exist, since non-modal');

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function (_x6) {
        return _ref6.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Tour next, back, and cancel builtInButtons work', function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(assert) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                assert.expect(3);

                _context7.next = 3;
                return (0, _testHelpers.visit)('/');

              case 3:
                _context7.next = 5;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 5:
                _context7.next = 7;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .next-button', document.documentElement);

              case 7:

                assert.ok((0, _emberNativeDomHelpers.find)('.shepherd-enabled .back-button', document.documentElement), 'Ensure that the back button appears');

                _context7.next = 10;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .back-button', document.documentElement);

              case 10:

                assert.notOk((0, _emberNativeDomHelpers.find)('.shepherd-enabled .back-button', document.documentElement), 'Ensure that the back button disappears');

                _context7.next = 13;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .cancel-button', document.documentElement);

              case 13:

                assert.notOk((0, _emberNativeDomHelpers.find)('.shepherd-enabled [class^=shepherd-button]', document.documentElement), 'Ensure that all buttons are gone, after exit');

              case 14:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function (_x7) {
        return _ref7.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Highlight applied', function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(assert) {
        var steps;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                assert.expect(2);

                steps = [{
                  id: 'test-highlight',
                  options: {
                    attachTo: '.first-element bottom',
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    highlightClass: 'highlight',
                    title: 'Welcome to Ember-Shepherd!',
                    text: ['Testing highlight']
                  }
                }];
                _context8.next = 4;
                return (0, _testHelpers.visit)('/');

              case 4:

                tour.set('steps', steps);
                tour.set('modal', true);

                _context8.next = 8;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 8:

                assert.ok((0, _emberNativeDomHelpers.find)('.highlight', document.documentElement), 'currentElement highlighted');

                _context8.next = 11;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .cancel-button', document.documentElement);

              case 11:

                assert.notOk((0, _emberNativeDomHelpers.find)('.highlight', document.documentElement), 'highlightClass removed on cancel');

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function (_x8) {
        return _ref8.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Highlight applied when `tour.modal == false`', function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(assert) {
        var steps;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                assert.expect(2);

                steps = [{
                  id: 'test-highlight',
                  options: {
                    attachTo: '.first-element bottom',
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    highlightClass: 'highlight',
                    title: 'Welcome to Ember-Shepherd!',
                    text: ['Testing highlight']
                  }
                }];
                _context9.next = 4;
                return (0, _testHelpers.visit)('/');

              case 4:

                tour.set('steps', steps);

                _context9.next = 7;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpNonmodal');

              case 7:

                assert.ok((0, _emberNativeDomHelpers.find)('.highlight', document.documentElement), 'currentElement highlighted');

                _context9.next = 10;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .cancel-button', document.documentElement);

              case 10:

                assert.notOk((0, _emberNativeDomHelpers.find)('.highlight', document.documentElement), 'highlightClass removed on cancel');

              case 11:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function (_x9) {
        return _ref9.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Defaults applied', function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(assert) {
        var defaults, steps;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                assert.expect(1);

                defaults = {
                  classes: 'shepherd-element shepherd-open shepherd-theme-arrows test-defaults',
                  scrollTo: false,
                  showCancelLink: true
                };
                steps = [{
                  id: 'test-defaults-classes',
                  options: {
                    attachTo: '.first-element bottom',
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    copyStyles: false,
                    highlightClass: 'highlight',
                    title: 'Welcome to Ember-Shepherd!',
                    text: ['Testing defaults']
                  }
                }];
                _context10.next = 5;
                return (0, _testHelpers.visit)('/');

              case 5:

                tour.set('defaults', defaults);
                tour.set('steps', steps);

                _context10.next = 9;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 9:

                assert.ok((0, _emberNativeDomHelpers.find)('.test-defaults', document.documentElement), 'defaults class applied');

              case 10:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function (_x10) {
        return _ref10.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('configuration works with attachTo object when element is a simple string', function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(assert) {
        var steps;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                assert.expect(1);

                // Override default behavior
                steps = [{
                  id: 'test-attachTo-string',
                  options: {
                    attachTo: {
                      element: '.first-element',
                      on: 'bottom'
                    },
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    highlightClass: 'highlight',
                    title: 'Welcome to Ember-Shepherd!',
                    text: ['Testing highlight']
                  }
                }];


                tour.set('steps', steps);

                _context11.next = 5;
                return (0, _testHelpers.visit)('/');

              case 5:
                _context11.next = 7;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 7:

                assert.ok((0, _emberNativeDomHelpers.find)('.shepherd-step', document.documentElement), 'tour is visible');

              case 8:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function (_x11) {
        return _ref11.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('configuration works with attachTo object when element is dom element', function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(assert) {
        var steps;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                assert.expect(1);

                _context12.next = 3;
                return (0, _testHelpers.visit)('/');

              case 3:

                // Override default behavior
                steps = [{
                  id: 'test-attachTo-dom',
                  options: {
                    attachTo: {
                      element: (0, _emberNativeDomHelpers.find)('.first-element'),
                      on: 'bottom'
                    },
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    highlightClass: 'highlight',
                    title: 'Welcome to Ember-Shepherd!',
                    text: ['Testing highlight']
                  }
                }];


                tour.set('steps', steps);

                _context12.next = 7;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 7:

                assert.ok((0, _emberNativeDomHelpers.find)('.shepherd-step', document.documentElement), 'tour is visible');

              case 8:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function (_x12) {
        return _ref12.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('buttons work when type is not specified and passed action is triggered', function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(assert) {
        var buttonActionCalled, steps;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                assert.expect(4);

                buttonActionCalled = false;
                steps = [{
                  id: 'test-buttons-custom-action',
                  options: {
                    attachTo: {
                      element: '.first-element',
                      on: 'bottom'
                    },
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary button-one',
                      text: 'button one'
                    }, {
                      classes: 'shepherd-button-secondary button-two',
                      text: 'button two',
                      action: function action() {
                        buttonActionCalled = true;
                      }
                    }, {
                      classes: 'shepherd-button-secondary button-three',
                      text: 'button three'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    highlightClass: 'highlight',
                    title: 'Welcome to Ember-Shepherd!',
                    text: ['Testing highlight']
                  }
                }];
                _context13.next = 5;
                return (0, _testHelpers.visit)('/');

              case 5:

                tour.set('steps', steps);

                _context13.next = 8;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 8:

                assert.ok((0, _emberNativeDomHelpers.find)('.button-one', document.body), 'tour button one is visible');
                assert.ok((0, _emberNativeDomHelpers.find)('.button-two', document.body), 'tour button two is visible');
                assert.ok((0, _emberNativeDomHelpers.find)('.button-three', document.body), 'tour button three is visible');

                _context13.next = 13;
                return (0, _emberNativeDomHelpers.click)((0, _emberNativeDomHelpers.find)('.button-two', document.body));

              case 13:

                assert.ok(buttonActionCalled, 'button action triggered');

              case 14:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function (_x13) {
        return _ref13.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('`pointer-events` is set to `auto` for any step element on clean up', function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(assert) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                assert.expect(4);

                _context14.next = 3;
                return (0, _testHelpers.visit)('/');

              case 3:
                _context14.next = 5;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 5:
                _context14.next = 7;
                return (0, _emberNativeDomHelpers.click)('[data-id="intro"] .next-button', document.documentElement);

              case 7:

                // Check the target elements have pointer-events = 'none'
                // Get the 2 shepherd-target's
                (0, _emberNativeDomHelpers.findAll)('.shepherd-target', document.documentElement).map(function (elem) {
                  assert.equal(elem.style.pointerEvents, 'none');
                });

                // Exit the tour
                _context14.next = 10;
                return (0, _emberNativeDomHelpers.click)('[data-id="installation"] .cancel-button', document.documentElement);

              case 10:

                // Check all the target elements now have pointer-events = 'auto'
                // Get the 2 shepherd-target's again
                (0, _emberNativeDomHelpers.findAll)('.shepherd-target', document.documentElement).map(function (elem) {
                  assert.equal(elem.style.pointerEvents, 'auto');
                });

              case 11:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function (_x14) {
        return _ref14.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('scrollTo works with disableScroll on', function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(assert) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                assert.expect(2);
                // Setup controller tour settings
                tour.set('disableScroll', true);
                tour.set('scrollTo', true);

                // Visit route
                _context15.next = 5;
                return (0, _testHelpers.visit)('/');

              case 5:

                (0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop = 0;

                assert.equal((0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop, 0, 'Scroll is initially 0');

                _context15.next = 9;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 9:
                _context15.next = 11;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .next-button', document.documentElement);

              case 11:
                _context15.next = 13;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .next-button', document.documentElement);

              case 13:

                assert.ok((0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop > 0, 'Scrolled down correctly');

              case 14:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function (_x15) {
        return _ref15.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('scrollTo works with a custom scrollToHandler', function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(assert) {
        var steps;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                assert.expect(2);
                // Override default behavior
                steps = [{
                  id: 'intro',
                  options: {
                    attachTo: '.first-element bottom',
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: false,
                    title: 'Welcome to Ember Shepherd!',
                    text: ['A field that has rested gives a bountiful crop.'],
                    scrollTo: true,
                    scrollToHandler: function scrollToHandler() {
                      return (0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop = 120;
                    }
                  }
                }];

                // Visit route

                _context16.next = 4;
                return (0, _testHelpers.visit)('/');

              case 4:

                tour.set('steps', steps);

                (0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop = 0;
                assert.equal((0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop, 0, 'Scroll is initially 0');

                _context16.next = 9;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 9:
                _context16.next = 11;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .next-button', document.documentElement);

              case 11:

                assert.ok((0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop === 120, 'Scrolled correctly');

              case 12:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function (_x16) {
        return _ref16.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('scrollTo works without a custom scrollToHandler', function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(assert) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                assert.expect(2);
                // Setup controller tour settings
                tour.set('scrollTo', true);

                // Visit route
                _context17.next = 4;
                return (0, _testHelpers.visit)('/');

              case 4:

                (0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop = 0;

                assert.equal((0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop, 0, 'Scroll is initially 0');

                _context17.next = 8;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 8:
                _context17.next = 10;
                return (0, _emberNativeDomHelpers.click)('.shepherd-content .next-button', document.documentElement);

              case 10:

                assert.ok((0, _emberNativeDomHelpers.find)('#ember-testing-container', document.body).scrollTop > 0, 'Scrolled correctly');

              case 11:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function (_x17) {
        return _ref17.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('Shows by id works', function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(assert) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return (0, _testHelpers.visit)('/');

              case 2:

                tour.show('usage');

                assert.equal((0, _emberNativeDomHelpers.find)('.shepherd-enabled.shepherd-open .shepherd-text', document.documentElement).textContent, 'To use the tour service, simply inject it into your application and use it like this example.', 'Usage step shown');

              case 4:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function (_x18) {
        return _ref18.apply(this, arguments);
      };
    }());

    (0, _qunit.test)('copyStyles copies the element correctly', function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(assert) {
        var steps;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                assert.expect(1);

                steps = [{
                  id: 'intro',
                  options: {
                    attachTo: '.first-element bottom',
                    builtInButtons: [{
                      classes: 'shepherd-button-secondary cancel-button',
                      text: 'Exit',
                      type: 'cancel'
                    }, {
                      classes: 'shepherd-button-primary next-button',
                      text: 'Next',
                      type: 'next'
                    }],
                    classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
                    copyStyles: true,
                    title: 'Welcome to Ember Shepherd!',
                    text: ['A field that has rested gives a bountiful crop.'],
                    scrollTo: false
                  }
                }];
                _context19.next = 4;
                return (0, _testHelpers.visit)('/');

              case 4:

                tour.set('steps', steps);

                _context19.next = 7;
                return (0, _emberNativeDomHelpers.click)('.toggleHelpModal');

              case 7:

                assert.equal((0, _emberNativeDomHelpers.findAll)('.first-element', document.documentElement).length, 2, 'First element is copied with copyStyles');

              case 8:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      return function (_x19) {
        return _ref19.apply(this, arguments);
      };
    }());
  });
});
define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'data.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
});
define('dummy/tests/data', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [{
    id: 'intro',
    options: {
      attachTo: '.first-element bottom',
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary next-button',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      title: 'Welcome to Ember Shepherd!',
      text: ['Ember Shepherd is a javascript library for guiding users through your Ember app.\n           It is an Ember addon that wraps <a href="https://github.com/HubSpot/shepherd">Shepherd</a>\n           and extends its functionality. Shepherd uses <a href="http://github.hubspot.com/tether/">Tether</a>,\n           another open source library, to position all of its steps.', 'Tether makes sure your steps never end up off screen or cropped by an\n           overflow. Try resizing your browser to see what we mean.']
    }
  }, {
    id: 'installation',
    options: {
      attachTo: '.install-element bottom',
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary back-button',
        text: 'Back',
        type: 'back'
      }, {
        classes: 'shepherd-button-primary next-button',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      text: ['Installation is simple, if you are using Ember-CLI, just install like any other addon.']
    }
  }, {
    id: 'usage',
    options: {
      attachTo: '.usage-element bottom',
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary back-button',
        text: 'Back',
        type: 'back'
      }, {
        classes: 'shepherd-button-primary next-button',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      text: ['To use the tour service, simply inject it into your application and use it like this example.']
    }
  }, {
    id: 'modal',
    options: {
      attachTo: {
        element: '.modal-element',
        on: 'top'
      },
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary back-button',
        text: 'Back',
        type: 'back'
      }, {
        classes: 'shepherd-button-primary next-button',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      text: ['We implemented true modal functionality by disabling clicking of the rest of the page.', 'If you would like to enable modal, simply do this.get(\'tour\').set(\'modal\', true).']
    }
  }, {
    id: 'copyStyle',
    options: {
      attachTo: {
        element: '.style-copy-element',
        on: 'top'
      },
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary back-button',
        text: 'Back',
        type: 'back'
      }, {
        classes: 'shepherd-button-primary next-button',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      text: ['When using a modal, most times just setting the z-index of your element to something high will\n           make it highlight. For complicated cases, where this does not work, we implemented a copyStyles option\n           that clones the element and copies its computed styles.']
    }
  }, {
    id: 'builtInButtons',
    options: {
      attachTo: '.built-in-buttons-element top',
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary back-button',
        text: 'Back',
        type: 'back'
      }, {
        classes: 'shepherd-button-primary next-button',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      text: ['For the common button types, next, back, cancel, etc, we implemented Ember actions\n          that perform these actions on your tour automatically. To use them, simply include\n          in the builtInButtons array in each step.']
    }
  }, {
    id: 'disableScroll',
    options: {
      attachTo: '.disable-scroll-element top',
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary back-button',
        text: 'Back',
        type: 'back'
      }, {
        classes: 'shepherd-button-primary next-button',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      text: ['When navigating the user through a tour, you may want to disable scrolling, so they\n          cannot mess up your carefully planned out, amazing tour. This is now easily achieved\n          with this.get(\'tour\').set(\'disableScroll\', true).', 'Try scrolling right now, then exit the tour and see that you can again!']
    }
  }, {
    id: 'noAttachTo',
    options: {
      builtInButtons: [{
        classes: 'shepherd-button-secondary cancel-button',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary back-button',
        text: 'Back',
        type: 'back'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      text: ['If no attachTo is specified, the modal will appear in the center of the screen, as per the Shepherd docs.']
    }
  }];
});
define("dummy/tests/ember-sinon-qunit/only", ["exports", "ember-sinon-qunit/test-support/only"], function (exports, _only) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    console.warn("Using deprecated import path for ember-sinon-qunit; use `import test from 'ember-sinon-qunit/test-support/only';` instead.");
    return _only.default.apply(this, arguments);
  };
});
define("dummy/tests/ember-sinon-qunit/test", ["exports", "ember-sinon-qunit/test-support/test"], function (exports, _test) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    console.warn("Using deprecated import path for ember-sinon-qunit; use `import test from 'ember-sinon-qunit/test-support/test';` instead.");
    return _test.default.apply(this, arguments);
  };
});
define('dummy/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'dummy/app', 'dummy/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes.autoboot = true;
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/styles/app.stylelint-test', [], function () {
  'use strict';

  QUnit.module(' Style Lint ');
  QUnit.test('styles/app.scss should pass style lint', function (assert) {
    assert.expect(1);
    assert.ok(true, '');
  });
});
define('dummy/tests/styles/fonts.stylelint-test', [], function () {
  'use strict';

  QUnit.module(' Style Lint ');
  QUnit.test('styles/fonts.scss should pass style lint', function (assert) {
    assert.expect(1);
    assert.ok(true, '');
  });
});
define('dummy/tests/styles/prism-ghcolors.stylelint-test', [], function () {
  'use strict';

  QUnit.module(' Style Lint ');
  QUnit.test('styles/prism-ghcolors.scss should pass style lint', function (assert) {
    assert.expect(1);
    assert.ok(true, '');
  });
});
define('dummy/tests/templates.template.lint-test', [], function () {
  'use strict';

  QUnit.module('TemplateLint');

  QUnit.test('dummy/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dummy/templates/application.hbs should pass TemplateLint.\n\n');
  });
});
define('dummy/tests/test-helper', ['dummy/app', 'dummy/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/ember-shepherd-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/ember-shepherd-test.js should pass ESLint\n\n');
  });

  QUnit.test('data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'data.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/tour-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/tour-test.js should pass ESLint\n\n');
  });
});
define('dummy/tests/unit/services/tour-test', ['qunit', 'ember-qunit', 'ember-window-mock', 'ember-shepherd/utils'], function (_qunit, _emberQunit, _emberWindowMock, _utils) {
  'use strict';

  var steps = [{
    id: 'intro',
    options: {
      attachTo: '.test-element bottom',
      builtInButtons: [{
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      }, {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }],
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      copyStyles: false,
      title: 'Welcome to Ember-Shepherd!',
      text: ['Test text'],
      scrollTo: true,
      scrollToHandler: function scrollToHandler() {
        return 'custom scrollToHandler';
      }
    }
  }];

  (0, _qunit.module)('Unit | Service | tour', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    hooks.beforeEach(function () {
      (0, _emberWindowMock.mockWindow)(this);
    });

    (0, _qunit.test)('it starts the tour when the `start` event is triggered', function (assert) {
      assert.expect(1);

      var mockTourObject = Ember.Object.extend({
        start: function start() {
          assert.ok(true, 'The tour was started');
        }
      }).create();

      var service = this.owner.factoryFor('service:tour').create({
        steps: steps
      });

      service.set('tourObject', mockTourObject);

      Ember.run(function () {
        service.start();
      });
    });

    (0, _qunit.test)('it allows another object to bind to events', function (assert) {
      assert.expect(1);

      var mockTourObject = Ember.Object.extend({
        next: function next() {}
      }).create();

      var service = this.owner.factoryFor('service:tour').create({
        steps: steps
      });

      service.set('tourObject', mockTourObject);

      service.on('next', function () {
        assert.ok(true);
      });

      Ember.run(function () {
        service.next();
      });
    });

    (0, _qunit.test)('it passes through a custom scrollToHandler option', function (assert) {
      assert.expect(1);

      var mockTourObject = Ember.Object.extend({
        start: function start() {
          assert.equal(steps[0].options.scrollToHandler(), 'custom scrollToHandler', 'The handler was passed through as an option on the step');
        }
      }).create();

      var service = this.owner.factoryFor('service:tour').create({
        steps: steps
      });

      service.set('tourObject', mockTourObject);

      Ember.run(function () {
        service.start();
      });
    });

    (0, _qunit.test)('it correctly calculates element position from getElementPosition', function (assert) {
      assert.expect(2);

      var mockElement = { offsetHeight: 500, offsetLeft: 200, offsetTop: 100, offsetWidth: 250 };
      var position = (0, _utils.getElementPosition)(mockElement);

      assert.equal(position.top, '100', 'Top is correctly calculated');
      assert.equal(position.left, '200', 'Left is correctly calculated');
    });

    (0, _qunit.test)('it correctly sets the highlight element position', function (assert) {
      assert.expect(4);

      var currentElement = { offsetHeight: 500, offsetLeft: 200, offsetTop: 100, offsetWidth: 250 };
      var highlightElement = { style: {} };

      (0, _utils.setPositionForHighlightElement)({
        currentElement: currentElement,
        highlightElement: highlightElement
      });

      assert.ok(highlightElement.style.left.indexOf(currentElement.offsetLeft) > -1);
      assert.ok(highlightElement.style.top.indexOf(currentElement.offsetTop) > -1);
      assert.ok(highlightElement.style.width.indexOf(currentElement.offsetWidth) > -1);
      assert.ok(highlightElement.style.height.indexOf(currentElement.offsetHeight) > -1);
    });

    (0, _qunit.test)('it correctly sets the highlight element position format', function (assert) {
      assert.expect(4);

      var currentElement = { offsetHeight: 500, offsetLeft: 200, offsetTop: 100, offsetWidth: 250 };
      var highlightElement = { style: {} };

      (0, _utils.setPositionForHighlightElement)({
        currentElement: currentElement,
        highlightElement: highlightElement
      });

      assert.ok(highlightElement.style.left.indexOf('px') > -1);
      assert.ok(highlightElement.style.top.indexOf('px') > -1);
      assert.ok(highlightElement.style.width.indexOf('px') > -1);
      assert.ok(highlightElement.style.height.indexOf('px') > -1);
    });
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
