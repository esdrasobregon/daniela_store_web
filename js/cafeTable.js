const cafeTableList = document.querySelector('#cafe-table-list');
const form = document.querySelector('#add-cafe-form');
var idCafe;

// real-time listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeTableList.querySelector('[data-id=' + change.doc.id + ']');
            cafeTableList.removeChild(li);
        }
    });
});
// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
}); 

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('tr');
    li.setAttribute('class', 'table-success');
    let blank = document.createElement('td');
    blank.setAttribute('class', 'table-success');
    let name = document.createElement('td');
    name.setAttribute('class', 'table-success');
    let city = document.createElement('td');
    city.setAttribute('class', 'table-success');

    let tdDelete = document.createElement('td');
    let tdUpdate = document.createElement('td');
    var btnDelete = document.createElement("BUTTON");
    btnDelete.setAttribute('class', 'btn btn-danger');
    btnDelete.textContent = 'X'; 
    tdDelete.appendChild(btnDelete);


    var btnUpdate = document.createElement("BUTTON");
    btnUpdate.setAttribute('class', 'btn btn-warning');
    btnUpdate.textContent = '!';
    tdUpdate.appendChild(btnUpdate);

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(blank);
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(tdDelete);
    li.appendChild(tdUpdate);

    cafeTableList.appendChild(li);

    // deleting data
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = doc.id;
        db.collection('cafes').doc(id).delete();
    });
    // updating data
    btnUpdate.addEventListener('click', (e) => {
        idCafe = doc.id;
        window.location.href = 'pages./products/update.html?id='+idCafe;
    });
}

// getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });


// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });