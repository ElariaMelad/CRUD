let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'creat';
let up;

// console.log(title,price,taxes,ads,discount,total,count,category,submit)


//get total
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        // setTimeout 
        /*
            *
            *  This function is to specify the time to execute a specific order.
            *
        */
        setTimeout(() => {
            total.style.background = '#F0ECCF';
        }, 100);
    } else {
        // setTimeout 
        /*
            *
            *  This function is to specify the time to execute a specific order.
            *
        */
        setTimeout(() => {
            total.innerHTML = '';
            total.style.background = '#A7727D'
        }, 500);

    }
}



//creat product


let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <= 100) {
        if (mood == 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[up] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        cleardata()
    }


    //save localstorage
    localStorage.setItem('product', JSON.stringify(datapro))
    showdata()
}


//clear inputs

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



//read
function showdata() {
    let table = '';
    gettotal();
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata( ${i} )" id="update">update</button></td>
        <td><button onclick="deletedata( ${i} )" id="delete">delete</button></td>
         </tr>
    `

    }
    document.getElementById('tbody').innerHTML = table;
    let btndeleteall = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btndeleteall.innerHTML = `
        <button onclick="deleteAll()">Deleta All (${datapro.length})</button>
        `
    } else {
        btndeleteall.innerHTML = '';
    }
}
showdata();


//delete

function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

//update
function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    up = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}


// search
let searchmood = 'title';

function getsearchmood(id) {
    let searchelement = document.getElementById('search');
    if (id == 'searchTitle') {
        searchmood = 'title';
    } else {
        searchmood = 'category';
    }
    searchelement.placeholder = 'Search By ' + searchmood;
    searchelement.focus()
    searchelement.value = '';
    showdata();
}


function searchdata(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == 'title') {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata( ${i} )" id="update">update</button></td>
                    <td><button onclick="deletedata( ${i} )" id="delete">delete</button></td>
                </tr>
                `;
            }
        } else {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata( ${i} )" id="update">update</button></td>
                    <td><button onclick="deletedata( ${i} )" id="delete">delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

