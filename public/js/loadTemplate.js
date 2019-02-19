$( document ).ready(function() {

    $.post("/api/getTemplate", (data) => {
        console.log(data);
        data.widgetConfigs.forEach((item) =>{
           console.log(item);
           $.get("/widgets/" + item.widgetId + ".html", (data) =>{
               data = data.replace(/\$id/g, item.id);
               data = data.replace(/\$param/g, JSON.stringify(item.param));
               console.log(data);
               $('#main').append(data);
           })

        });
    });

});