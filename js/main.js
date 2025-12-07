/*GET HTML ELEMENTS*/
/*Form elemnts*/
var contactImageInput = document.getElementById('contactImageInput');
var contactNameInput = document.getElementById('contactNameInput');
var contactPhoneInput = document.getElementById('contactPhoneInput');
var contactEmailInput = document.getElementById('contactEmailInput');
var contactAddressInput = document.getElementById('contactAddressInput');
var contactGroupInput = document.getElementById('contactGroupInput');
var contactNotesInput = document.getElementById('contactNotesInput');
var contactIsFavoriteInput = document.getElementById('contactFavoriteInput');
var contactIsEmergencyInput = document.getElementById('contactEmergencyInput');
/*Search */
var searchInput = document.getElementById('searchInput');

/*All contacts cards --parent--*/
var allContactContainer = document.getElementById('all-contacts-parent');

/*Contacts count card */
var totalContactsCount = document.getElementById('total-contats');
var favContactsCountInput = document.getElementById('favorites-contats');
var emergencyContactsCountInput = document.getElementById('emergency-contats');


/*el msg bta3t: Manage and organize your 4 contacts */
var manageContactsP = document.getElementById('headerCardContact');

var gradientColors = [
    ['#e12afb', '#e60076'], // from-fuchsia-500 to-pink-600
    ['#8e51ff', '#9810fa'], // from-violet-500 to-purple-600
    ['#fe9a00', '#f54a00'], // from-amber-500 to-orange-600
    ['#F43F5E', '#DC2626'], // from-rose-500 to-red-600
    ['#00b8db', '#155dfc'], // from-cyan-500 to-blue-600
    ['#00bc7d', '#009689'], // from-emerald-500 to-teal-600
];



//localStorage.getItem(JSON.parse('contactItems'));
var favoriteCount = 0;
var emergencyCount = 0;


var contactList = [];
var updateOrAdd_flag = '';
if (localStorage.getItem('contactsContainer') != null) {
    contactList = JSON.parse(localStorage.getItem('contactsContainer'));
}
displayContact();
/*========================================Create Contact========================================*/
//7atenaha onClick 3la el add contact button ==> 3shan title  by5tlf 3la 7asb e7na bn-update wla n-delete
function clickAddContactButton() {
    document.getElementById('modal-title').innerHTML = 'Add New Contact';
    updateOrAdd_flag = '';
    clearForm();
}
function saveContact() {
    var randBGGradient = chooseRandomBGColor();
    // [Hagar Hossam,H,H];
    var userName = validateName();
    //  console.log(userName);
    if (fireAlert()) {
        var contact = {
            name: userName[0],
            firstNameFirstLetter: userName[1],
            secondNameFirstLetter: userName[2],
            phoneNumber: contactPhoneInput.value,
            emailAddress: contactEmailInput.value.trim(),
            address: contactAddressInput.value.trim(),
            group: contactGroupInput.value,
            notes: contactNotesInput.value.trim(),
            isFavorite: contactIsFavoriteInput.checked,
            isEmergency: contactIsEmergencyInput.checked,
            image: contactImageInput.files[0] ? 'images/' + contactImageInput.files[0].name : 'noPhoto',
            bgGradient: randBGGradient
        }
        //*****Update*****
        if (typeof updateOrAdd_flag === "number")//updateOrAdd_flag contains index bta3 el element elly hy7lsu update ORR btb2a fadya lw add
        //3shan lw sebtu if (updateOrAdd_flag) bs fa el index lma bykon index= zero byrg3 false w bysht8l add msh update
        {
            // If a new image file is selected in the input, use it; 
            // otherwise, keep the existing image from the contact being updated.
            // This ensures that the contact's image is not lost when updating other fields.
            contact.image = contactImageInput.files[0] ? 'images/' + contactImageInput.files[0].name : contactList[updateOrAdd_flag].image;
            //  console.log(contact.image);

            contactList[updateOrAdd_flag] = contact;
            updateOrAdd_flag = '';
            Swal.fire({
                title: "Updated",
                text: "Contact has been updated successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
        //*****Add*****
        else {
            contactList.push(contact);
            Swal.fire({
                title: "Added",
                text: "Contact has been added successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
        localStorage.setItem('contactsContainer', JSON.stringify(contactList));
        displayContact();
        clearForm();
        /*mn chatgpt 3shan a2fl el form lma n5ls */
        var modalEl = document.getElementById('modal-contact-form');
        var modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    }
}
/*========================================Display Contacts========================================*/
function displayContact() {
    var box = '';
    for (var i = 0; i < contactList.length; i++) {
        box += ` <div class="contact-card col"">
                            <div class="inner bg-white rounded-4 overflow-hidden">
                                <div class="contact-header">
                                    <!--First row: image + name + number-->
                                    <div class="card-row-1 d-flex align-items-start">
                                        <div class="card-identity position-relative">
                                            <div class="icon-container my-sm-shadow text-white overflow-hidden" style=" background: linear-gradient(to bottom right, ${contactList[i].bgGradient[0]}, ${contactList[i].bgGradient[1]});">
                                            ${contactList[i].image !== 'noPhoto' ? `<img src="${contactList[i].image}" 
                                        class="w-100 h-100 object-fit-cover" onerror="this.parentElement.textContent='${contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}'">` : contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}
                                            
                                            </div>
                                            <div class="contact-tag favorite-icon rounded-circle" style="display:${contactList[i].isFavorite ? 'flex' : 'none'};">
                                                <i class="fa fa-star text-white"></i>
                                            </div>
                                            <div class="contact-tag emergency-icon rounded-circle" style="display:${contactList[i].isEmergency ? 'flex' : 'none'};">
                                                <i class="fa fa-heart-pulse text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h3>${contactList[i].name}</h3>
                                            <div class="d-flex gap-2 mt-1 align-items-center">
                                                <div class="icon-container phone-icon">
                                                    <i class="fa fa-phone"></i>
                                                </div>
                                                <span>${contactList[i].phoneNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Second row: email address-->
                                    <div class=" gap-2 mb-2 align-items-center"   style="display:${contactList[i].emailAddress ? 'flex' : 'none'};" >
                                        <div class="icon-container email-icon rounded-3" >
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <span>${contactList[i].emailAddress}</span>
                                    </div>
                                    <!--Third row: address-->
                                    <div class="gap-2 align-items-center"  style="display:${contactList[i].address ? 'flex' : 'none'};" >
                                        <div class="icon-container address-icon">
                                            <i class="fa fa-location-dot" ></i>
                                        </div>
                                        <span>${contactList[i].address}</span>
                                    </div>
                                    <!--fourth row: group + emergency-->
                                    <div class="d-flex flex-wrap">
                                        <span id="contact-group" class="px-2 py-1 text-capitalize ${contactList[i].group}" style="display:${contactList[i].group ? 'inline' : 'none'};" >${contactList[i].group}</span>
                                        <span id="contact-emergency" class=" px-2 py-1 text-capitalize" style="display:${contactList[i].isEmergency ? 'inline' : 'none'};">
                                            <i class="fa fa-heart-pulse"></i>
                                            Emergency</span>
                                    </div>
                                </div>
                                <div class="contact-footer d-flex justify-content-between align-items-center">
                                    <div class="d-flex align-items-center">
                                        <a href="tel:${contactList[i].phoneNumber}" class="icon-container">
                                            <i class="fa fa-phone"></i>
                                        </a>
                                        <a href="mailto:${contactList[i].emailAddress}" class="icon-container">
                                            <i class="fa fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <button onclick="addFavoriteContact(${i})" class="addFavIcon icon-container ${contactList[i].isFavorite ? 'fav-added' : ''}">
                                            <i class="${contactList[i].isFavorite ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                                        </button>
                                        <button onclick="addEmergencyContact(${i})" class="addEmergIcon icon-container ${contactList[i].isEmergency ? 'emergency-added' : ''}">
                                            <i class="${contactList[i].isEmergency ? 'fa fa-heart-pulse' : 'fa-regular fa-heart'}" ></i >
                                        </button >
                                        <button id="updateIcon" onclick="updateContact(${i})" class="icon-container" data-bs-toggle="modal" data-bs-target="#modal-contact-form">
                                            <i class="fa fa-pen"></i>
                                        </button>
                                        <button id="deleteIcon" onclick="deleteContact(${i})" class="icon-container">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div >
                                </div >
                            </div >
                        </div >

            `;
    }
    allContactContainer.innerHTML = box;
    displayEmergencyContacts();
    displayFavoriteContacts();
    totalContactsCount.innerHTML = contactList.length;
    manageContactsP.innerHTML = `Manage and organize your ${contactList.length} contacts`
}

function displayEmergencyContacts() {
    var box = '';
    emergencyCount = 0;
    var emergencyContainer = document.getElementById('emerg-list-body');
    // var emergencyMobileContainer = document.getElementById('emerg-list-body-mobile');
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].isEmergency) {
            box += ` <div class="list-card d-flex align-items-center rounded-3 col">
                                <div class="icon-container flex-shrink-0 overflow-hidden"style=" background: linear-gradient(to bottom right, ${contactList[i].bgGradient[0]}, ${contactList[i].bgGradient[1]});">
                                    ${contactList[i].image !== 'noPhoto' ? `<img src="${contactList[i].image}" 
                                        class="w-100 h-100 object-fit-cover"   onerror="this.parentElement.textContent='${contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}'">` : contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}
                                            
                                </div>
                                <div class="flex-grow-1">
                                    <h4>${contactList[i].name}</h4>
                                    <p>${contactList[i].phoneNumber}</p>
                                </div>
                                <a href="tel:${contactList[i].phoneNumber}" class="icon-container flex-shrink-0">
                                    <i class="fa fa-phone"></i>
                                </a>
                            </div>

            `;
            emergencyCount++;
        }
    }
    //lw mfesh emergency contacts y5ly le grid => 1 col
    if (box == ``) {
        emergencyContainer.classList.remove('row-cols-1', 'row-cols-sm-2');
        emergencyContainer.classList.add('row-cols-1');
        box = `
        <div class="list-card d-flex align-items-center justify-content-center py-4 bg-white col-12">
                    <p id="noContacts">No emergency contacts</p>    
        </div>
        `;
    }
    //lw fy emergency contacts y5ly el grid => 2 col
    else {
        emergencyContainer.classList.remove('row-cols-1');
        emergencyContainer.classList.add('row-cols-1', 'row-cols-sm-2');
    }
    emergencyContainer.innerHTML = box;
    //  emergencyMobileContainer.innerHTML = box;
    emergencyContactsCountInput.innerHTML = emergencyCount;
}

function displayFavoriteContacts() {
    var box = '';
    favoriteCount = 0;
    var favContainer = document.getElementById('fav-list-body');
    //  var favMobileContainer = document.getElementById('fav-list-body-mobile');
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].isFavorite) {
            box += ` <div class="list-card d-flex align-items-center rounded-3 col">
                                <div class="icon-container flex-shrink-0 overflow-hidden"style=" background: linear-gradient(to bottom right, ${contactList[i].bgGradient[0]}, ${contactList[i].bgGradient[1]});">
                                    ${contactList[i].image !== 'noPhoto' ? `<img src="${contactList[i].image}" 
                                        class="w-100 h-100 object-fit-cover"   onerror="this.parentElement.textContent='${contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}'">` : contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}
                                </div>
                                <div class="flex-grow-1">
                                    <h4>${contactList[i].name}</h4>
                                    <p>${contactList[i].phoneNumber}</p>
                                </div>
                                <a href="tel:${contactList[i].phoneNumber}" class="icon-container flex-shrink-0">
                                    <i class="fa fa-phone"></i>
                                </a>
                            </div>
            `;
            favoriteCount++;
        }
    }
    //lw mfesh fav contacts y5ly el grid => 1 col
    if (box == ``) {
        favContainer.classList.remove('row-cols-1', 'row-cols-sm-2');
        favContainer.classList.add('row-cols-1');
        box = `
        <div class="list-card d-flex align-items-center justify-content-center py-4 bg-white col-12">
                        <p id="noContacts">No favorites yet</p> 
        </div>
        `;
    }
    //lw fy fav contacts y5ly el grid => 2 col
    else {
        //kanu ll mbile
        favContainer.classList.remove('row-cols-1');
        favContainer.classList.add('row-cols-1', 'row-cols-sm-2');
    }
    favContainer.innerHTML = box;
    // favMobileContainer.innerHTML = box;
    favContactsCountInput.innerHTML = favoriteCount;
}

