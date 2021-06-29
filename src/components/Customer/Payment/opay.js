import $ from "jquery";

export default class OPay {
    version = 1
    sandboxMode = false
    developMode = false
    hostname = "https://api.openpay.mx/v1/"
    sandboxHostname = "https://sandbox-api.openpay.mx/v1/"
    developHostname = "https://dev-api.openpay.mx/v1/"
    Group = {}
    Update = {}
    constructor(merchantId, key, sandboxMode) {
      this.merchantId = merchantId;
      this.key = key;
      this.sandboxMode = sandboxMode;
    }
    setId(t) {
        this.merchantId = t;
    }
    getId() {
      return this.merchantId;
    }
    getKey() {
        return this.key;
    }
    getSandboxMode() {
        return this.sandboxMode;
    }
    setSandboxMode(f) {
        this.sandboxMode = (f ? true : false);
        this.developMode = !f;
    }
    
    getHostname(){
        if(this.sandboxMode) {
            return this.sandboxHostname;
        } else if(this.developMode){
            return this.developHostname;
        } else {
            return this.hostname;
        }
    }
    makeBaseAuth(user) {
        var tok = user + ':';
        var hash = btoa(tok);
        return hash;
      }


      
      whitelistedAttrs = [ "card_number", "holder_name", "cvv2", "expiration_month", "expiration_year", "address" ];

    create(_params, _success, _failure) {
        var _endpoint = 'tokens';
        return this.validate(_params, "tarjeta"), this.formatData(_params, this.whitelistedAttrs), this.send(_endpoint, _params, _success, _failure);
    }

    formatData(_dictionary, _validAttributes) {
        return _dictionary;
    }
    validate(_dictionary, _type) {
        if (!_dictionary) throw _type + ' required';
        if (typeof _dictionary !== 'object') throw _type + ' invalid';
    }

    send(_endpoint, _data, _success, _failure) {
        if (!this.validateCredentials(_failure, this.merchantId, this.key)) {
            return;
        }
        var _auth = this.makeBaseAuth(this.key);
        var _url = this.getHostname();
        _url = _url + this.merchantId + '/' + _endpoint;
        return this.sendXhr(_url, _auth, _data, _success, _failure);
    }

    validateCredentials(_failure, _id, _key) {
        if (typeof _id === 'undefined' || !(/^[a-z0-9]+$/i.test(_id)) ) {
            this.handleError(_failure, null, 'Empty or invalid Openpay ID');
            return false;
        }
        if (typeof _key === 'undefined' || !(/^pk_[a-z0-9]+$/i.test(_key))) {
            this.handleError(_failure, null, 'Empty or invalid Openpay API Key');
            return false;
        }
        return true;
    }

