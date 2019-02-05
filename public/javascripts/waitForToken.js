

setInterval(checkApi, 500);


function checkApi(){
    $.get( "/api/okTempToken", (data) => {
        console.log(data);
        console.log("Success");
        location.reload();
    }).fail( (data) =>{
        console.log(data);
        console.log("Fail");

    })
}