/*=============================================Search/Update/delete====================================================*/
/*m3rftsh a7la 8ar b async programming */
function deleteContact(index) {
    //0. Confirm deletion
    Swal.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${contactList[index].name}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#d33",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            //1.
            contactList.splice(index, 1);
            //2.
            localStorage.setItem('contactsContainer', JSON.stringify(contactList));
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Contact has been deleted.",
                showConfirmButton: false,
                timer: 1500
            });
            //3.
            displayContact();
        }
    });
}
/*=====*/
function updateContact(index) {
    var modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = 'Edit Contact';

    //fill form with selected contact data
    document.getElementById('contact-photo').innerHTML = `${contactList[index].image !== 'noPhoto' ? `<img src="${contactList[index].image}" 
                                        class="w-100 h-100 object-fit-cover">`: contactList[index].firstNameFirstLetter + contactList[index].secondNameFirstLetter}`;
    // contactImageInput = contactList[index].image;
    contactNameInput.value = contactList[index].name;
    contactPhoneInput.value = contactList[index].phoneNumber;
    contactEmailInput.value = contactList[index].emailAddress ? contactList[index].emailAddress : '';
    contactAddressInput.value = contactList[index].address ? contactList[index].address : '';
    contactGroupInput.value = contactList[index].group;
    contactNotesInput.value = contactList[index].notes;
    contactIsFavoriteInput.checked = contactList[index].isFavorite;
    contactIsEmergencyInput.checked = contactList[index].isEmergency;
    updateOrAdd_flag = index;
}
/*=====*/

