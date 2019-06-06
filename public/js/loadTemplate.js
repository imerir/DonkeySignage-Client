var divWrap = "<div style='grid-area: $posY / $posX / $sizeHeight / $sizeWidth'>$content</div>";

$( document ).ready(function() {

    $.post("/api/getTemplate", (data) => {
        console.log(data);
        if(data == null){
            $('#grid').append("No template");
        }else{
            data.widgetConfigs.forEach((item) => {
                console.log(item);
                $.get("/widgets/" + item.widgetId + ".html", (receive) => {
                    let data = divWrap.slice(0);
                    data = data.replace(/\$posX/g, item.posX + 1 );
                    data = data.replace(/\$posY/g, item.posY + 1);
                    data = data.replace(/\$sizeWidth/g, item.posX + item.sizeWidth + 1 );
                    data = data.replace(/\$sizeHeight/g, item.posY + item.sizeHeight + 1 );

                    receive = receive.replace(/\$id/g, item.id);
                    let strParam = JSON.stringify(item.param);
                    strParam = strParam.replace(/'/g, "\\\'");
                    receive = receive.replace(/\$param/g, strParam);
                    data = data.replace(/\$content/g, receive);
                    // console.log(data);
                    $('#grid').append(data);
                })
            });
        }
    });

});