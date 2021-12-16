//var baseUrl = "http://localhost:8080";
var baseUrl = "https://genplug-api.herokuapp.com";

// Clients
//--------------------------------------------------------------------------------------

// Client SignUp
function addClient(data) {
    var postData = JSON.stringify(data);
    console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/client/create",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            window.location.href = "../html/login.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onClientDetailsSubmit() {
    console.log("Function called : add user");
    //document.getElementById("loginbox").style.display = "none";
    var formData = {};
    formData["name"] = document.getElementById("Name").value;
    formData["email"] = document.getElementById("Email").value;
    formData["password"] = document.getElementById("Password").value;

    addClient(formData);
    //   if (selectedRecord == null) {
    //       addUser(formData);
    //   } else {
    //       updateUserRecord(formData);
    //   }
    // alert("User Edited Successfully");
    //clearUserForm();


}

// Client Login
function clientLogin(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/client/login",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);

            // console.log("token:" + response.token);

            // document.cookie =  'authToken=' + response.token
            window.location.href = "./index.html";
        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onClientLoginDetailsSubmit() {
    var formData = {};
    formData["email"] = document.getElementById("Email").value;
    formData["password"] = document.getElementById("Password").value;

    clientLogin(formData);
}

// Professionals
//---------------------------------------------------------------------------------------------------
// Professional SignUp
function addProfessional(data) {
    var postData = JSON.stringify(data);
    console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/professional/create",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            window.location.href = "../html/professionallogin.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onProfessionalDetailsSubmit() {
    console.log("Function called : add user");
    //document.getElementById("loginbox2").style.display = "none";
    var formData = {};
    formData["name"] = document.getElementById("Name").value;
    formData["email"] = document.getElementById("Email").value;
    formData["password"] = document.getElementById("Password").value;
    formData["yearsOfExperience"] = document.getElementById("YearsOfExperience").value;
    formData["profession"] = document.getElementById("Profession").value;

    addProfessional(formData);
    //   if (selectedRecord == null) {
    //       addUser(formData);
    //   } else {
    //       updateUserRecord(formData);
    //   }
    // alert("User Edited Successfully");
    //clearUserForm();


}

// Professional Login
function professionalLogin(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/professional/login",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);

            // console.log("token:" + response.token);

            // document.cookie =  'authToken=' + response.token
            window.location.href = "../html/about.html";
        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onProfessionalLoginDetailsSubmit() {
    var formData = {};
    formData["email"] = document.getElementById("Email").value;
    formData["password"] = document.getElementById("Password").value;

    professionalLogin(formData);
}

// View All Professionals
$(document).ready(() => {
    $.ajax({
        url: baseUrl + "/professional/all",
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            if (data.length > 0) {
                console.log("Fetched Professionals");
                for (let index = 0; index < data.length; index++) {
                    // $('#PremiseID').append('<option name="PremiseId" value="' + data.data[index].PremiseId + '">' + data.data[index].PremiseId + '</option>');
                    //var newdiv = '<div class="post-preview">'
                    var elem = '';
                    elem += '<option value="' + data[index].email + '">' + data[index].name + '</option>';
                    $("#Professional").append(elem);


                }
            }
        }
    })
})

// Appointments
//---------------------------------------------------------------------------------------------------
// Book Appointment
function bookAppointment(data) {
    var postData = JSON.stringify(data);
    console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/appointments/create",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            //window.location.href = "../html/professionallogin.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}



function onApptDetailsSubmit() {
    console.log("Function called : add user");
    document.getElementById("my-5").style.display = "none";
    var formData = {};
    formData["client_name"] = document.getElementById("ClientName").value;
    formData["professional_name"] = document.getElementById("ProfessionalName").value;
    formData["date"] = document.getElementById("Date").value;
    formData["time"] = document.getElementById("Time").value;


    bookAppointment(formData);



}

// View appointment requests
function getAppointmentRequests(email) {
    $.ajax({
        type: "GET",
        url: baseUrl + "/appointments/viewrequests/?email=" + email,
        cache: false,
        success: function (data) {
            if (data.length > 0) {
                console.log("Fetched Appointments");
                for (let index = 0; index < data.length; index++) {
                    // $('#PremiseID').append('<option name="PremiseId" value="' + data.data[index].PremiseId + '">' + data.data[index].PremiseId + '</option>');
                    //var newdiv = '<div class="post-preview">'
                    var elem = '';
                    elem += '<div class="post-review">';
                    elem += '<h3 class="post-subtitle">Appointment ' + data[index].appointmentId + '</h3>';
                    elem += '<p class="post-meta">Client Name: ' + data[index].clientAcc.name + '</p>';
                    elem += '<p class="post-meta">Appointment Date: ' + data[index].date + ' ' + data[index].time + '</p>';
                    elem += '</div>'
                    elem += '<hr class="my-4" />'
                    elem += '<p>'
                    elem += '<input type="submit" onclick="event.preventDefault(); onClickAccept(' + data[index].appointmentId + '); " value="Accept"style="margin: 0;" />'
                    elem += '<input type="submit" onclick="event.preventDefault(); onClickDecline(' + data[index].appointmentId + '); "value="Decline"style="margin: 0;" />'
                    elem += '</p>'
                    $("#allrequests #eachrequest").append(elem);


                }

            }

        }
        // headers: {
        //     Authorization: `token ${getCookie('authToken')}`
        // }
    });

}

function onProfessionalNameInput() {
    var email = document.getElementById("Professional").value;
    getAppointmentRequests(email);

}

// Accept appointment
function acceptAppointment(id) {
    // var postData = JSON.stringify(data);
    // console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/appointments/" + id + "/accept",
        dataType: 'json',
        // data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            //window.location.href = "../html/professionallogin.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onClickAccept(id) {

    acceptAppointment(id);

}

// Decline Appointment
function declineAppointment(id) {
    // var postData = JSON.stringify(data);
    // console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/appointments/" + id + "/decline",
        dataType: 'json',
        // data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            //window.location.href = "../html/professionallogin.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onClickDecline(id) {

    declineAppointment(id);

}

//Questions
//---------------------------------------------------------------------------------------------------------------
// Ask Question
function askQuestion(data) {
    var postData = JSON.stringify(data);
    console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/questions/add",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            //window.location.href = "../html/professionallogin.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onQuestionDetailsSubmit() {
    console.log("Function called : add user");
    document.getElementById("askquestion").style.display = "none";
    var formData = {};
    formData["question"] = document.getElementById("Question").value;
    formData["profession"] = document.getElementById("Profession").value;


    askQuestion(formData);
    //   if (selectedRecord == null) {
    //       addUser(formData);
    //   } else {
    //       updateUserRecord(formData);
    //   }
    // alert("User Edited Successfully");
    //clearUserForm();


}

// View all Questions
$(document).ready(() => {
    $.ajax({
        url: baseUrl + "/question/all",
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            if (data.length > 0) {
                console.log("Fetched Questions");
                for (let index = 0; index < data.length; index++) {
                    // $('#PremiseID').append('<option name="PremiseId" value="' + data.data[index].PremiseId + '">' + data.data[index].PremiseId + '</option>');
                    //var newdiv = '<div class="post-preview">'
                    var elem = '';
                    elem += '<div class="card">';
                    elem += '<div class="card-header" id="heading' + data[index].questionId + '">';
                    elem += '<h5 class="mb-0">';
                    elem += '<p>';
                    elem += data[index].question;
                    console.log(data[index].answer);
                    if (data[index].answer == null) {
                        elem += '<form onsubmit="event.preventDefault(); onAnswerSubmit(' + data[index].questionId + ');">';
                        elem += '<input type="text" name="" placeholder="Write your answer here..." id="Answer">';
                        elem += '<input type="submit" name="" value="Answer Question">';
                        elem += '</form>';
                        elem += '</p>';
                        elem += '</h5>';
                        elem += '</div>';
                        elem += '</div>';
                    } else {
                        elem += '</p>';
                        elem += '</h5>'
                        elem += '</div>'
                        elem += '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne">';
                        elem += '<div class="card-body">';
                        elem += data[index].answer;
                        elem += '</div>';
                        elem += '</div>';
                        elem += '</div>';


                    }



                    $("#allquestions").append(elem);


                }



            }
        }
    })
})

// Answer Question
function answerQuestion(data, id) {
    var postData = JSON.stringify(data);
    console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/question/" + id + "/answer",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            //window.location.href = "../html/professionallogin.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onAnswerSubmit(id) {
    console.log("Function called : add answer");
    //document.getElementById("allquestions").style.display = "none";
    var formData = {};
    formData["answer"] = document.getElementById("Answer").value;
    
    answerQuestion(formData,id);

}


// Blogs
//---------------------------------------------------------------------------------------------------------------
// Add Blog
function addBlog(data) {
    var postData = JSON.stringify(data);
    console.log(postData);
    $.ajax({
        type: "POST",
        url: baseUrl + "/blog/add",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            //addUserRecordToTable(data);
            window.location.href = "../html/blogpagenew.html";

        },
        headers: {
            Accept: "application/json; charset=utf-8",
            Content_Type: "application/json; charset=utf-8",
            //Authorization: getCookie('authToken')
        }


    });
}

function onBlogDetailsSubmit() {
    console.log("Function called : add blog");
    //document.getElementById("addblog").style.display = "none";
    var formData = {};
    formData["title"] = document.getElementById("Title").value;
    formData["profession"] = document.getElementById("Profession").value;
    formData["owner"] = document.getElementById("Owner").value;
    formData["url"] = document.getElementById("Url").value;



    addBlog(formData);
    //   if (selectedRecord == null) {
    //       addUser(formData);
    //   } else {
    //       updateUserRecord(formData);
    //   }
    // alert("User Edited Successfully");
    //clearUserForm();


}

// View Blogs list
$(document).ready(() => {
    $.ajax({
        url: baseUrl + "/blog/all",
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            if (data.length > 0) {
                console.log("Fetched Blogs");
                for (let index = 0; index < data.length; index++) {
                    // $('#PremiseID').append('<option name="PremiseId" value="' + data.data[index].PremiseId + '">' + data.data[index].PremiseId + '</option>');
                    //var newdiv = '<div class="post-preview">'
                    var elem = '';
                    elem += '<div class="post-preview">';
                    elem += '<a href="' + data[index].url + '" target="_blank"><h2 class="post-title">' + data[index].title + '</h2></a>';
                    elem += '<p class="post-meta">Posted by <a href="#!">' + data[index].owner.name + '</a></p>';
                    elem += '</div>'
                    elem += '<hr class="my-4" />'
                    $("#allblogs #eachblog").append(elem);


                }
            }
        }
    })
})

// Professions
//-----------------------------------------------------------------------------------------------------------------------------[]
// View All Professions
$(document).ready(() => {
    $.ajax({
        url: baseUrl + "/profession/all",
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            if (data.length > 0) {
                console.log("Fetched Professions");
                for (let index = 0; index < data.length; index++) {
                    // $('#PremiseID').append('<option name="PremiseId" value="' + data.data[index].PremiseId + '">' + data.data[index].PremiseId + '</option>');
                    //var newdiv = '<div class="post-preview">'
                    var elem = '';
                    elem += '<option value="' + data[index].name + '">' + data[index].name + '</option>';
                    $("#Profession").append(elem);


                }
            }
        }
    })
})

