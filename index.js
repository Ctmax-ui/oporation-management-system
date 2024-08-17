const rootApi = {
    "data": {
        1: {
            "id": 1,
            "date": "08/07/2024 - 08/23/2024",
            "category_one": [
                "A1",
            ],
            "category_two": [
                "B1",
            ],
            "category_three": [
                "C1",
            ],
        },
        2: {
            "id": 2,
            "date": "08/07/2024 - 08/23/2024",
            "category_one": [
                "A2",
            ],
            "category_two": [
                "B2",
            ],
            "category_three": [
                "C2",
            ],
        },
        3: {
            "id": 3,
            "date": "08/07/2024 - 08/23/2024",
            "category_one": [
                "A3",
            ],
            "category_two": [
                "B3",
            ],
            "category_three": [
                "C3",
            ],
        },
        4: {
            "id": 4,
            "date": "08/07/2024 - 08/23/2024",
            "category_one": [
                "A4",
            ],
            "category_two": [
                "B4",
            ],
            "category_three": [
                "C4",
            ],
        },
        5: {
            "id": 5,
            "date": "08/24/2024 - 09/10/2024",
            "category_one": [
                "A1",
                "A2",
            ],
            "category_two": [
                "B1",
                "B4",
            ],
            "category_three": [
                "C2",
            ],
        },
        6: {
            "id": 6,
            "date": "08/24/2024 - 09/10/2024",
            "category_one": [
                "A3",
            ],
            "category_two": [
                "B2",
                "B3",
            ],
            "category_three": [
                "C1",
                "C5",
            ],
        },
        7: {
            "id": 7,
            "date": "08/24/2024 - 09/10/2024",
            "category_one": [
                "A4",
                "A1",
            ],
            "category_two": [
                "B3",
            ],
            "category_three": [
                "C4",
            ],
        },
        8: {
            "id": 8,
            "date": "09/11/2024 - 09/25/2024",
            "category_one": [
                "A2",
                "A3",
            ],
            "category_two": [
                "B1",
            ],
            "category_three": [
                "C3",
            ],
        },
        9: {
            "id": 9,
            "date": "09/11/2024 - 09/25/2024",
            "category_one": [
                "A4",
            ],
            "category_two": [
                "B2",
                "B4",
            ],
            "category_three": [
                "C2",
                "C5",
            ],
        },
        10: {
            "id": 10,
            "date": "09/11/2024 - 09/25/2024",
            "category_one": [
                "A1",
                "A4",
            ],
            "category_two": [
                "B3",
            ],
            "category_three": [
                "C1",
            ],
        }
    }
};

const categoryRuleApi = {
    "category_one": {
        "items": [
            "A1",
            "A2",
            "A3",
            "A4",
        ]
    },
    "category_two": {
        "items": [
            "B1",
            "B2",
            "B3",
            "B4",
        ]
    },
    "category_three": {
        "items": [
            "C1",
            "C2",
            "C3",
            "C4",
            "C5",
        ]
    }
}
// for the rendering rules in table
function renderCategory() {
    writeCategory('#category-one-menu  .category-menu-option', categoryRuleApi.category_one)
    writeCategory('#category-one-edit-menu  .category-menu-option', categoryRuleApi.category_one)
    writeCategory('#category-two-menu  .category-menu-option', categoryRuleApi.category_two)
    writeCategory('#category-two-edit-menu  .category-menu-option', categoryRuleApi.category_two)
    writeCategory('#category-three-menu  .category-menu-option', categoryRuleApi.category_three)
    writeCategory('#category-three-edit-menu  .category-menu-option', categoryRuleApi.category_three)

    writeCategory('.search-rule-one ul', categoryRuleApi.category_one)
    writeCategory('.search-rule-two ul', categoryRuleApi.category_two)
    writeCategory('.search-rule-three ul', categoryRuleApi.category_three)

    function writeCategory(targetId, categoryName) {
        document.querySelector(`${targetId}`).innerHTML = categoryName?.items?.map(item => `<li><label><input type="checkbox" value="${item}">${item}</label></li>`).join('');
    }
}
renderCategory();