      handleError(_failure, _timer, _message, _status, _responseText) {
        clearTimeout(_timer);
        var _data = null;
        _message = _message || 'Unknown error';
        _status = _status || 0;
        _responseText = _responseText || '{}';
        try {
            _data = JSON.parse(_responseText);
        } catch (e) {
            _message = 'Response error';
        }
        _failure({
            message: _message,
            status: _status,
            data: _data,
            toString: function(){
                return this.message + ' [status ' + this.status + ']';
            }
        });
    }
    log(_message) {
        if (typeof _message === 'object' && 'toString' in _message) {
            _message = _message.toString();
        }
        if (typeof console !== 'undefined' && 'log' in console) {
        }
    }
    sendXhr(_url, _auth, _data, _success, _failure, _method) {
        var _rhr = null, _timer = null, _payload = '', _headers = {}, _timeout = 0;
        if (typeof _success !== "function") {
            _success = this.log;
        }
        if (typeof _failure !== "function") {
            _failure = this.log;
        }

        if (typeof JSON === 'undefined') {
            this.handleError(_failure, _timer, 'Browser error (JSON library not found)');
            return;
        }
        _timeout = 4e4;

        var hasCors = XMLHttpRequest && ("withCredentials" in new XMLHttpRequest());
        if(!hasCors){
            if (typeof XDomainRequest !== 'undefined') {
               // implement jsonp
               _data.apiKey = _auth;
               var handleResponse = function(data){
                if(data.error){
                    this.handleError(_failure, _timer, 'Request error', data.httpStatus, JSON.stringify(data));
                } else {
                    _success({
                        data: data.data,
                        status: 200
                    });
                }
               };
               var request = {
                callbackName:"getResultData",
                onSuccess:handleResponse,
                onError:this.handleError,
                timeout:_timeout,
                url:_url + '/jsonp',
                data:_data
               };
               this.send(request);
           } else {
                this.handleError(_failure, _timer, 'Browser error (CORS not supported)');
                return;
           }
        } else {

            /*
     * Get XmlHttpRequest object for CORS support
     */
            function getXhr(){
                 if (isHostMethod(window, "XMLHttpRequest")) {
                    return new XMLHttpRequest();
                }
            };

             /*
         * From
         * http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
         */
            function isHostMethod(object, property){
                var t = typeof object[property];
                return t === 'function' ||
                (!!(t === 'object' && object[property])) ||
                t === 'unknown';
            };

            function handleResponse(){
                // handle only if request has finished
                if (typeof _rhr.readyState !== 'undefined' && _rhr.readyState === 4 || !hasCors) {
                    clearTimeout(_timer);

                    if (_rhr.status < 200 || _rhr.status >= 300) {
                        //this.handleError(_failure, _timer, 'Request error', _rhr.status, _rhr.responseText);
                    } else {
                        var jsonResponse;
                        try {
                            jsonResponse = JSON.parse(_rhr.responseText);
                        } catch (e) {
                            // this.handleError(_failure, _timer, 'Response error (JSON parse failed)', _rhr.status, '{}');
                        }
                        _success({
                            data: jsonResponse,
                            status: 200
                        });
                    }
                }
            };

            if (!(_rhr = getXhr())) {
                this.handleError(_failure, _timer, 'Browser error (CORS not supported)');
                return;
            }
            _payload = JSON.stringify(_data);
            _headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' +  _auth
            };

            if(typeof _method === 'undefined'|| _method===null){
                _method = 'POST';
            }
            _rhr.open(_method, _url, true);

            // set the Credentials flag request header only if there is no
    // XHR2 features
            // must be set after opening the request to an
    // InvalidOperationException in IE
            if ('withCredentials' in _rhr) {
                _rhr.withCredentials = true;
            }

            // apply the request headers
            for (var prop in _headers) {
                if (_headers.hasOwnProperty(prop) && _headers[prop]) {
                    if ('setRequestHeader' in _rhr) {
                        _rhr.setRequestHeader(prop, _headers[prop]);
                    }
                }
            }

            // define the onreadystate handler
            if ('onreadystatechange' in _rhr) {
                _rhr.onreadystatechange = handleResponse;
            } else  if ('onload' in _rhr && 'onerror' in _rhr) {
                _rhr.onload = handleResponse;
                _rhr.onerror = this.handleError;
            }

            // set a timeout
            _timer = setTimeout(function(){
                // reset the handler
                if ('onload' in _rhr) {
                    _rhr.onload = Function.prototype;
                } else {
                    _rhr.onreadystatechange = Function.prototype;
                }
                _rhr.abort();
                _rhr = null;
                this.handleError(_failure, _timer, 'Timeout after ' + _timeout + ' milliseconds');
            }, _timeout);

            // make the request
            _rhr.send(_payload);
        }
    }

    //PAYMENT PROCESS CARD 
    extractFormAndCreate(_form, _success, _failure, _customerId){
        var _params = this.extractFormInfo(_form);
        return this.create(_params, _success, _failure);
    }

    extractFormInfo(form){
        var cardFields, objectCard, objectAddress,addressFields;

        var extractForm = function (object) {
            if (window.$ && object instanceof $) {
              return object[0];
            } else if (object.nodeType && object.nodeType === 1) {
              return object;
            } else {
              return document.getElementById(object);
            }
          };

          var findInputsData = function (element, attributeName) {
                var found = [],
                    children = element.children,
                    child, i;

                for (i = 0; i < children.length; i++) {
                  child = children[i];

                  if (child.nodeType === 1 && child.attributes[attributeName]) {
                    found.push(child);
                  } else if (child.children.length > 0) {
                    found = found.concat(findInputsData(child, attributeName));
                  }
                }

                return found;
              };

          var createObject = function (element, attributeName) {
              var object = {};

              for (var i = 0; i < element.length; i++) {
                let fieldName = element[i].attributes[attributeName].value;
                let inputValue=element[i].value;
                if(object[fieldName] !== undefined){
                    if (!object[fieldName].push) {
                         object[this.name] = [object[this.name]];
                    }
                    object[fieldName].push(inputValue || '');
                } else {
                    object[fieldName] = inputValue || '';
                }
              }

              return object;
            };

        form = extractForm(form);
        cardFields = findInputsData(form, 'data-openpay-card');
        objectCard = createObject(cardFields, 'data-openpay-card');
        addressFields = findInputsData(form, 'data-openpay-card-address');
        if(addressFields!== undefined && addressFields.length && addressFields.length > 0){
            objectAddress = createObject(addressFields, 'data-openpay-card-address');
            if(objectAddress!== undefined){
                objectCard["address"] = objectAddress;
            }
        }
        return objectCard;
    }

  }

  