

$( document ).ready(function() {
    setInterval(getState, 300);

});
function getState(){
    $.post( "/api/getState", (data) => {
        if(data.tokenState !== tokenState)
            location.reload();
        if(data.state !== state)
            location.reload();
    }).fail( (data) =>{
        console.log(data);
        console.error("Fail");

    })
}