var currentId;
var currentTitle;
var currentText;

var addButton = new Vue({
    el: '#addButton',
    methods: {
        addSketch: function () {
            
        }
    }
});


var sketchList = new Vue({
    el: '#sketchList',
    data: {
        sketches: null
    }
});

function getSketches(){
    $.ajax({
        url: "/sketch",
        contentType: "application/json",
        method: "GET",
        success: function (res) {
            console.log(res);
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
            // console.log(res);
            location.href = "/";
        }
    })
}



