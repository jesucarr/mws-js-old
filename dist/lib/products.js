(function() {
  var MWS_PRODUCTS, ProductsClient, enums, mws, requests, types,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  mws = require('./core');

  MWS_PRODUCTS = new mws.Service({
    name: "Products",
    group: "Products",
    path: "/Products/2011-10-01",
    version: "2011-10-01",
    legacy: false
  });

  enums = {
    ItemCondition: (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        _Class.__super__.constructor.call(this, 'ItemCondition', ['New', 'Used', 'Collectible', 'Refurbished', 'Club']);
      }

      return _Class;

    })(mws.Enum)
  };

  types = {
    ServiceStatus: mws.types.ServiceStatus,
    MarketplaceId: {
      ATVPDKIKX0DER: 'amazon.com',
      A1F83G8C2ARO7P: 'amazon.co.uk',
      A13V1IB3VIYZZH: 'amazon.fr',
      A1PA6795UKMFR9: 'amazon.de',
      APJ6JRA9NG5V4: 'amazon.it',
      A1RKKUPIHCS9HS: 'amazon.es'
    }
  };

  requests = {
    GetServiceStatus: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetServiceStatus', [], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ListMatchingProducts: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'ListMatchingProducts', [new mws.Param('MarketplaceId', 'Id', true), new mws.Param('Query', true), new mws.Param('QueryContextId', false)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetMatchingProduct: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMatchingProduct', [new mws.Param('MarketplaceId', true), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetMatchingProductForId: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMatchingProductForId', [new mws.Param('MarketplaceId', true), new mws.Param('IdType', true), new mws.ParamList('IdList', 'Id')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetCompetitivePricingForSKU: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetCompetitivePricingForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('SellerSKUList', 'SellerSKU', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetCompetitivePricingForASIN: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetCompetitivePricingForASIN', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetLowestOfferListingsForSKU: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetLowestOfferListingsForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('SellerSKUList', 'SellerSKU', true), new enums.ItemCondition('ItemCondition'), new mws.Bool('ExcludeMe', false, false)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetLowestOfferListingsForASIN: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetLowestOfferListingsForASIN', [new mws.Param('MarketplaceId', 'Id', true), new enums.ItemCondition('ItemCondition'), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetMyPriceForSKU: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMyPriceForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.ParamList('SellerSKUList', 'SellerSKU', true), new enums.ItemCondition('ItemCondition')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetMyPriceForASIN: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetMyPriceForASIN', [new mws.Param('MarketplaceId', 'Id', true), new enums.ItemCondition('ItemCondition'), new mws.ParamList('ASINList', 'ASIN')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetProductCategoriesForSKU: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetProductCategoriesForSKU', [new mws.Param('MarketplaceId', 'Id', true), new mws.Param('SellerSKU', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetProductCategoriesForASIN: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_PRODUCTS, 'GetProductCategoriesForASIN', [new mws.Param('MarketplaceId', 'Id', true), new mws.Param('ASIN', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request)
  };

  ProductsClient = (function(superClass) {
    extend(ProductsClient, superClass);

    function ProductsClient() {
      ProductsClient.__super__.constructor.apply(this, arguments);
    }

    ProductsClient.prototype.getServiceStatus = function(cb) {
      return this.invoke(new requests.GetServiceStatus(), {}, (function(_this) {
        return function(res) {
          var ref, ref1, status;
          status = (ref = (ref1 = res.result) != null ? ref1.Status : void 0) != null ? ref : null;
          return cb(status, res);
        };
      })(this));
    };

    ProductsClient.prototype.listMatchingProducts = function(query, context, cb) {
      var req;
      req = new requests.ListMatchingProducts({
        MarketplaceId: this.marketplaceId,
        Query: query,
        QueryContextId: context != null ? context : void 0
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getMatchingProduct = function(asins, cb) {
      var req;
      req = new requests.GetMatchingProduct({
        MarketplaceId: this.marketplaceId,
        ASINList: asins != null ? asins : []
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getMatchingProductForId = function(idType, ids, cb) {
      var req;
      req = new requests.GetMatchingProductForId({
        MarketplaceId: this.marketplaceId,
        IdType: idType,
        IdList: ids
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getCompetitivePricingForSKU = function(skus, cb) {
      var req;
      req = new requests.GetCompetitivePricingForSKU({
        MarketplaceId: this.marketplaceId,
        SellerSKUList: skus != null ? skus : []
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getCompetitivePricingForASIN = function(asins, cb) {
      var req;
      req = new requests.GetCompetitivePricingForASIN({
        MarketplaceId: this.marketplaceId,
        ASINList: asins != null ? asins : []
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getLowestOfferListingsForSKU = function(skus, condition, excludeMe, cb) {
      var req;
      req = new requests.GetLowestOfferListingsForSKU({
        MarketplaceId: this.marketplaceId,
        SellerSKUList: skus != null ? skus : [],
        ItemCondition: condition != null ? condition : void 0,
        ExcludeMe: excludeMe != null ? excludeMe : false
      });
      console.log(req);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getLowestOfferListingsForASIN = function(asins, condition, cb) {
      var req;
      req = new requests.GetLowestOfferListingsForASIN({
        MarketplaceId: this.marketplaceId,
        ASINList: asins != null ? asins : [],
        ItemCondition: condition != null ? condition : void 0
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getMyPriceForSKU = function(skus, condition, cb) {
      var req;
      req = new requests.GetMyPriceForSKU({
        MarketplaceId: this.marketplaceId,
        SellerSKUList: skus != null ? skus : [],
        ItemCondition: condition != null ? condition : void 0
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getMyPriceForASIN = function(asins, condition, cb) {
      var req;
      req = new requests.GetMyPriceForASIN({
        MarketplaceId: this.marketplaceId,
        ASINList: asins != null ? asins : [],
        ItemCondition: condition != null ? condition : void 0
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getProductCategoriesForSKU = function(sku, cb) {
      var req;
      req = new requests.GetProductCategoriesForSKU({
        MarketplaceId: this.marketplaceId,
        SellerSKU: sku
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    ProductsClient.prototype.getProductCategoriesForASIN = function(asin, cb) {
      var req;
      req = new requests.GetProductCategoriesForASIN({
        MarketplaceId: this.marketplaceId,
        ASIN: asin
      });
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          return cb(res);
        };
      })(this));
    };

    return ProductsClient;

  })(mws.Client);

  module.exports = {
    service: MWS_PRODUCTS,
    enums: enums,
    requests: requests,
    Client: ProductsClient
  };

}).call(this);

//# sourceMappingURL=products.js.map
