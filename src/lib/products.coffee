# ----------------------------------------------------------
#  mws-js • products.coffee • by robbie saunders [eibbors.com]
# ----------------------------------------------------------
# Description soon
# ----------------------------------------------------------

mws = require './core'

# MWS API Group configuration for Order Retrieval
MWS_PRODUCTS = new mws.Service
  name: "Products"
  group: "Products"
  path: "/Products/2011-10-01"
  version: "2011-10-01"
  legacy: false


# Enumeration param definitions
enums =
  # Only the following item conditions are supported
  ItemCondition: class extends mws.Enum
    constructor: ->
      super('ItemCondition', ['New', 'Used', 'Collectible', 'Refurbished', 'Club'])

# Simple type definitions -- mostly helpful for providing hints through gui
types =
  ServiceStatus: mws.types.ServiceStatus

  MarketplaceId:
    ATVPDKIKX0DER:  'amazon.com'
    A1F83G8C2ARO7P: 'amazon.co.uk'
    A13V1IB3VIYZZH: 'amazon.fr'
    A1PA6795UKMFR9: 'amazon.de'
    APJ6JRA9NG5V4:  'amazon.it'
    A1RKKUPIHCS9HS: 'amazon.es'

# Product Requests (translated, not tested)
requests =

  # Requests the operational status of the Products API section.
  GetServiceStatus: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetServiceStatus', [], {}, null, init

  # Returns a list of products and their attributes, ordered by relevancy,
  # based on a search query that you specify
  ListMatchingProducts: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'ListMatchingProducts', [
        new mws.Param('MarketplaceId', 'Id', true),
        new mws.Param('Query', true),
        new mws.Param('QueryContextId', false),
      ], {}, null, init

  # Returns a list of products and their attributes,
  # based on a list of ASIN values that you specify
  GetMatchingProduct: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetMatchingProduct', [
        new mws.Param('MarketplaceId', true),
        new mws.ParamList('ASINList','ASIN'),
      ], {}, null, init

  # Returns a list of products and their attributes,
  # based on a list of ID values that you specify
  # Id values can be : ASIN, SellerSKU, UPC, EAN, ISBN, and JAN.
  GetMatchingProductForId: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetMatchingProductForId', [
        new mws.Param('MarketplaceId', true),
        new mws.Param('IdType', true),
        new mws.ParamList('IdList','Id'),
      ], {}, null, init

  # Returns the current competitive pricing of a product,
  # based on the SellerSKU and MarketplaceId that you specify
  GetCompetitivePricingForSKU: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetCompetitivePricingForSKU', [
        new mws.Param('MarketplaceId', 'Id', true),
        new mws.ParamList('SellerSKUList', 'SellerSKU', true),
      ], {}, null, init

  # Same as above, except that it uses a MarketplaceId and an ASIN to uniquely
  # identify a product, and it does not return the SKUIdentifier element
  GetCompetitivePricingForASIN: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetCompetitivePricingForASIN', [
        new mws.Param('MarketplaceId', 'Id', true),
        new mws.ParamList('ASINList','ASIN'),
      ], {}, null, init

  # Returns the lowest price offer listings for a specific product by item condition.
  GetLowestOfferListingsForSKU: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetLowestOfferListingsForSKU', [
        new mws.Param('MarketplaceId', 'Id', true),
        new mws.ParamList('SellerSKUList', 'SellerSKU', true),
        new enums.ItemCondition('ItemCondition'),
        new mws.Bool('ExcludeMe', false, false),
      ], {}, null, init

  # Same as above but by a list of ASIN's you provide
  GetLowestOfferListingsForASIN: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetLowestOfferListingsForASIN', [
        new mws.Param('MarketplaceId', 'Id', true),
        new enums.ItemCondition('ItemCondition'),
        new mws.ParamList('ASINList','ASIN'),
      ], {}, null, init

  # Returns pricing information for your own offer listings, based on SellerSKU.
  GetMyPriceForSKU: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetMyPriceForSKU', [
        new mws.Param('MarketplaceId', 'Id', true),
        new mws.ParamList('SellerSKUList', 'SellerSKU', true),
        new enums.ItemCondition('ItemCondition'),
      ], {}, null, init

  # Same as above but by a list of ASIN's you provide
  GetMyPriceForASIN: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetMyPriceForASIN', [
        new mws.Param('MarketplaceId', 'Id', true),
        new enums.ItemCondition('ItemCondition'),
        new mws.ParamList('ASINList','ASIN'),
      ], {}, null, init

  # Returns the product categories that a product belongs to,
  # including parent categories back to the root for the marketplace
  GetProductCategoriesForSKU: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetProductCategoriesForSKU', [
        new mws.Param('MarketplaceId', 'Id', true),
        new mws.Param('SellerSKU', true),
      ], {}, null, init

  # Same as above, except that it uses a MarketplaceId and an ASIN to
  # uniquely identify a product.
  GetProductCategoriesForASIN: class extends mws.Request
    constructor: (init) ->
      super MWS_PRODUCTS, 'GetProductCategoriesForASIN', [
        new mws.Param('MarketplaceId', 'Id', true),
        new mws.Param('ASIN', true),
      ], {}, null, init