function findContact() {
    var term = searchInput.value.toLocaleLowerCase();

    var box = '';
    for (var i = 0; i < contactList.length; i++) {
        var contactName = contactList[i].name.toLocaleLowerCase();
        var ContactEmail = contactList[i].emailAddress.toLocaleLowerCase();
        var contactPhone = contactList[i].phoneNumber.toLocaleLowerCase();
        if (contactName.includes(term) || ContactEmail.includes(term) || contactPhone.includes(term)) {
            box += ` <div class="contact-card col"">
                            <div class="inner bg-white rounded-4 overflow-hidden">
                                <div class="contact-header">
                                    <!--First row: image + name + number-->
                                    <div class="card-row-1 d-flex align-items-start">
                                        <div class="card-identity position-relative">
                                            <div class="icon-container my-sm-shadow text-white overflow-hidden" style=" background: linear-gradient(to bottom right, ${contactList[i].bgGradient[0]}, ${contactList[i].bgGradient[1]});">
                                            ${contactList[i].image !== 'noPhoto' ? `<img src="${contactList[i].image}" 
                                        class="w-100 h-100 object-fit-cover" onerror="this.parentElement.textContent='${contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}'">` : contactList[i].firstNameFirstLetter + contactList[i].secondNameFirstLetter}
                                            
                                            </div>
                                            <div class="contact-tag favorite-icon rounded-circle" style="display:${contactList[i].isFavorite ? 'flex' : 'none'};">
                                                <i class="fa fa-star text-white"></i>
                                            </div>
                                            <div class="contact-tag emergency-icon rounded-circle" style="display:${contactList[i].isEmergency ? 'flex' : 'none'};">
                                                <i class="fa fa-heart-pulse text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h3>${contactList[i].name}</h3>
                                            <div class="d-flex gap-2 mt-1 align-items-center">
                                                <div class="icon-container phone-icon">
                                                    <i class="fa fa-phone"></i>
                                                </div>
                                                <span>${contactList[i].phoneNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Second row: email address-->
                                    <div class=" gap-2 mb-2 align-items-center"   style="display:${contactList[i].emailAddress ? 'flex' : 'none'};" >
                                        <div class="icon-container email-icon rounded-3" >
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <span>${contactList[i].emailAddress}</span>
                                    </div>
                                    <!--Third row: address-->
                                    <div class="gap-2 align-items-center"  style="display:${contactList[i].address ? 'flex' : 'none'};" >
                                        <div class="icon-container address-icon">
                                            <i class="fa fa-location-dot" ></i>
                                        </div>
                                        <span>${contactList[i].address}</span>
                                    </div>
                                    <!--fourth row: group + emergency-->
                                    <div class="d-flex flex-wrap">
                                        <span id="contact-group" class="px-2 py-1 text-capitalize ${contactList[i].group}" style="display:${contactList[i].group ? 'inline' : 'none'};" >${contactList[i].group}</span>
                                        <span id="contact-emergency" class=" px-2 py-1 text-capitalize" style="display:${contactList[i].isEmergency ? 'inline' : 'none'};">
                                            <i class="fa fa-heart-pulse"></i>
                                            Emergency</span>
                                    </div>
                                </div>
                                <div class="contact-footer d-flex justify-content-between align-items-center">
                                    <div class="d-flex align-items-center">
                                        <a href="tel:${contactList[i].phoneNumber}" class="icon-container">
                                            <i class="fa fa-phone"></i>
                                        </a>
                                        <a href="mailto:${contactList[i].emailAddress}" class="icon-container">
                                            <i class="fa fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <button onclick="addFavoriteContact(${i})" class="addFavIcon icon-container ${contactList[i].isFavorite ? 'fav-added' : ''}">
                                            <i class="${contactList[i].isFavorite ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                                        </button>
                                        <button onclick="addEmergencyContact(${i})" class="addEmergIcon icon-container ${contactList[i].isEmergency ? 'emergency-added' : ''}">
                                            <i class="${contactList[i].isEmergency ? 'fa fa-heart-pulse' : 'fa-regular fa-heart'}" ></i >
                                        </button >
                                        <button id="updateIcon" onclick="updateContact(${i})" class="icon-container" data-bs-toggle="modal" data-bs-target="#modal-contact-form">
                                            <i class="fa fa-pen"></i>
                                        </button>
                                        <button id="deleteIcon" onclick="deleteContact(${i})" class="icon-container">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div >
                                </div >
                            </div >
                        </div >

            `;
        }
    }
    allContactContainer.innerHTML = box;
}
/*=======================================================================================================================*/