// for creating rules
addRule('add-category-one-btn', 'category_one')
addRule('add-category-two-btn', 'category_two')
addRule('add-category-three-btn', 'category_three')

function addRule(targetElement, category) {
    document.getElementById(targetElement).addEventListener('click', () => createRule(category))

    function createRule(targetCategory) {
        const optionName = prompt('Name of the Option')
        if (optionName) {
            categoryRuleApi[targetCategory].items.push(optionName);
            renderCategory();
        }
    }
}






// for btn disabling funcion when removed value
document.querySelector('.search-rule-one').addEventListener('change',(e)=>{
    if(getArrOfInputChecked('.search-rule-one').length <= 0){
        document.querySelectorAll('.search-rule-two ul input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelectorAll('.search-rule-three ul input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelector('.search-rule-two button').setAttribute('disabled', true)
        document.querySelector('.search-rule-three button').setAttribute('disabled', true)
    }else{
        document.querySelector(`.search-rule-two button`).removeAttribute('disabled')
    }
})
document.querySelector('.search-rule-two').addEventListener('change', ()=>autoDisableBtn('.search-rule-two', '.search-rule-three'))
function autoDisableBtn(toggleTargetElem, disabledElem){
    if(getArrOfInputChecked(toggleTargetElem).length <= 0){
        document.querySelectorAll(`${disabledElem} ul input[type="checkbox"]`).forEach(checkbox => checkbox.checked = false);
        document.querySelector(`${disabledElem} button`).setAttribute('disabled', true)
    }else{
        document.querySelector(`${disabledElem} button`).removeAttribute('disabled')
    }
}


// for clear form button
document.getElementById('clearSearchBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('searchForm').reset();
    document.querySelector('.search-rule-two button').setAttribute('disabled', true)
    document.querySelector('.search-rule-three button').setAttribute('disabled', true)
    renderData();
});


// for searching option/rules
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    searchByCategory();
});
function searchByCategory() {
    const catOneSelected = getArrOfInputChecked('.search-rule-one ul');
    const catTwoSelected = getArrOfInputChecked('.search-rule-two ul');
    const catThreeSelected = getArrOfInputChecked('.search-rule-three ul');

    const filteredData = Object.values(rootApi.data).filter(item => {
        const matchCatOne = catOneSelected.length === 0 || catOneSelected.some(val => item.category_one.includes(val));
        const matchCatTwo = catTwoSelected.length === 0 || catTwoSelected.some(val => item.category_two.includes(val));
        const matchCatThree = catThreeSelected.length === 0 || catThreeSelected.some(val => item.category_three.includes(val));

        return matchCatOne && matchCatTwo && matchCatThree;
    });

    renderData(filteredData);
}




// for renderning the table
const tablesContainer = document.getElementById('save-template');

function renderData(data = Object.values(rootApi.data)) {
    tablesContainer.innerHTML = ''
    data.forEach((val) => {
        // Generate HTML for each category
        const categoryOneHTML = val?.category_one?.map(item => `<li>${item}</li>`).join('');
        const categoryTwoHTML = val?.category_two?.map(item => `<li>${item}</li>`).join('');
        const categoryThreeHTML = val?.category_three?.map(item => `<li>${item}</li>`).join('');

        // Insert the generated HTML
        tablesContainer.insertAdjacentHTML('beforeend', `
        <div class="template-heading-name">
                      <div class="editable-template-one" style="justify-content: start;display: flex;">
                        <div class="outline" style="width: 100%;">
                          <div class="template-category-date px-4">
                            <h6>Date</h6>
                            <ul>
                              <li>${val.date}</li>
                            </ul>
                          </div>
                          <div class="template-category-Category One px-4">
                            <h6>Category One</h6>
                            <ul>
                              ${categoryOneHTML}
                            </ul>
                          </div>
                          <div class="template-category-Category Two px-4">
                            <h6>Category Two</h6>
                            <ul>
                            ${categoryTwoHTML}
                            </ul>
                          </div>
                          <div class="template-category-Category Three px-4">
                            <h6>Category Three</h6>
                            <ul>
                            ${categoryThreeHTML}
                            </ul>
                          </div>
                          <div class="edit-delete">
                            <button class="btn btn-secondary edit-btn templete-edit-btn" type="button" style="background-color: transparent;color: #6c757d;" data-valid="${val.id}">
                              <i class="bi bi-pencil-square"></i>
                            </button>

                            <button class="btn btn-secondary delete-btn templete-delete-btn" type="button" style="margin-left: 12px;background-color: transparent;color: #6c757d;" data-valid="${val.id}">
                              <i class="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
    `);
    })
    // console.log(rootApi.data);
}
renderData()
// for renderning the table end



