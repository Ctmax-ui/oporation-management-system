const rootApi = {
    "data": {
        1: {
            "id": 1,
            "date": "08/07/2024 - 08/23/2024",
            "category_one": [
                "A1",
                "A2",
                "A3",
            ],
            "category_two": [
                "B1",
                "B2",
                "B3",
            ],
            "category_three": [
                "C1",
                "C2",
                "C3",
            ],
        },
        2: {
            "id": 2,
            "date": "08/07/2024 - 08/23/2024",
            "category_one": [
                "A1",
                "A2",
                "A3",
            ],
            "category_two": [
                "B1",
                "B5",
                "B7",
            ],
            "category_three": [
                "C6",
                "C8",
                "C3",
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
// for the rendering rules
function renderCategory() {
    // const categoryOneItems = categoryRuleApi.category_one.items;
    writeCategory('#category-one-menu', categoryRuleApi.category_one)
    writeCategory('#category-one-edit-menu', categoryRuleApi.category_one)
    writeCategory('#category-two-menu', categoryRuleApi.category_two)
    writeCategory('#category-two-edit-menu', categoryRuleApi.category_two)
    writeCategory('#category-three-menu', categoryRuleApi.category_three)
    writeCategory('#category-three-edit-menu', categoryRuleApi.category_three)

    function writeCategory(targetId, categoryName) {
        document.querySelector(`${targetId} .category-menu-option`).innerHTML = categoryName?.items?.map(item => `<li><label><input type="checkbox" value="${item}">${item}</label></li>`).join('');
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


// for renderning the table
const tablesContainer = document.getElementById('save-template');
function renderData() {
    tablesContainer.innerHTML = ''
    Object.values(rootApi.data).forEach((val) => {
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
        renderData();
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
            renderData();
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
document.getElementById('closeModalBtn').addEventListener('click',(e)=>{
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
    renderData();
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