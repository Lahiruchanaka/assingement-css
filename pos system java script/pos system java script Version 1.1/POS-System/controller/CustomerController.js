$('#saveCustomer').click(function () {
    let cid = $('#cid').val();
    let fName = $('#fName').val();
    let lName = $('#lName').val();
    let address = $('#address').val();


    let res = saveCustomer(cid, fName, lName, address);
    if (res) clearAllCustomerText();

})
$("#deleteCustomer").click(function () {
    let cid = $("#cid").val();
    let option = confirm(`Do you want to delete ID:${cid}`);
    if (option) {
        let res = deleteCustomer(cid);
        if (res) {
            alert("Customer Deleted");
        } else {
            alert("Delete Failed")
        }

    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});

$("#updateCustomer").click(function () {
    let cid = $("#cid").val();
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let address = $("#address").val();


    let option = confirm(`Do you want to Update Customer ID:${cid}`);
    if (option) {
        let res = updateCustomer(cid, fName, lName, address);
        if (res) {
            alert("Customer Updated");
        } else {
            alert("Update Failed");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();

});

function saveCustomer(cid, fName, lName, address) {
    let customer = new CustomerDTO(cid, fName, lName, address);
    customerTable.push(customer);// customer add

    // load the table
    loadAllCustomerToTheTable();
    return true;
}

function getAllCustomers() {
    return customerTable;
}

//delete customer

function deleteCustomer(cid) {
    let customer = searchCustomer(cid);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// search customer
function searchCustomer(cid) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerCID() == cid) return customerTable[i];
    }
    return null;
}


function updateCustomer(cid, fName, lName, address) {
    let customer = searchCustomer(cid);
    if (customer != null) {
        customer.setCustomerFName(fName)
        customer.setCustomerLName(lName)
        customer.setCustomerAddress(address)

        return true;
    } else {
        return false;
    }
}


function loadAllCustomerToTheTable() {
    let allCustomers = getAllCustomers();
    $('.customerTable>tbody').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let cid = allCustomers[i].getCustomerCID();
        let fName = allCustomers[i].getCustomerFName();
        let lName = allCustomers[i].getCustomerLName();
        let address = allCustomers[i].getCustomerAddress();


        var row = `<tr><td>${cid}</td><td>${fName}</td><td>${lName}</td><td>${address}</td></tr>`;
        $('.customerTable>tbody').append(row);
    }
}

/*Validations*/
function clearAllCustomerText() {
    $("#cid").val("");
    $("#fName").val("");
    $("#lName").val("");
    $("#address").val("");

}

$("#searchCustomer").click(function () {

        let customer = searchCustomer($('#cid').val());
        if (customer != null) {
            $("#cid").val(customer.getCustomerCID());
            $("#fName").val(customer.getCustomerFName());
            $("#lName").val(customer.getCustomerLName());
            $("#address").val(customer.getCustomerAddress());

        } else {
            clearAllCustomerText();
        }

});

let cusRegEx=/^(C00-)[0-9]{1,3}$/;
let cusNRegEx=/^[A-z]{1,100}$/;
let cusFRegEx=/^[A-z]{1,100}$/;
let cusARegEx=/^[A-z,0-9]{1,200}$/;
let cusSRegEx=/^[A-z]{1,100}$/;




function CustomerIDAutoMake() {
    try {
        let lastOID = orderTable[orderTable.length-1].getOID();
        let newOID = parseInt(lastOID.substring(1,4))+1;
        if (newOID < 10){
            $('#orderId').val("O00"+newOID);
        }else if(newOID < 100){
            $('#orderId').val("O0"+newOID);
        }else {
            $('#orderId').val("O"+newOID);
        }
    }catch (e) {
        $('#orderId').val("O001");
    }



}

