
$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAMvDuKpuzPdUz8dJAH8B99HKhkm5aM9PY",
        authDomain: "denzel-superuniquer-giphy-hw.firebaseapp.com",
        databaseURL: "https://denzel-superuniquer-giphy-hw.firebaseio.com",
        projectId: "denzel-superuniquer-giphy-hw",
        storageBucket: "",
        messagingSenderId: "643491204415",
        appId: "1:643491204415:web:4a279f9f9c9ff3aa"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    db = firebase.database()
    // Example queryURL for Giphy API

    gifArray = []
    const allowCORS = 'https://cors-anywhere.herokuapp.com/'
    var searchforgif = function (str, limit) {
        return `${allowCORS}http://api.giphy.com/v1/gifs/search?q=${str}&api_key=lggV2sIXzWE8C5FTbaxibMPd8VaR0ZF1&limit=${limit}`
    }

    $("#select-critter").on("click", function (event) {
        event.preventDefault();
        // $("#critter-input").val() - this target input from text box
        const userInput = $("#critter-input").val()

        // gif call
        $.ajax({
            url: searchforgif(userInput, 5),
            method: "GET"
        }).then(function (response) {
            $("#critter-div").empty()
            var data = response.data

            for (let i = 0; i < data.length; i++) {
                gifArray.push(response.data[i].images.fixed_height.url)
            }

            for (let i = 0; i < data.length; i++) {
                const $image = $("<img>")
                $image.addClass('savedCritter')
                $image.attr("src", response.data[i].images.fixed_height.url)
                $("#critter-div").append($image)
            }
            console.log(gifArray)
        });
    });


    // got the console log to work but nothing is saved
    $(document).on('click', '#saveButton', function () {
        text = $('#critter-input').val().trim()
        console.log(text)
        $btn = `<input id="queryBtn" type="submit" value="${text}">`
        $('.dumbDiv').append($btn)
    });

    $(document).on('click', '#queryBtn', function () {
        let btnText = this.value
        $.ajax({
            url: searchforgif(btnText, 5),
            method: "GET"
        }).then(function (response) {
            $("#critter-div").empty()
            var data = response.data

            for (let i = 0; i < data.length; i++) {
                gifArray.push(response.data[i].images.fixed_height.url)
            }

            for (let i = 0; i < data.length; i++) {
                const $image = $("<img>")
                $image.addClass('savedCritter')
                $image.attr("src", response.data[i].images.fixed_height.url)
                $("#critter-div").append($image)
            }
            console.log(gifArray)
        });


    })

    // $('#saveButton').on('click', function () {
    //     const $btn = $("<button>")
    //     // add text to button 
    //     const btnText = $("#critter-input").val()
    //     $btn.text(btnText)
    //     // add class to button 
    //     // add data input for the ajax call
    //     // append the button to the htmnl
    //     $(".dumbDiv").append($btn)

    // })


    $('#deleteButton').on('click', function () {
        $('#critter-div').empty()
        db.ref().set({
            gifArray: []
        })
        $('#critter-div').empty()

    });

    db.ref().on('value', function (snap) {
        try {
            gifArray = snap.val().gifArray
            for (let i = 0; i < gifArray.length; i++) {
                const $image = $("<img>")
                $image.addClass('savedCritter')
                $image.attr("src", gifArray[i])
                $(".dumbDiv").append($image)
            }
        }

        catch {
            console.log('No saved GIFS')
        }

        console.log(gifArray)
    })
})