/*-----------------------------------------*/
/*Add Contact to Favorite list  */
function addFavoriteContact(index) {
    if (contactList[index].isFavorite) {
        contactList[index].isFavorite = false;
    }
    else {
        contactList[index].isFavorite = true;
    }
    //2.
    localStorage.setItem('contactsContainer', JSON.stringify(contactList));
    //3.
    displayContact();
}
/*-----------------------------------------*/
/*Add Contact to Emergency list  */
function addEmergencyContact(index) {

    if (contactList[index].isEmergency) {
        contactList[index].isEmergency = false;
        // emergencyContactsList.push(contactList[index]);
    }
    else {
        contactList[index].isEmergency = true;
        // favoriteContactsList.pop(contactList[index]);
    }
    //2.
    localStorage.setItem('contactsContainer', JSON.stringify(contactList));
    //3.
    displayContact();
}
/*====================================================Validation functions================================================*/
function handleInputName() {
    /*Handle Input*/
    var nameValue = contactNameInput.value.trim();
    // Split the string into an array of words, treating any number of consecutive whitespace characters as a single separator
    var nameArr = nameValue.split(/\s+/);

    // Get first letters safely
    var userImgLetters = [nameArr[0] ? nameArr[0][0].toUpperCase() : "", nameArr[1] ? nameArr[1][0].toUpperCase() : ""];// 3shan n-show awl 7arf mn kol esm
    //nameArr[1] ? nameArr[1][0].toUpperCase() : "" lw mfesh 2nd name n7ot mkan awl 7arf srting fady

    // Reconstruct full name with single spaces (3shan lw el user mkrr msafat zy kda "Hagar     Hossam") 
    var userName = nameArr.join(" ");
    // n3ml arr ngm3 feh el esm w awl 7arf mn awl esmen
    return [userName, userImgLetters[0], userImgLetters[1]];
}

/*else if => 3shan lw el user lsa md5lsh input mytl3sh error */

