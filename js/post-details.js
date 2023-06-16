let url = new URL(document.URL);
let id = url.searchParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(value => value.json())
    .then(value => {
        console.log(value)
        let mainHTML = document.createElement('main');
        document.body.appendChild(mainHTML);

        let backBtn = document.createElement('button')
        backBtn.className = 'btn';
        backBtn.innerText = 'Back';
        mainHTML.appendChild(backBtn);
        backBtn.onclick = function () {
            location.href = `user-details.html?id=${value.userId}`
        }

        searchObj(value);
        getComments();
    })


function getComments () {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(value => value.json())
        .then(value => {
            let mainHTML = document.getElementsByTagName('main')[0];
            let commentTitle = document.createElement('div');
            commentTitle.className = 'commentTitle'
            commentTitle.innerText = 'Comments:';

            mainHTML.appendChild(commentTitle)

            let comments = document.createElement('section');
            comments.id = 'comment'
            mainHTML.appendChild(comments);
            let generator = sectionGenerator(value.length / 4 + 1);
            let section = generator.next().value;
            for (const comment of value) {
                if (section.getElementsByTagName('p').length === 4) {
                    comments.appendChild(section);
                    section = generator.next().value;
                    section.innerHTML += `<p class="commentBody">${comment.body}</p>`

                } else {
                    section.innerHTML += `<p class="commentBody">${comment.body}</p>`
                }

            }
            comments.appendChild(section);
        })
}

function searchObj(value) {

    for (const valueKey in value) {
        if (typeof (value[valueKey]) !== 'object') {
            let p = document.createElement('p')
            p.className = 'line_info';
            const capitalizedValue =
                valueKey.charAt(0).toUpperCase()
                + valueKey.slice(1)
            p.innerText = `${capitalizedValue} - ${value[valueKey]}`;

            document.getElementsByTagName('main')[0].appendChild(p);

        } else {
            let p = document.createElement('p')
            p.className = 'line_info';
            const capitalizedValue =
                valueKey.charAt(0).toUpperCase()
                + valueKey.slice(1)
            p.innerText = `${capitalizedValue} :`

            document.getElementsByTagName('main')[0].appendChild(p);

            searchObj(value[valueKey])
        }
    }
}

function* sectionGenerator(elems_amount) {
    for (let i = 0; i < elems_amount; i++) {
        let section = document.createElement('section');
        section.className = '4_comments';
        yield section;
    }

}

