`use strict`;

(function () {
    let id = 0;
    const form = document.querySelector(`#todoForm`);
    const todoItems = document.querySelector(`#todoItems`);
    const dataKey = `formData`;

    if (localStorage.getItem(dataKey) && JSON.parse(localStorage.getItem(dataKey)).length) {
        const tempData = JSON.parse(localStorage.getItem(dataKey));
        id = tempData[tempData.length - 1].id;
    }

    const renderToDoItems = (item) => {
        const wrapper = document.createElement(`div`);
        wrapper.classList.add(`col-4`);
        wrapper.setAttribute(`data-id`, item.id);
        wrapper.innerHTML = `<div class="taskWrapper">
                                <div class="taskHeading">${item.title}</div>
                                <div class="taskDescription">${item.description}</div>
                           </div>`;
        todoItems.prepend(wrapper);
        return wrapper;
    };

    form.addEventListener(`submit`, evt => {
        evt.preventDefault();
        evt.stopPropagation();

        const {target} = evt;
        let formData = target.querySelectorAll(`input, textarea`);
        formData = Array.from(formData).reduce((accumulator, item) => {
            accumulator[item.name] = item.value;
            return accumulator;
        }, {})

        formData.id = ++id;
        const storageData = localStorage.getItem(dataKey) ? JSON.parse(localStorage.getItem(dataKey)) : [];
        storageData.push(formData);
        localStorage.setItem(dataKey, JSON.stringify(storageData));
        renderToDoItems(formData);

    })

    document.addEventListener(`DOMContentLoaded`, () => {
        if (!localStorage.getItem(dataKey)) return;

        const storageData = JSON.parse(localStorage.getItem(dataKey));
        storageData.forEach(item => renderToDoItems(item));
    })

    todoItems.addEventListener(`click`, (evt) => {
        evt.stopPropagation();
        const currentItem = evt.target.closest(`[data-id]`);
        const currentItemId = +currentItem.getAttribute(`data-id`);
        const filteringItem = JSON
            .parse(localStorage.getItem(dataKey))
            .filter(item => item.id !== currentItemId);
        localStorage.setItem(dataKey, JSON.stringify(filteringItem));
        currentItem.remove();
    })

    // const delBtn = document.querySelector(`#delete-btn`);
    // delBtn.addEventListener(`click`, (evt) => {
    //     todoItems.remove();
    //     localStorage.clear();
    //     id = 0;
    // });

    form.addEventListener(`reset`, (evt) => {
        evt.stopPropagation();
        todoItems.remove();
        localStorage.clear();
        id = 0;
        location.reload()
    })

})();