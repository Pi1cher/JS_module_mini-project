let url = new URL(document.URL);
let id = url.searchParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(value => value.json())
    .then(value => {
        let mainHTML = document.createElement('main');
        document.body.appendChild(mainHTML);

        let backBtn = document.createElement('button')
        backBtn.className = 'btn';
        backBtn.innerText = 'Back';
        mainHTML.appendChild(backBtn);
        backBtn.onclick = function () {
            location.href = 'index.html'
        }

        searchObj(value)
        getPosts();



    })

function getPosts() {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(value => value.json())
        .then(value => {
            let mainHTML = document.getElementsByTagName('main')[0];

            let postBtn = document.createElement('button')
            postBtn.className = 'btn';
            postBtn.innerText = 'Posts of current user';
            mainHTML.appendChild(postBtn);

            postBtn.onclick = function () {
                let posts = document.getElementById('posts');
                posts.style.display = 'block';
            }

            let posts = document.createElement('section');
            posts.style.display = 'none';
            posts.id = 'posts'
            mainHTML.appendChild(posts);
            let generator = sectionGenerator(value.length / 5 + 1);
            let section = generator.next().value;
            for (const post of value) {
                if (section.getElementsByTagName('p').length === 5) {
                    posts.appendChild(section);
                    section = generator.next().value;
                    section.innerHTML += `<p class="title"><a href="post-details.html?id=${post.id}">${post.title}</a></p>`

                } else {
                    section.innerHTML += `<p class="title"><a href="post-details.html?id=${post.id}">${post.title}</a></p>`
                }

            }
            posts.appendChild(section);

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
        section.className = '5_posts';
        yield section;
    }

}