// for delete
document.addEventListener('click', function (event) {
    if (event.target.closest('.templete-delete-btn')) {
        const id = event.target.closest('.templete-delete-btn').dataset.valid;
        delete rootApi.data[id];
        tablesContainer.innerHTML = '';
        // renderData();
        searchByCategory()
    }
});
// for delete end


// for edit
document.addEventListener('click', function (event) {
    const editButton = event.target.closest('.templete-edit-btn');

    if (editButton) {
        const id = editButton.dataset.valid;
        const editform = document.getElementById('editForm');

        // Toggle modal visibility
        modalToggler();

        // Set form values based on current data
        editform.querySelector('#editDateId').value = rootApi.data[id].date;
        selectCheckboxes(rootApi.data[id].category_one, editform.querySelector('#category-one-edit-menu'));
        selectCheckboxes(rootApi.data[id].category_two, editform.querySelector('#category-two-edit-menu'));
        selectCheckboxes(rootApi.data[id].category_three, editform.querySelector('#category-three-edit-menu'));

        // Handle form submission
        editform.onsubmit = (e) => {
            e.preventDefault();
            // console.log('saved');
            rootApi.data[id].date = editform.querySelector('#editDateId').value;
            rootApi.data[id].category_one = getArrOfInputChecked('#category-one-edit-menu');
            rootApi.data[id].category_two = getArrOfInputChecked('#category-two-edit-menu');
            rootApi.data[id].category_three = getArrOfInputChecked('#category-three-edit-menu');

            // Hide modal and re-render data
            document.getElementById('modalContainer').classList.add('d-none');
            // renderData();
            searchByCategory()
        };
    }
});

function selectCheckboxes(values, targetElement) {
    const checkboxes = targetElement.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = values.includes(checkbox.value);
    });
}

function getArrOfInputChecked(targetCheckbox) {
    const returnArr = [];
    document.querySelectorAll(`${targetCheckbox} input[type="checkbox"]:checked`).forEach((val) => {
        returnArr.push(val.value);
    });
    return returnArr;
}

// edit end

// for modal
document.getElementById('closeModalBtn').addEventListener('click', (e) => {
    modalToggler()
})
function modalToggler() {
    // Assuming you have a function to toggle the modal's visibility
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.classList.toggle('d-none');
}
// for modal end

// for adding rule in table
function getArrOfInputChecked(targetCheckbox) {
    const returnArr = []
    document.querySelectorAll(`${targetCheckbox} input[type="checkbox"]:checked`).forEach((val) => {
        returnArr.push(val.value)
    })
    return returnArr;
};

document.getElementById('add-rule-form').addEventListener('submit', (e) => {
    e.preventDefault()

    // console.log(document.querySelectorAll('#category-one-menu input[type="checkbox"]:checked'));

    const catOneArr = getArrOfInputChecked('#category-one-menu')
    const catTwoArr = getArrOfInputChecked('#category-two-menu')
    const catThreeArr = getArrOfInputChecked('#category-three-menu')



    // Get the new rule data
    const dateRange = document.getElementById('daterange').value;
    const categoryOne = catOneArr;
    const categoryTwo = catTwoArr;
    const categoryThree = catThreeArr;

    // Generate a new id (e.g., the next number after the last key in rootApi)
    const newId = Math.max(...Object.keys(rootApi.data)) + 1;

    // Add the new rule to rootApi
    rootApi.data[newId] = {
        id: newId,
        date: dateRange,
        category_one: categoryOne,
        category_two: categoryTwo,
        category_three: categoryThree,
    };

    // Clear the form inputs
    document.getElementById('add-rule-form').reset();

    // Clear the current content and re-render the updated data
    tablesContainer.innerHTML = '';
    // renderData();
    searchByCategory()
})
// for adding rule in table end


