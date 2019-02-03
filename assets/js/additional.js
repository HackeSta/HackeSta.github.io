function toggleDiv(id){
    $div = $(id)
    for (sib of $div.siblings()){
        $(sib).css('display','none')
    }
    if ($div.css('display') === 'none'){
        $div.css('display','block')
    }
    else {
        $div.css('display','none')

    }
}

function getFoss(){
    $.getJSON("/data/fossdata.json", (data) => {
        for (key of Object.keys(data)){
            let anim = new CountUp($("#"+key)[0],0,data[key]);
            if(!anim.error){
                anim.start()
            }
            else{
                console.log(anim.error);
            }
        }

    });  
}