# The products client supports an optional marketplaceId for every
# query (except service status of course), which will default to @marketplaceId
# It will throw an error if the marketplaceId is not defined in the instance configuration or the query
# example: getMatchingProductForId {idType: 'ASIN', ids: ['XXX'], marketplaceId: 'XXX'}, cb
class ProductsClient extends mws.Client
  constructor: ->
    super

  getServiceStatus: (cb) ->
    @invoke new requests.GetServiceStatus(), {}, (res) =>
      status = res.result?.Status ? null
      cb status, res

  listMatchingProducts: ({query, context, marketplaceId}, cb) ->
    req = new requests.ListMatchingProducts
      MarketplaceId: marketplaceId ? @marketplaceId
      Query: query
      QueryContextId: context ? undefined
    @invoke req, {}, (res) =>
      cb res

  getMatchingProduct: ({asins, marketplaceId}, cb) ->
    req = new requests.GetMatchingProduct
      MarketplaceId: marketplaceId ? @marketplaceId
      ASINList: asins ? []
    @invoke req, {}, (res) =>
      cb res

  getMatchingProductForId: ({idType, ids, marketplaceId}, cb) ->
    req = new requests.GetMatchingProductForId
      MarketplaceId: marketplaceId ? @marketplaceId
      IdType: idType
      IdList: ids
    @invoke req, {}, (res) =>
      cb res

  getCompetitivePricingForSKU: ({skus, marketplaceId}, cb) ->
    req = new requests.GetCompetitivePricingForSKU
      MarketplaceId: marketplaceId ? @marketplaceId
      SellerSKUList: skus ? []
    @invoke req, {}, (res) =>
      cb res

  getCompetitivePricingForASIN: ({asins, marketplaceId}, cb) ->
    req = new requests.GetCompetitivePricingForASIN
      MarketplaceId: marketplaceId ? @marketplaceId
      ASINList: asins ? []
    @invoke req, {}, (res) =>
      cb res

  getLowestOfferListingsForSKU: ({skus, condition, excludeMe, marketplaceId}, cb) ->
    req = new requests.GetLowestOfferListingsForSKU
      MarketplaceId: marketplaceId ? @marketplaceId
      SellerSKUList: skus ? []
      ItemCondition: condition ? undefined
      ExcludeMe: excludeMe ? false
    console.log req
    @invoke req, {}, (res) =>
      cb res

  getLowestOfferListingsForASIN: ({asins, condition, marketplaceId}, cb) ->
    req = new requests.GetLowestOfferListingsForASIN
      MarketplaceId: marketplaceId ? @marketplaceId
      ASINList: asins ? []
      ItemCondition: condition ? undefined
    @invoke req, {}, (res) =>
      cb res

  getMyPriceForSKU: ({skus, condition, marketplaceId}, cb) ->
    req = new requests.GetMyPriceForSKU
      MarketplaceId: marketplaceId ? @marketplaceId
      SellerSKUList: skus ? []
      ItemCondition: condition ? undefined
    @invoke req, {}, (res) =>
      cb res

  getMyPriceForASIN: ({asins, condition, marketplaceId}, cb) ->
    req = new requests.GetMyPriceForASIN
      MarketplaceId: marketplaceId ? @marketplaceId
      ASINList: asins ? []
      ItemCondition: condition ? undefined
    @invoke req, {}, (res) =>
      cb res

  getProductCategoriesForSKU: ({sku, marketplaceId}, cb) ->
    req = new requests.GetProductCategoriesForSKU
      MarketplaceId: marketplaceId ? @marketplaceId
      SellerSKU: sku
    @invoke req, {}, (res) =>
      cb res

  getProductCategoriesForASIN: ({asin, marketplaceId}, cb) ->
    req = new requests.GetProductCategoriesForASIN
      MarketplaceId: marketplaceId ? @marketplaceId
      ASIN: asin
    @invoke req, {}, (res) =>
      cb res

module.exports =
  service: MWS_PRODUCTS
  enums: enums
  requests: requests
  Client: ProductsClient