// for the callender option
useCallender('#daterange')
useCallender('#editDateId')
function useCallender(idOfTheElement) {
    $(idOfTheElement).daterangepicker({
        opens: 'right',
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $(idOfTheElement).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
    });

    $(idOfTheElement).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

}
// for the callender option end



//for the selecting and deselecting
selectAll('.select-all-btn', '.deselect-all-btn')
function selectAll(elemOfSelect, elemOfDeSelect) {

    document.querySelectorAll(`${elemOfSelect}[data-category="one"]`).forEach(btn => {
        btn.addEventListener('click', () => selectAllOptions('one'));
    });
    document.querySelectorAll(`${elemOfDeSelect}[data-category="one"]`).forEach(btn => {
        btn.addEventListener('click', () => deselectAllOptions('one'));
    });

    document.querySelectorAll(`${elemOfSelect}[data-category="two"]`).forEach(btn => {
        btn.addEventListener('click', () => selectAllOptions('two'));
    });
    document.querySelectorAll(`${elemOfDeSelect}[data-category="two"]`).forEach(btn => {
        btn.addEventListener('click', () => deselectAllOptions('two'));
    });

    document.querySelectorAll(`${elemOfSelect}[data-category="three"]`).forEach(btn => {
        btn.addEventListener('click', () => selectAllOptions('three'));
    });
    document.querySelectorAll(`${elemOfDeSelect}[data-category="three"]`).forEach(btn => {
        btn.addEventListener('click', () => deselectAllOptions('three'));
    });



    document.querySelectorAll(`${elemOfSelect}[data-category="one"]`).forEach(btn => {
        btn.addEventListener('click', () => selectAllOptions('one-edit'));
    });
    document.querySelectorAll(`${elemOfDeSelect}[data-category="one"]`).forEach(btn => {
        btn.addEventListener('click', () => deselectAllOptions('one-edit'));
    });

    document.querySelectorAll(`${elemOfSelect}[data-category="two"]`).forEach(btn => {
        btn.addEventListener('click', () => selectAllOptions('two-edit'));
    });
    document.querySelectorAll(`${elemOfDeSelect}[data-category="two"]`).forEach(btn => {
        btn.addEventListener('click', () => deselectAllOptions('two-edit'));
    });

    document.querySelectorAll(`${elemOfSelect}[data-category="three"]`).forEach(btn => {
        btn.addEventListener('click', () => selectAllOptions('three-edit'));
    });
    document.querySelectorAll(`${elemOfDeSelect}[data-category="three"]`).forEach(btn => {
        btn.addEventListener('click', () => deselectAllOptions('three-edit'));
    });



}
// Function to handle selecting all checkboxes
function selectAllOptions(category) {
    const checkboxes = document.querySelectorAll(`#category-${category}-menu .category-menu-option input[type="checkbox"]`);

    if (checkboxes.length === 0) {
        console.error(`No checkboxes found in ${menuId}.`);
        return;
    }

    checkboxes.forEach(checkbox => checkbox.checked = true);
}
// Function to handle deselecting all checkboxes
function deselectAllOptions(category) {
    const checkboxes = document.querySelectorAll(`#category-${category}-menu .category-menu-option input[type="checkbox"]`);

    if (checkboxes.length === 0) {
        console.error(`No checkboxes found in ${menuId}.`);
        return;
    }

    checkboxes.forEach(checkbox => checkbox.checked = false);
}
//for the selecting and deselecting end