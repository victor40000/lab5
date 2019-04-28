var currentId = null;

var addButton = new Vue({
    el: '#addButton',
    methods: {
        addSketch: function () {
            postSketch("New sketch", "#write your sketch here");
            console.log(123);
        }
    }
});

var saveButton = new Vue({
    el: '#saveButton',
    methods: {
        saveSketch: function () {
            if (currentId === null) return;
            updateSketch(currentId, currentSketch.title, currentSketch.text);
        }
    }
});

var deleteButton = new Vue({
    el: '#deleteButton',
    methods: {
        deleteSketch: function () {
            if (currentId === null) return;
            deleteSketch(currentId);
        }
    }
});

// var refreshButton = new Vue({
//     el: '#refreshButton',
//     methods: {
//         refreshSketch: function () {
//             markdownText.text = markdown.toHTML(currentSketch.text);
//         }
//     }
// });


var sketchList = new Vue({
    el: '#sketchList',
    data: {
        sketches: null
    },
    methods: {
        chooseSketch: function (event) {
            currentId = event.srcElement.id;
            var sketch = this.sketches.find(sketch => sketch._id === currentId);
            currentSketch.title = sketch.title;
            currentSketch.text = sketch.text;
            markdownText.text = markdown.toHTML(currentSketch.text);
        }
    }
});

var currentSketch = new Vue({
    el: '#currentSketch',
    data: {
        title: "",
        text: "",
    },
    methods: {
        updateMarkdowm: function () {
            markdownText.text = markdown.toHTML(currentSketch.text);
        }
    }
});

var markdownText = new Vue({
    el: '#markdownText',
    data: {
        text: markdown.toHTML(currentSketch.text)
    }
});

function getSketches(){
    $.ajax({
        url: "/sketch",
        contentType: "application/json",
        method: "GET",
        success: function (res) {
            // console.log(res);
            sketchList.sketches = res;
        }
    })
}

getSketches();


function postSketch(title, text) {
    $.ajax({
        url: "/sketch",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            title: title,
            text: text,
        }),
        success: function (res) {
            // console.log(res);
            location.href = "/";
        }
    })
}

function updateSketch(id, title, text) {
    $.ajax({
        url: "/sketch",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: id,
            title: title,
            text: text
        }),
        success: function (res) {
            // console.log(res);
            location.href = "/";
        }
    })

}

function deleteSketch(id) {
    $.ajax({
        url: "/sketch",
        contentType: "application/json",
        method: "DELETE",
        data: JSON.stringify({
            id: id
        }),
        success: function (res) {
            console.log(res);
            location.href = "/";
        }
    })
}



