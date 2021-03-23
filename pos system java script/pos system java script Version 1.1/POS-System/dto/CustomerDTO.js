function CustomerDTO(cid, fName, lName, address,) {
    var __cid = cid;
    var __fName = fName;
    var __lName = lName;
    var __address = address;


    this.getCustomerCID = function () {
        return __cid;
    }
    this.getCustomerFName = function () {
        return __fName;
    }
    this.getCustomerLName = function () {
        return __lName;
    }
    this.getCustomerAddress = function () {
        return __address;
    }

    this.setCustomerCID = function (newCID) {
        __cid = newCID;
    }
    this.setCustomerFName = function (newFName) {
        __fName = newFName;
    }
    this.setCustomerLName = function (newLName) {
        __lName = newLName;
    }
    this.setCustomerAddress = function (newAddress) {
        __address = newAddress;
    }



}
