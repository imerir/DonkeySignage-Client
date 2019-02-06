setInterval(checkApi, 500);
function checkApi(){
    $.get( "/api/okRegister", (data) => {
        console.log(data);
        console.log("Success");
        debugger;
        location.reload();
    }).fail( (data) =>{
        console.log(data);
        console.log("Fail");

    })
}