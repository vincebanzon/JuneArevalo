/*!
 * Bootstrap v4.0.0-alpha.4 (http://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
    }
}(jQuery);


+function ($) {

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    'use strict';

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var Util = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Private TransitionEnd Helpers
         * ------------------------------------------------------------------------
         */

        var transition = false;

        var MAX_UID = 1000000;

        var TransitionEndEvent = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        // shoutout AngusCroll (https://goo.gl/pxwQGp)
        function toType(obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        function isElement(obj) {
            return (obj[0] || obj).nodeType;
        }

        function getSpecialTransitionEndEvent() {
            return {
                bindType: transition.end,
                delegateType: transition.end,
                handle: function handle(event) {
                    if ($(event.target).is(this)) {
                        return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                    }
                    return undefined;
                }
            };
        }

        function transitionEndTest() {
            if (window.QUnit) {
                return false;
            }

            var el = document.createElement('bootstrap');

            for (var _name in TransitionEndEvent) {
                if (el.style[_name] !== undefined) {
                    return { end: TransitionEndEvent[_name] };
                }
            }

            return false;
        }

        function transitionEndEmulator(duration) {
            var _this = this;

            var called = false;

            $(this).one(Util.TRANSITION_END, function () {
                called = true;
            });

            setTimeout(function () {
                if (!called) {
                    Util.triggerTransitionEnd(_this);
                }
            }, duration);

            return this;
        }

        function setTransitionEndSupport() {
            transition = transitionEndTest();

            $.fn.emulateTransitionEnd = transitionEndEmulator;

            if (Util.supportsTransitionEnd()) {
                $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
            }
        }

        /**
         * --------------------------------------------------------------------------
         * Public Util Api
         * --------------------------------------------------------------------------
         */

        var Util = {

            TRANSITION_END: 'bsTransitionEnd',

            getUID: function getUID(prefix) {
                do {
                    /* eslint-disable no-bitwise */
                    prefix += ~ ~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
                    /* eslint-enable no-bitwise */
                } while (document.getElementById(prefix));
                return prefix;
            },

            getSelectorFromElement: function getSelectorFromElement(element) {
                var selector = element.getAttribute('data-target');

                if (!selector) {
                    selector = element.getAttribute('href') || '';
                    selector = /^#[a-z]/i.test(selector) ? selector : null;
                }

                return selector;
            },

            reflow: function reflow(element) {
                new Function('bs', 'return bs')(element.offsetHeight);
            },

            triggerTransitionEnd: function triggerTransitionEnd(element) {
                $(element).trigger(transition.end);
            },

            supportsTransitionEnd: function supportsTransitionEnd() {
                return Boolean(transition);
            },

            typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
                for (var property in configTypes) {
                    if (configTypes.hasOwnProperty(property)) {
                        var expectedTypes = configTypes[property];
                        var value = config[property];
                        var valueType = undefined;

                        if (value && isElement(value)) {
                            valueType = 'element';
                        } else {
                            valueType = toType(value);
                        }

                        if (!new RegExp(expectedTypes).test(valueType)) {
                            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
                        }
                    }
                }
            }
        };

        setTransitionEndSupport();

        return Util;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): collapse.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Collapse = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'collapse';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.collapse';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 600;

        var Default = {
            toggle: true,
            parent: ''
        };

        var DefaultType = {
            toggle: 'boolean',
            parent: 'string'
        };

        var Event = {
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            IN: 'in',
            COLLAPSE: 'collapse',
            COLLAPSING: 'collapsing',
            COLLAPSED: 'collapsed'
        };

        var Dimension = {
            WIDTH: 'width',
            HEIGHT: 'height'
        };

        var Selector = {
            ACTIVES: '.panel > .in, .panel > .collapsing',
            DATA_TOGGLE: '[data-toggle="collapse"]'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Collapse = (function () {
            function Collapse(element, config) {
                _classCallCheck(this, Collapse);

                this._isTransitioning = false;
                this._element = element;
                this._config = this._getConfig(config);
                this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

                this._parent = this._config.parent ? this._getParent() : null;

                if (!this._config.parent) {
                    this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                }

                if (this._config.toggle) {
                    this.toggle();
                }
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Collapse, [{
                key: 'toggle',

                // public

                value: function toggle() {
                    if ($(this._element).hasClass(ClassName.IN)) {
                        this.hide();
                    } else {
                        this.show();
                    }
                }
            }, {
                key: 'show',
                value: function show() {
                    var _this4 = this;

                    if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
                        return;
                    }

                    var actives = undefined;
                    var activesData = undefined;

                    if (this._parent) {
                        actives = $.makeArray($(Selector.ACTIVES));
                        if (!actives.length) {
                            actives = null;
                        }
                    }

                    if (actives) {
                        activesData = $(actives).data(DATA_KEY);
                        if (activesData && activesData._isTransitioning) {
                            return;
                        }
                    }

                    var startEvent = $.Event(Event.SHOW);
                    $(this._element).trigger(startEvent);
                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (actives) {
                        Collapse._jQueryInterface.call($(actives), 'hide');
                        if (!activesData) {
                            $(actives).data(DATA_KEY, null);
                        }
                    }

                    var dimension = this._getDimension();

                    $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

                    this._element.style[dimension] = 0;
                    this._element.setAttribute('aria-expanded', true);

                    if (this._triggerArray.length) {
                        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
                    }

                    this.setTransitioning(true);

                    var complete = function complete() {
                        $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

                        _this4._element.style[dimension] = '';

                        _this4.setTransitioning(false);

                        $(_this4._element).trigger(Event.SHOWN);
                    };

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
                    var scrollSize = 'scroll' + capitalizedDimension;

                    $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

                    this._element.style[dimension] = this._element[scrollSize] + 'px';
                }
            }, {
                key: 'hide',
                value: function hide() {
                    var _this5 = this;

                    if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
                        return;
                    }

                    var startEvent = $.Event(Event.HIDE);
                    $(this._element).trigger(startEvent);
                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    var dimension = this._getDimension();
                    var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

                    this._element.style[dimension] = this._element[offsetDimension] + 'px';

                    Util.reflow(this._element);

                    $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

                    this._element.setAttribute('aria-expanded', false);

                    if (this._triggerArray.length) {
                        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
                    }

                    this.setTransitioning(true);

                    var complete = function complete() {
                        _this5.setTransitioning(false);
                        $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
                    };

                    this._element.style[dimension] = 0;

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                }
            }, {
                key: 'setTransitioning',
                value: function setTransitioning(isTransitioning) {
                    this._isTransitioning = isTransitioning;
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeData(this._element, DATA_KEY);

                    this._config = null;
                    this._parent = null;
                    this._element = null;
                    this._triggerArray = null;
                    this._isTransitioning = null;
                }

                // private

            }, {
                key: '_getConfig',
                value: function _getConfig(config) {
                    config = $.extend({}, Default, config);
                    config.toggle = Boolean(config.toggle); // coerce string values
                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                }
            }, {
                key: '_getDimension',
                value: function _getDimension() {
                    var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
                    return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
                }
            }, {
                key: '_getParent',
                value: function _getParent() {
                    var _this6 = this;

                    var parent = $(this._config.parent)[0];
                    var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

                    $(parent).find(selector).each(function (i, element) {
                        _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
                    });

                    return parent;
                }
            }, {
                key: '_addAriaAndCollapsedClass',
                value: function _addAriaAndCollapsedClass(element, triggerArray) {
                    if (element) {
                        var isOpen = $(element).hasClass(ClassName.IN);
                        element.setAttribute('aria-expanded', isOpen);

                        if (triggerArray.length) {
                            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
                        }
                    }
                }

                // static

            }], [{
                key: '_getTargetFromElement',
                value: function _getTargetFromElement(element) {
                    var selector = Util.getSelectorFromElement(element);
                    return selector ? $(selector)[0] : null;
                }
            }, {
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data(DATA_KEY);
                        var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

                        if (!data && _config.toggle && /show|hide/.test(config)) {
                            _config.toggle = false;
                        }

                        if (!data) {
                            data = new Collapse(this, _config);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }]);

            return Collapse;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            event.preventDefault();

            var target = Collapse._getTargetFromElement(this);
            var data = $(target).data(DATA_KEY);
            var config = data ? 'toggle' : $(this).data();

            Collapse._jQueryInterface.call($(target), config);
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Collapse._jQueryInterface;
        $.fn[NAME].Constructor = Collapse;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Collapse._jQueryInterface;
        };

        return Collapse;
    })(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.4): tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Tab = (function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'tab';
        var VERSION = '4.0.0-alpha.4';
        var DATA_KEY = 'bs.tab';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            DROPDOWN_MENU: 'dropdown-menu',
            ACTIVE: 'active',
            FADE: 'fade',
            IN: 'in'
        };

        var Selector = {
            A: 'a',
            LI: 'li',
            DROPDOWN: '.dropdown',
            UL: 'ul:not(.dropdown-menu)',
            FADE_CHILD: '> .nav-item .fade, > .fade',
            ACTIVE: '.active',
            ACTIVE_CHILD: '> .nav-item > .active, > .active',
            DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
            DROPDOWN_TOGGLE: '.dropdown-toggle',
            DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tab = (function () {
            function Tab(element) {
                _classCallCheck(this, Tab);

                this._element = element;
            }

            /**
             * ------------------------------------------------------------------------
             * Data Api implementation
             * ------------------------------------------------------------------------
             */

            // getters

            _createClass(Tab, [{
                key: 'show',

                // public

                value: function show() {
                    var _this15 = this;

                    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
                        return;
                    }

                    var target = undefined;
                    var previous = undefined;
                    var ulElement = $(this._element).closest(Selector.UL)[0];
                    var selector = Util.getSelectorFromElement(this._element);

                    if (ulElement) {
                        previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
                        previous = previous[previous.length - 1];
                    }

                    var hideEvent = $.Event(Event.HIDE, {
                        relatedTarget: this._element
                    });

                    var showEvent = $.Event(Event.SHOW, {
                        relatedTarget: previous
                    });

                    if (previous) {
                        $(previous).trigger(hideEvent);
                    }

                    $(this._element).trigger(showEvent);

                    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (selector) {
                        target = $(selector)[0];
                    }

                    this._activate(this._element, ulElement);

                    var complete = function complete() {
                        var hiddenEvent = $.Event(Event.HIDDEN, {
                            relatedTarget: _this15._element
                        });

                        var shownEvent = $.Event(Event.SHOWN, {
                            relatedTarget: previous
                        });

                        $(previous).trigger(hiddenEvent);
                        $(_this15._element).trigger(shownEvent);
                    };

                    if (target) {
                        this._activate(target, target.parentNode, complete);
                    } else {
                        complete();
                    }
                }
            }, {
                key: 'dispose',
                value: function dispose() {
                    $.removeClass(this._element, DATA_KEY);
                    this._element = null;
                }

                // private

            }, {
                key: '_activate',
                value: function _activate(element, container, callback) {
                    var active = $(container).find(Selector.ACTIVE_CHILD)[0];
                    var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

                    var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

                    if (active && isTransitioning) {
                        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        complete();
                    }

                    if (active) {
                        $(active).removeClass(ClassName.IN);
                    }
                }
            }, {
                key: '_transitionComplete',
                value: function _transitionComplete(element, active, isTransitioning, callback) {
                    if (active) {
                        $(active).removeClass(ClassName.ACTIVE);

                        var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

                        if (dropdownChild) {
                            $(dropdownChild).removeClass(ClassName.ACTIVE);
                        }

                        active.setAttribute('aria-expanded', false);
                    }

                    $(element).addClass(ClassName.ACTIVE);
                    element.setAttribute('aria-expanded', true);

                    if (isTransitioning) {
                        Util.reflow(element);
                        $(element).addClass(ClassName.IN);
                    } else {
                        $(element).removeClass(ClassName.FADE);
                    }

                    if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

                        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
                        if (dropdownElement) {
                            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                        }

                        element.setAttribute('aria-expanded', true);
                    }

                    if (callback) {
                        callback();
                    }
                }

                // static

            }], [{
                key: '_jQueryInterface',
                value: function _jQueryInterface(config) {
                    return this.each(function () {
                        var $this = $(this);
                        var data = $this.data(DATA_KEY);

                        if (!data) {
                            data = data = new Tab(this);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (data[config] === undefined) {
                                throw new Error('No method named "' + config + '"');
                            }
                            data[config]();
                        }
                    });
                }
            }, {
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Tab;
        })();

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            event.preventDefault();
            Tab._jQueryInterface.call($(this), 'show');
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Tab._jQueryInterface;
        $.fn[NAME].Constructor = Tab;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Tab._jQueryInterface;
        };

        return Tab;
    })(jQuery);

}(jQuery);
