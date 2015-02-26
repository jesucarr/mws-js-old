(function() {
  var MWS_REPORTS, ReportsClient, enums, mws, reportTypes, requests,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  mws = require("./core");

  MWS_REPORTS = new mws.Service({
    name: "Reports",
    group: "Reports & Report Scheduling",
    path: "/",
    version: "2009-01-01",
    legacy: true
  });

  reportTypes = {
    '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_': {
      title: 'Inventory Report',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_MERCHANT_LISTINGS_DATA_BACK_COMPAT_': {
      title: 'Open Listings Report',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_MERCHANT_LISTINGS_DATA_': {
      title: 'Merchant Listings Report',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_MERCHANT_LISTINGS_DATA_LITE_': {
      title: 'Merchant Listings Report - Lite',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_MERCHANT_LISTINGS_DATA_LITER_': {
      title: 'Merchant Listings Report - Liter',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_CONVERGED_FLAT_FILE_SOLD_LISTINGS_DATA': {
      title: 'Sold Listings Report',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_MERCHANT_CANCELLED_LISTINGS_DATA_': {
      title: 'Canceled Listings Report',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_MERCHANT_LISTINGS_DEFECT_DATA_': {
      title: 'Quality Listing Report',
      group: 'Listings',
      format: 'flat',
      request: true
    },
    '_GET_FLAT_FILE_ACTIONABLE_ORDER_DATA_': {
      title: 'Unshipped Orders Report',
      group: 'Orders',
      format: 'flat',
      request: true
    },
    '_GET_ORDERS_DATA_': {
      title: 'Scheduled XML Order Report',
      group: 'Orders',
      format: 'xml',
      schedule: true
    },
    '_GET_FLAT_FILE_ORDER_REPORT_DATA_': {
      title: 'Flat File Order Report',
      group: 'Orders',
      format: 'flat',
      request: true
    },
    '_GET_FLAT_FILE_ORDERS_DATA_': {
      title: 'Requested or Scheduled Flat File Order Report',
      group: 'Orders',
      format: 'flat',
      schedule: true,
      request: true
    },
    '_GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_': {
      title: 'Flat File Order Report',
      group: 'Orders',
      format: 'flat',
      schedule: true,
      request: true
    },
    '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_': {
      title: 'Flat File Orders By Last Update Report',
      group: 'Orders',
      format: 'flat',
      request: true
    },
    '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_': {
      title: 'Flat File Orders By Order Date',
      group: 'Orders',
      format: 'flat',
      request: true
    },
    '_GET_XML_ALL_ORDERS_DATA_BY_LAST_UPDATE_': {
      title: 'XML Orders By Last Update Report',
      group: 'Orders',
      format: 'xml',
      request: true
    },
    '_GET_XML_ALL_ORDERS_DATA_BY_ORDER_DATE_': {
      title: 'XML Orders By Order Date',
      group: 'Orders',
      format: 'xml',
      request: true
    },
    '_GET_FLAT_FILE_PENDING_ORDERS_DATA_': {
      title: 'Flat File Pending Orders Report',
      group: 'Orders',
      format: 'flat',
      schedule: true,
      request: true
    },
    '_GET_PENDING_ORDERS_DATA_': {
      title: 'XML Pending Orders Report',
      format: 'xml',
      schedule: true,
      request: true
    },
    '_GET_CONVERGED_FLAT_FILE_PENDING_ORDERS_DATA_': {
      title: 'Converged Flat File Pending Orders Report',
      group: 'Orders',
      format: 'flat',
      schedule: true,
      request: true
    },
    '_GET_SELLER_FEEDBACK_DATA_': {
      title: 'Flat File Feedback',
      group: 'Performance',
      format: 'flat',
      request: true
    },
    '_GET_FLAT_FILE_PAYMENT_SETTLEMENT_DATA_': {
      title: 'Flat File Settlement Report',
      group: 'Settlement',
      format: 'flat',
      request: false
    },
    '_GET_ALT_FLAT_FILE_PAYMENT_SETTLEMENT_DATA_': {
      title: 'Flat File Settlement Report',
      group: 'Settlement',
      format: 'flat',
      request: false
    }
  };


  /*
  Ojects to represent enum collections used by some request(s)
  @type {Object}
   */

  enums = {
    Schedule: (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        _Class.__super__.constructor.call(this, "Schedule", ["_15_MINUTES_", "_30_MINUTES_", "_1_HOUR_", "_2_HOURS_", "_4_HOURS_", "_8_HOURS_", "_12_HOURS_", "_72_HOURS_", "_1_DAY_", "_2_DAYS_", "_7_DAYS_", "_14_DAYS_", "_15_DAYS_", "_30_DAYS_", "_NEVER_"], true);
      }

      return _Class;

    })(mws.Enum),
    ReportProcessingStatusList: (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        _Class.__super__.constructor.call(this, "ReportTypeList", "Status", ["_SUBMITTED_", "_IN_PROGRESS_", "_CANCELLED_", "_DONE_", "_DONE_NO_DATA_"], false);
      }

      return _Class;

    })(mws.EnumList),
    ReportOptions: (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        _Class.__super__.constructor.call(this, "ReportOptions", ["ShowSalesChannel=true", "ShowSalesChannel=false"], false);
      }

      return _Class;

    })(mws.Enum),
    RequestableReportType: (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        var k, reqReportsTypes, v;
        reqReportsTypes = (function() {
          var results;
          results = [];
          for (k in reportTypes) {
            v = reportTypes[k];
            if (v.request) {
              results.push(k);
            }
          }
          return results;
        })();
        _Class.__super__.constructor.call(this, "ReportType", reqReportsTypes, true);
      }

      return _Class;

    })(mws.Enum),
    SchedulableReportType: (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        var k, schedReportsTypes, v;
        schedReportsTypes = (function() {
          var results;
          results = [];
          for (k in reportTypes) {
            v = reportTypes[k];
            if (v.schedule) {
              results.push(k);
            }
          }
          return results;
        })();
        _Class.__super__.constructor.call(this, "ReportType", schedReportsTypes, true);
      }

      return _Class;

    })(mws.Enum),
    ReportTypeList: (function(superClass) {
      extend(_Class, superClass);

      function _Class() {
        var k, reportTypesList, v;
        reportTypesList = (function() {
          var results;
          results = [];
          for (k in reportTypes) {
            v = reportTypes[k];
            results.push(k);
          }
          return results;
        })();
        _Class.__super__.constructor.call(this, "ReportTypeList", "Type", reportTypesList, false);
      }

      return _Class;

    })(mws.EnumList)
  };


  /*
  A collection of currently supported request constructors. Once created and
  configured, the returned requests can be passed to an mws client `invoke` call
  @type {Object}
   */

  requests = {
    RequestReport: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'RequestReport', [new enums.RequestableReportType(), new mws.Timestamp('StartDate'), new mws.Timestamp('EndDate'), new enums.ReportOptions(), new mws.ParamList('MarketplaceIdList', 'Id')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportRequestList: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportRequestList', [new mws.ParamList('ReportRequestIdList', 'Id'), new enums.ReportTypeList(), new enums.ReportProcessingStatusList(), new mws.Param('MaxCount'), new mws.Timestamp('RequestedFromDate'), new mws.Timestamp('RequestedToDate')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportRequestListByNextToken: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportRequestListByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportRequestCount: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportRequestCount', [new enums.ReportTypeList(), new enums.ReportProcessingStatusList(), new mws.Timestamp('RequestedFromDate'), new mws.Timestamp('RequestedToDate')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    CancelReportRequests: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'CancelReportRequests', [new mws.ParamList('ReportRequestIdList', 'Id'), new enums.ReportTypeList(), new enums.ReportProcessingStatusList(), new mws.Timestamp('RequestedFromDate'), new mws.Timestamp('RequestedToDate')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportList: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportList', [new mws.Param('MaxCount'), new enums.ReportTypeList(), new mws.Bool('Acknowledged'), new mws.Timestamp('AvailableFromDate'), new mws.Timestamp('AvailableToDate'), new mws.ParamList('ReportRequestIdList', 'Id')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportListByNextToken: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportListByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportCount: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportCount', [new enums.ReportTypeList(), new mws.Bool('Acknowledged'), new mws.Timestamp('AvailableFromDate'), new mws.Timestamp('AvailableToDate')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReport: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReport', [new mws.Param('ReportId', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    ManageReportSchedule: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'ManageReportSchedule', [new enums.SchedulableReportType(), new enums.Schedule(), new mws.Timestamp('ScheduledDate')], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportScheduleList: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportScheduleList', [new enums.ReportTypeList()], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportScheduleListByNextToken: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportScheduleListByNextToken', [new mws.Param('NextToken', true)], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    GetReportScheduleCount: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'GetReportScheduleCount', [new enums.ReportTypeList()], {}, null, init);
      }

      return _Class;

    })(mws.Request),
    UpdateReportAcknowledgements: (function(superClass) {
      extend(_Class, superClass);

      function _Class(init) {
        _Class.__super__.constructor.call(this, MWS_REPORTS, 'UpdateReportAcknowledgements', [new mws.ParamList('ReportIdList', 'Id', true), new mws.Bool('Acknowledged')], {}, null, init);
      }

      return _Class;

    })(mws.Request)
  };

  ReportsClient = (function(superClass) {
    extend(ReportsClient, superClass);

    function ReportsClient() {
      return ReportsClient.__super__.constructor.apply(this, arguments);
    }

    ReportsClient.prototype.requestReport = function(options, cb) {
      var req;
      req = new requests.RequestReport(options);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          var ref, ref1, reportReqInfo;
          reportReqInfo = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
          return cb(reportReqInfo, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportRequestList = function(options, cb) {
      var req;
      req = new requests.GetReportRequestList(options);
      return this.invoke(req, {
        nextTokenCall: requests.GetReportRequestListByNextToken,
        nextTokenCallUseHasNext: true
      }, (function(_this) {
        return function(res) {
          var ref, ref1, reportReqInfoList;
          reportReqInfoList = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
          return cb(reportReqInfoList, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportRequestListByNextToken = function(token, cb) {
      var req;
      req = new requests.GetReportRequestListByNextToken({
        NextToken: token
      });
      return this.invoke(req, {
        nextTokenCall: requests.GetReportRequestListByNextToken,
        nextTokenCallUseHasNext: true
      }, (function(_this) {
        return function(res) {
          var ref, ref1, reportReqInfoList;
          reportReqInfoList = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
          return cb(reportReqInfoList, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportRequestCount = function(options, cb) {
      var req;
      req = new requests.GetReportRequestCount(options);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          var count, ref, ref1;
          count = (ref = (ref1 = res.result) != null ? ref1.Count : void 0) != null ? ref : null;
          return cb(count, res);
        };
      })(this));
    };

    ReportsClient.prototype.cancelReportRequests = function(options, cb) {
      var req;
      req = new requests.CancelReportRequests(options);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          var canceledReportReqInfoList, ref, ref1;
          canceledReportReqInfoList = (ref = (ref1 = res.result) != null ? ref1.ReportRequestInfo : void 0) != null ? ref : null;
          return cb(canceledReportReqInfoList, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportList = function(options, cb) {
      var req;
      req = new requests.GetReportList(options);
      return this.invoke(req, {
        nextTokenCall: requests.GetReportListByNextToken,
        nextTokenCallUseHasNext: true
      }, (function(_this) {
        return function(res) {
          var ref, ref1, reportInfo;
          reportInfo = (ref = (ref1 = res.result) != null ? ref1.ReportInfo : void 0) != null ? ref : null;
          return cb(reportInfo, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportListByNextToken = function(token, cb) {
      var req;
      req = new requests.GetReportListByNextToken({
        NextToken: token
      });
      return this.invoke(req, {
        nextTokenCall: requests.GetReportListByNextToken,
        nextTokenCallUseHasNext: true
      }, (function(_this) {
        return function(res) {
          var ref, ref1, reportInfo;
          reportInfo = (ref = (ref1 = res.result) != null ? ref1.ReportInfo : void 0) != null ? ref : null;
          return cb(reportInfo, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportCount = function(options, cb) {
      var req;
      req = new requests.GetReportCount(options);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          var count, ref, ref1;
          count = (ref = (ref1 = res.result) != null ? ref1.Count : void 0) != null ? ref : null;
          return cb(count, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReport = function(options, cb) {
      var req;
      req = new requests.GetReport(options);
      return this.invoke(req, {
        allowedContentTypes: ['application/octet-stream', 'text', 'text/plain']
      }, (function(_this) {
        return function(res) {
          var report;
          report = res.response;
          return cb(report, res);
        };
      })(this));
    };

    ReportsClient.prototype.manageReportSchedule = function(options, cb) {
      var req;
      req = new requests.ManageReportSchedule(options);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          var ref, ref1, reportSchedules;
          reportSchedules = (ref = (ref1 = res.result) != null ? ref1.ReportSchedule : void 0) != null ? ref : null;
          return cb(reportSchedules, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportScheduleList = function(options, cb) {
      var req;
      req = new requests.GetReportScheduleList(options);
      return this.invoke(req, {
        nextTokenCall: requests.GetReportScheduleListByNextToken
      }, (function(_this) {
        return function(res) {
          var ref, ref1, reportSchedule;
          reportSchedule = (ref = (ref1 = res.result) != null ? ref1.ReportSchedule : void 0) != null ? ref : null;
          return cb(reportSchedule, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportScheduleListByNextToken = function(token, cb) {
      var req;
      req = new requests.GetReportScheduleListByNextToken({
        NextToken: token
      });
      return this.invoke(req, {
        nextTokenCall: requests.GetReportScheduleListByNextToken
      }, (function(_this) {
        return function(res) {
          var ref, ref1, reportSchedule;
          reportSchedule = (ref = (ref1 = res.result) != null ? ref1.ReportSchedule : void 0) != null ? ref : null;
          return cb(reportSchedule, res);
        };
      })(this));
    };

    ReportsClient.prototype.getReportScheduleCount = function(options, cb) {
      var req;
      req = new requests.GetReportScheduleCount(options);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          var count, ref, ref1;
          count = (ref = (ref1 = res.result) != null ? ref1.Count : void 0) != null ? ref : null;
          return cb(count, res);
        };
      })(this));
    };

    ReportsClient.prototype.updateReportAcknowledgements = function(options, cb) {
      var req;
      req = new requests.UpdateReportAcknowledgements(options);
      return this.invoke(req, {}, (function(_this) {
        return function(res) {
          var ref, ref1, reportInfo;
          reportInfo = (ref = (ref1 = res.result) != null ? ref1.ReportInfo : void 0) != null ? ref : null;
          return cb(reportInfo, res);
        };
      })(this));
    };

    return ReportsClient;

  })(mws.Client);

  module.exports = {
    service: MWS_REPORTS,
    enums: enums,
    requests: requests,
    Client: ReportsClient
  };

}).call(this);

//# sourceMappingURL=reports.js.map
