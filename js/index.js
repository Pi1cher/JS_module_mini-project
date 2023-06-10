let mainHTML = document.createElement('main');

fetch("http://jsonplaceholder.typicode.com/users")
    .then((value) => value.json())
    .then(value => {
        let generator = sectionGenerator(value);
        let section = generator.next().value;
        for (const valueElement of value) {
            if (section.getElementsByTagName('div').length === 2) {
                mainHTML.appendChild(section);
                section = generator.next().value;
                let div = document.createElement('div');
                div.className = 'user';
                div.innerHTML = `<p class="info">Id ${valueElement.id} - ${valueElement.name}</p><p class="infoBtn"><a href='user-details.html?id=${valueElement.id}'>Iнфо</a></p>`
                section.appendChild(div);

            } else {
                let div = document.createElement('div');
                div.className = 'user';
                div.innerHTML = `<p class="info">Id ${valueElement.id} - ${valueElement.name}</p><p class="infoBtn"><a  href='user-details.html?id=${valueElement.id}'>Iнфо</a></p>`
                section.appendChild(div);
            }
        }
        mainHTML.appendChild(section);
    })


function* sectionGenerator(arr) {
    for (const arrElement of arr) {
        let section = document.createElement('section');
        section.className = '2_users';
        yield section;
    }
}

document.body.appendChild(mainHTML);