/*Validate Name*/
function validateName() {
    var userName = handleInputName();
    var pattern = /^[A-Za-zء-ي ]{2,50}$/;
    var nameErrorMsg = document.getElementById('nameErrorMsg');
    //  console.log(userName[0]);
    if (pattern.test(userName[0])) {
        nameErrorMsg.classList.add('d-none');
        return userName;
    }
    else if (userName[0] == '') {
        nameErrorMsg.classList.add('d-none');
        return -1;
    }
    else {
        nameErrorMsg.classList.remove('d-none');
        return false;
    }
}
/*Validate Phone Number*/
function validatePhoneNumber() {
    var egyptPhonePattern = /^01[0125][0-9]{8}$/;
    var phone = contactPhoneInput.value;
    var phoneErrorMsg = document.getElementById('phoneErrorMsg');
    if (egyptPhonePattern.test(phone)) {
        phoneErrorMsg.classList.add('d-none');
        return true;
    }
    else if (phone == '') {
        phoneErrorMsg.classList.add('d-none');
        return -1;
    }
    else {
        phoneErrorMsg.classList.remove('d-none');
        return false;
    }

}
/*Validate Mail*/
function validateEmail() {
    var email = contactEmailInput.value.trim();
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var emailErrorMsg = document.getElementById('emailErrorMsg');
    //email == '' => 3shan el email msh required
    if (emailPattern.test(email) || email == '') {
        emailErrorMsg.classList.add('d-none');
        return true;
    }
    else {
        emailErrorMsg.classList.remove('d-none');
        return false;
    }

}
/*Alerts*/
function fireAlert() {
    if (validateName() == -1) {
        Swal.fire({
            title: "Missing Name",
            text: "Please enter a name for the contact!",
            icon: "error"
        });
        return false;
    }
    else if (validateName())  // lw rg3 el array hyb2a b-true
    {
        if (validatePhoneNumber() == -1) {
            Swal.fire({
                title: "Missing Phone",
                text: "Please enter a phone number!",
                icon: "error"
            });
            return false;
        }
        else if (validatePhoneNumber()) {
            for (var i = 0; i < contactList.length; i++) {
                console.log("i", i);
                console.log("updateOrAdd_flag", updateOrAdd_flag);

                console.log(contactList[i].phoneNumber);
                console.log(contactPhoneInput.value);
                console.log(contactPhoneInput.value == contactList[i].phoneNumber);



                if (i !== updateOrAdd_flag && contactList[i].phoneNumber === contactPhoneInput.value) {
                    Swal.fire({
                        title: "Duplicate Phone Number",
                        text: `A contact with this phone number already exists: ${contactList[i].name}`,
                        icon: "error"
                    });
                    return false;
                }
            }
            if (validateEmail()) {
                return true;
            }
            else {
                Swal.fire({
                    title: "Invalid Email",
                    text: "Please enter a valid email address",
                    icon: "error"
                });
                return false;
            }

        }
        else {
            Swal.fire({
                title: "Invalid Phone",
                text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
                icon: "error"
            });
            return false;
        }
    }
    else {
        Swal.fire({
            title: "Invalid Name",
            text: "Name should contain only letters and spaces (2-50 characters)",
            icon: "error"
        });
    }

}
/*-------------------------------------------------------------------------------------------------------------------*/
/*Helper functions */
function clearForm() {
    contactImageInput.value = '';
    document.getElementById('contact-photo').innerHTML = `<i class="fa fa-user"></i>`;// 3shan nshel ay sora aw 7aga kant mwoda feh ex: img or initials (HH)
    contactNameInput.value = '';
    contactPhoneInput.value = '';
    contactEmailInput.value = '';
    contactAddressInput.value = '';
    contactGroupInput.value = '';
    contactNotesInput.value = '';
    contactIsFavoriteInput.checked = false;
    contactIsEmergencyInput.checked = false;
}

function chooseRandomBGColor() {
    var randomGradient = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    return randomGradient;
}
//htsht8l bs lw dost 3la zorar Choose Photo (input form)
function showContactImg() {
    // console.log(contactImageInput.files[0]);
    // console.log(contactImageInput.value);

    document.getElementById('contact-photo').innerHTML =
        `${contactImageInput.files[0]
            ? `<img src="images/${contactImageInput.files[0].name}" class="w-100 h-100 object-fit-cover">`
            : `<i class="fa fa-user"></i>`}`;
}